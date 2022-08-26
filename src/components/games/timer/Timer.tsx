import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Timer () {
  let navigate = useNavigate();
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    setInterval(() => {
      setSeconds((time) => {
        if(time >= 1) {
          time -= 1;
        } else {
          time = 0;
          navigate('/games/results');
        }
        return time;
      });
    }, 1000);
  }, [navigate]);
  return (
    <div className='sprint-timer'>
      <div className='sprint-time'>{seconds}</div>
    </div>
  )
}