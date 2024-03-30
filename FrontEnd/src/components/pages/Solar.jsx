// // import React from 'react'

// // export const Solar = () => {
// //   return (
// //     <div>
// //       Solar page
// //     </div>
// //   )
// // }

// import React from 'react';
// import '../../styles/Buttons.css';
// import { useState } from 'react';
// import { MonitorMeter } from './MonitorMeter';
// import { MonitorIOT } from './MonitorIOT';
// import { MonitorSolar } from './MonitorSolar';

// export const Solar = () => {
//   const [solar, setSolar] = useState('');

//   return (
//     <div className="table-wrapper">
//       <br />
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <button
//           className={`light-grey curved-corners selection-button ${solar === 'solar' ? 'selected' : ''}`}
//           onClick={(e) => setSolar('solar')}
//         >
//           Solar Generation
//         </button>
//       </div>
//         {solar === 'solar' && <MonitorSolar />}
//     </div>
//   );
// };
