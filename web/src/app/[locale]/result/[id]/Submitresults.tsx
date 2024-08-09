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
        const response = await fetch(
          'https://backend-three-eta-83.vercel.app/api/userPerformance',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId,
              result: results
            })
          }
        );

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
