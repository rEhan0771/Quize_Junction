import { useEffect, useMemo, useState } from 'react';

const useCountdown = (targetDate, newTime) => {
  const countDownDate =new Date(targetDate).getTime();
  //const countDownDate = useMemo(() => new Date(targetDate).getTime(targetDate), [targetDate]);
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );
  //console.log('countDownDate', countDownDate)
  useEffect(() => {
    const interval = setInterval(() => {
       const [days, hours, minutes, seconds] = getReturnValues(countDown);
       if(days + hours + minutes + seconds>0){
      setCountDown(countDownDate - new Date().getTime());
      }
      else{
        setCountDown(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
