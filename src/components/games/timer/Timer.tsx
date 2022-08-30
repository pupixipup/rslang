import { useEffect, useState } from 'react';

export function Timer (props: {updateTime: (bool: boolean) => void}) {
  const {updateTime} = props;

  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    setInterval(() => {
      setSeconds((time) => {
        if(time >= 1) {
          time -= 1;
        } else {
          time = 0;
          updateTime(false);
        }
        return time;
      });
    }, 1000);
  }, []);
  return (
    <div className='sprint-timer'>
      <div className='sprint-time'>{seconds}</div>
    </div>
  )
}