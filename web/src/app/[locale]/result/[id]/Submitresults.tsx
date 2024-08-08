// 'use client';

// import React, { useEffect, useRef } from 'react';

// interface SubmitresultsProps {
//   results: any; // Ideally, replace `any` with a more specific type
// }

// const Submitresults: React.FC<SubmitresultsProps> = ({ results }) => {
//   const hasSubmitted = useRef(false);

//   useEffect(() => {
//     if (hasSubmitted.current) return;

//     const submitResults = async () => {
//       const userId = localStorage.getItem('userId');
//       if (!userId) {
//         console.error('User ID not found in localStorage');
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:8000/api/userPerformance', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             userId,
//             result: results,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log(data);
//         hasSubmitted.current = true; // Set ref to true to prevent further submissions
//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//       }
//     };

//     submitResults();
//   }, [results]);

//   return <div></div>;
// };

// export default Submitresults;


'use client';

import React, { useEffect, useState } from 'react';

interface SubmitresultsProps {
    results: any;
}

const Submitresults: React.FC<SubmitresultsProps> = ({ results }) => {
    const [data, setData] = useState<any>(results);

    useEffect(() => {
       
        const userId = localStorage.getItem('userId');
        const timer = setTimeout(async () => {

            try {
                const response = await fetch('http://localhost:8000/api/userPerformance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        result: results,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log('API response:', result);
            } catch (error) {
                console.error('Error during API call:', error);
            }
        }, 5000); // 5000 milliseconds delay

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    return <div></div>;
};

export default Submitresults;
