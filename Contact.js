import React from 'react';
export default function Contact(){
  return (
    <div style={{fontFamily:'sans-serif', padding:16, maxWidth:900, margin:'auto'}}>
      <h2>Contact Us</h2>
      <p>Address: H4XG+M58, Beer Chand Patel Path, Patna, Bihar 800001</p>
      <p>Phone: 9661092285 / 7778880965</p>
      <p>Email: info@apjtechnical.in</p>
      <div style={{marginTop:12}}>
        <iframe title="map" src="https://www.google.com/maps?q=Beer+Chand+Patel+Path+Patna&output=embed" style={{width:'100%',height:300,border:0}}></iframe>
      </div>
    </div>
  );
}
