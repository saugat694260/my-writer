
import { useState, useEffect } from 'react';


export default function Watch() {
  
  const [time, setTime] = useState(() => new Date());

  
  useEffect(() => {
    
    const watchInterval = setInterval(() => setTime(new Date()), 1000);

    
    return () => clearInterval(watchInterval);
  }, []); 


  
  return (

    <div className='flex flex-col p-4 bg-inherit w-auto inline-flex'><span>{time.toLocaleTimeString()} </span><span>{time.toLocaleDateString()}</span></div>

  )
}
