import React, { useState } from 'react';
import { downloadFile } from '../../utils/saveMenuFunctions';  

export default function SaveMenuOption({ text }) {
  const [fileName, setFileName] = useState('Untitled');
  const [format, setFormat] = useState('.txt');

  const handleDownloadClick = () => {
    downloadFile(text, fileName, format);
  };

  return (
    <div className='h-auto'>
      <div className='p-2'>
        <div className='grid pl-2 p-2 rounded '>
          <input
            className='font-bold border-0 border-b border-slate-400 focus:outline-none duration-200'
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <p className='mt-4'>Format</p>
          <select
            name="options"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className='bg-gray-400 focus:outline-none [&_option]:bg-white'
          >
            <option value=".txt">.txt</option>
            <option value=".HTM">.HTM</option>
            <option value=".DOCX">.DOCX</option>
          </select>
        </div>
        <div className='grid pl-2 [&_a]:hover:bg-gray-400 duration-200 p-2 rounded font-bold'>
          <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadClick(); }}>
            <span><i className="fa-solid fa-arrow-down"></i></span> Download
          </a>
        </div>
      </div>
    </div>
  );
}
