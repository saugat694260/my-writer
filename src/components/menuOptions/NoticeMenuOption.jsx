import React from 'react';

export default function NoticeMenuOption() {
  const updates = ['proper navigation', 'donate option', 'ai', 'cloud', 'audio','suggestionbox','key shortcuts','undo redo'];

  return (
    <div className="h-full">
      <div className="h-full p-4 ml-2 [&_p]:font-bold">
        <div>
          <p>future updates</p>
          <ul>
            {updates.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden w-full whitespace-normal break-words pt-4">
          <p>from author</p>
          <span className='text-lg'>
            im gonna be king of pirates
          </span>
        </div>
      </div>
    </div>
  );
}
