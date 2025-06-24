import React from 'react'
import LightAndDarkMode from '../widgets/LightAndDarkMode'
import Watch from '../widgets/Watch'
import StopWatch from '../widgets/StopWatch'


export default function SettingOption({time,setTime,running,setRunning}) {
  return (
   <div className='h-auto flex justify-center items-center ml-4'>
  <div className='grid h-auto gap-2 p-2 [&_div]:p-4 w-full max-w-md text-center'>
    <div>
      <Watch />
    </div>
    <div>
      <StopWatch   time={time} setTime={setTime} running={running} setRunning={setRunning} />
    </div>
    <div className='flex justify-center bg-gray-400 hover:bg-gray-500 dark:hover:bg-gray-800'>
      <LightAndDarkMode />
    </div>
  </div>
</div>

  )
}
