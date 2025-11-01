import React from 'react';
export default function Courses(){
  const courses = [
    'Diploma in Mechanical Engineering',
    'Diploma in Electrical Engineering',
    'Diploma in Civil Engineering',
    'Diploma in Computer Application & Programming',
    'ITI Trades (Electrician / Fitter / Welder)',
    'Diploma in HVAC',
    'Diploma in Safety'
  ];
  return (
    <div style={{fontFamily:'sans-serif', padding:16, maxWidth:900, margin:'auto'}}>
      <h2>Courses Offered</h2>
      <ul>
        {courses.map(c=> <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}
