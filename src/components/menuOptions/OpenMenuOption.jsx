import React from 'react';
import { chooseFiles } from '../../utils/openMenuFunctions'; // adjust path if needed

export default function OpenMenuOption({ setText, setSelectedFileHandle, selectedFiles, setSelectedFiles }) {
  return (
    <div className='h-auto'>
      <div className='grid pl-2 [&_a]:hover:bg-gray-400 duration-200 p-2 rounded'>
        <a href="#" onClick={(e) => { e.preventDefault(); chooseFiles(setText, setSelectedFileHandle, setSelectedFiles); }}>
          <span><i className="fa-solid fa-file"></i></span>
          <span> select local file</span>
        </a>
      </div>

      {selectedFiles.length > 0 && (
        <div className="pl-2 mt-2">
          <p><strong>File:</strong> {selectedFiles[0].name}</p>
          <p><strong>Size:</strong> {selectedFiles[0].size} bytes</p>
        </div>
      )}
    </div>
  );
}
