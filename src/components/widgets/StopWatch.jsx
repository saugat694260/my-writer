import  { useState, useEffect, useRef } from "react";

export default function Stopwatch({time,setTime,running,setRunning}) {
  
 const intervalRef = useRef(null);
 

  useEffect(() => {
    if (running) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
        
        
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  // format time as mm:ss:ms
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
  <div className="flex flex-col p-4 bg-inherit w-auto inline-flex">
  <p>{formatTime(time)}</p>
  
  <div className="flex justify-between w-auto">
    <button onClick={() => setRunning((r) => !r)}>
      <span>{running ? "■" : "► "}</span>
    </button>
    <button
      className="p-2"
      onClick={() => {
        setRunning(false);
        setTime(0);
      }}
    >
      <span>↻</span>
    </button>
  </div>
</div>


  );
}
