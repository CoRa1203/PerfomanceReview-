// import { useEffect, useState } from "react";

//     const ROOT_URL_API = "http://192.168.137.1:3000/api";
// const url = ROOT_URL_API + "/v0/task";


// export default function Goals(){
//      const [goals, setGoals] = useState([]); 

//      useEffect(() => {
//  async function getData(){
//       const response = await fetch (url);
//       const goalsData = await response.json();
//        setGoals(goalsData);
//       console.log(goalsData)
//         return goalsData;
//     }
//     getData()
//      }, [])
   
//     return (
//     <div>
//       <h2>Цели:</h2>
//       <ul>
//         {goals.map((goal) => (
//           <li key={goal.id}>{goal.title}</li>
//         ))}
//       </ul>
//     </div>
//     )
// }