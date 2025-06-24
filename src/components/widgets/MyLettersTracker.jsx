import React from 'react'

export default function MyLettersTracker({wordCount,charCount}) {
  return (
    <div className="flex bg-gray-200 dark:bg-gray-900 text-black dark:text-white fixed bottom-0 right-0 w-auto p-4 rounded">

  <div className="flex justify-between gap-4">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
        
        </div>
    </div>
  )
}
