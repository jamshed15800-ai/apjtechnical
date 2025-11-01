import React, {useState} from 'react';
import axios from 'axios';
export default function Admin(){
  const [form, setForm] = useState({regNo:'', name:'', fatherName:'', course:'', grade:'', issuedDate:''});
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState(null);
  async function submit(e){
    e.preventDefault();
    let photoBase64 = null;
    if(photo){
      photoBase64 = await toBase64(photo);
    }
    try{
      const res = await axios.post('/api/createCert', {...form, photoBase64});
      setResult(res.data);
    }catch(err){
      setResult({ error: err.response?.data || err.message });
    }
  }
  function toBase64(file){
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = ()=> resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  return (
    <div style={{fontFamily:'sans-serif', padding:16, maxWidth:720, margin:'auto'}}>
      <h2>Admin Panel</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, marginTop:12}}>
        <input placeholder="RegNo" onChange={e=>setForm({...form, regNo:e.target.value})} required />
        <input placeholder="Name" onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Father Name" onChange={e=>setForm({...form, fatherName:e.target.value})} />
        <input placeholder="Course" onChange={e=>setForm({...form, course:e.target.value})} />
        <input placeholder="Grade" onChange={e=>setForm({...form, grade:e.target.value})} />
        <input type="date" onChange={e=>setForm({...form, issuedDate:e.target.value})} />
        <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} />
        <button type="submit">Create Certificate</button>
      </form>
      {result && <div style={{marginTop:12}}><h4>Result</h4><pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result,null,2)}</pre></div>}
    </div>
  );
}
