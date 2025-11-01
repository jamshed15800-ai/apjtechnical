const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const QRCode = require('qrcode');

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
const SECRET = 'APJ_FINAL_SECRET_2025_apjtech';

exports.createCert = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
    const { regNo, name, fatherName, course, grade, issuedDate, photoBase64 } = req.body;
    if(!regNo || !name) return res.status(400).json({ error: 'regNo & name required' });
    const issuedTs = new Date(issuedDate || Date.now()).getTime();
    const payload = `${regNo}|${issuedTs}`;
    const mac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
    const token = Buffer.from(`${mac}|${regNo}|${issuedTs}`).toString('base64url');
    const publicUrl = `${functions.config().project && functions.config().project.site ? functions.config().project.site : 'PROJECT'}/verify/${token}`;
    const qrDataUrl = await QRCode.toDataURL(publicUrl);
    let photoUrl = null;
    if(photoBase64){
      const buffer = Buffer.from((photoBase64.split(',')[1] || photoBase64), 'base64');
      const filePath = `cert_photos/${regNo}_${Date.now()}.png`;
      const file = storage.bucket().file(filePath);
      await file.save(buffer, { contentType: 'image/png' });
      await file.makePublic();
      photoUrl = `https://storage.googleapis.com/${file.bucket.name}/${filePath}`;
    }
    const certDoc = {
      regNo, name, fatherName, course, grade,
      issuedDate: admin.firestore.Timestamp.fromMillis(issuedTs),
      token, qrDataUrl, photoUrl, status: 'active', createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('certificates').doc(regNo).set(certDoc, { merge: true });
    return res.json({ success: true, token, url: publicUrl, qrDataUrl, cert: certDoc });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

exports.verify = functions.https.onRequest(async (req, res) => {
  try {
    const token = req.path.split('/').filter(Boolean).pop() || req.query.token;
    if(!token) return res.status(400).json({ error: 'token missing' });
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [mac, regNo, tstamp] = decoded.split('|');
    const expected = crypto.createHmac('sha256', SECRET).update(`${regNo}|${tstamp}`).digest('hex');
    if(expected !== mac) return res.status(404).json({ verified: false, error: 'Invalid token' });
    const doc = await db.collection('certificates').doc(regNo).get();
    if(!doc.exists) return res.status(404).json({ verified: false, error: 'Not found' });
    const cert = doc.data();
    const verified = cert.status === 'active';
    return res.json({ verified, cert });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});
