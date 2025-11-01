import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Verify(){
  const { token } = useParams();
  const [resu, setResu] = useState(null);
  useEffect(()=>{
    async function load(){
      try{
        const r = await axios.get(`/verify/${token}`);
        setResu(r.data);
      }catch(e){
        setResu({ error: 'Not found' });
      }
    }
    load();
  },[token]);
  if(!resu) return <div style={{padding:16}}>Loading...</div>;
  if(resu.error) return <div style={{padding:16}}>Not found</div>;
  const cert = resu.cert;
  const issued = cert.issuedDate && cert.issuedDate.seconds ? new Date(cert.issuedDate.seconds*1000).toLocaleDateString() : (cert.issuedDate || '');
  return (
    <div style={{padding:16, fontFamily:'sans-serif', maxWidth:800, margin:'auto'}}>
      <header style={{display:'flex', alignItems:'center', gap:12}}>
        <img src='/logo.png' alt='logo' style={{width:64,height:64}} />
        <div>
          <h3 style={{margin:0}}>APJ Abdul Kalam Technical Institute, Patna</h3>
          <small>Certificate Verification</small>
        </div>
      </header>
      <section style={{background:'#fff', padding:18, borderRadius:8, marginTop:12}}>
        <h2>{cert.name}</h2>
        <p><b>RegNo:</b> {cert.regNo}</p>
        <p><b>Course:</b> {cert.course} — <b>Grade:</b> {cert.grade}</p>
        <p><b>Issued:</b> {issued}</p>
        <div style={{marginTop:12}}>{resu.verified ? <span style={{color:'green'}}>Verified ✓</span> : <span style={{color:'red'}}>Not Verified</span>}</div>
        {cert.photoUrl && <img src={cert.photoUrl} style={{width:120, marginTop:10}} alt="student" />}
        <div style={{marginTop:12}}>
          <a href={cert.pdfUrl || '#'} download>Download Certificate (if available)</a>
        </div>
      </section>
    </div>
  );
}
