import React from 'react';
export default function Home(){
  return (
    <div style={{fontFamily:'sans-serif', padding:16, maxWidth:900, margin:'auto'}}>
      <header style={{display:'flex', alignItems:'center', gap:12}}>
        <img src='/logo.png' alt='logo' style={{width:90,height:90}} />
        <div>
          <h1 style={{margin:0}}>APJ Abdul Kalam Technical Institute, Patna</h1>
          <p style={{margin:0, color:'#0b5394', fontWeight:600}}>Empowering Future Engineers Through Technical Excellence</p>
        </div>
      </header>
      <nav style={{marginTop:12, display:'flex', gap:12}}>
        <a href='/' style={{color:'#0b5394'}}>Home</a>
        <a href='/courses' style={{color:'#0b5394'}}>Courses</a>
        <a href='/about' style={{color:'#0b5394'}}>About</a>
        <a href='/contact' style={{color:'#0b5394'}}>Contact</a>
        <a href='/admin' style={{color:'#0b5394'}}>Admin</a>
      </nav>
      <section style={{marginTop:18}}>
        <h2>Welcome</h2>
        <p>APJ Abdul Kalam Technical Institute provides high-quality technical education and hands-on training.</p>
      </section>
    </div>
  );
}
