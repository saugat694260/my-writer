import React, { useState, useEffect } from 'react';
import {
  handleAddFile,
  handleDeleteFile,
  saveRename
} from "../../../utils/workSpaceFunctions"; 

export default function WorkSpaceSubOption({
  folder,
  setFolder,
  files,
  setFiles,
  inputText,
  setInputText,
  setText,
  fileHandles,
  folderName,
  setFolderName,
  handleFileClick,
  selectedFileHandle,
  setSelectedFileHandle,
  sortFile,
  setSortFile,
  sortDirection,
  setSortDirection,
  setError,
  error,
  text
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputEvent, setInputEvent] = useState('search');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [editingName, setEditingName] = useState('');

  useEffect(() => {
    const fetchFileMetadata = async () => {
      if (!Array.isArray(fileHandles)) {
        setFilteredFiles([]);
        return;
      }

      const enrichedFiles = await Promise.all(
        fileHandles.map(async (fileObj) => {
          const file = await fileObj.handle.getFile();
          return {
            name: file.name,
            size: file.size,
            time: file.lastModified,
            handle: fileObj.handle
          };
        })
      );

      let sortedFiles = [...enrichedFiles];
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (sortFile === 'name') {
        sortedFiles.sort((a, b) => direction * a.name.localeCompare(b.name));
      } else if (sortFile === 'size') {
        sortedFiles.sort((a, b) => direction * (a.size - b.size));
      } else if (sortFile === 'time') {
        sortedFiles.sort((a, b) => direction * (a.time - b.time));
      }

      setFilteredFiles(sortedFiles);
    };

    fetchFileMetadata();
  }, [fileHandles, sortFile, sortDirection, text]);

  const handleSearch = () => {
    const query = inputText.trim().toLowerCase();
    if (!query) {
      setFilteredFiles(fileHandles);
      return;
    }

    const rankedFiles = fileHandles
      .map(file => {
        const idx = file.name.toLowerCase().indexOf(query);
        return { ...file, rank: idx === -1 ? Infinity : idx };
      })
      .filter(file => file.rank !== Infinity)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);

    setFilteredFiles(rankedFiles);
  };

  const handleAddFileWrapper = () => {
    handleAddFile(folder, inputText, setError, setFiles, setFilteredFiles);
  };

  const handleDeleteFileWrapper = (fileName) => {
    handleDeleteFile(folder, fileName, fileHandles, setError, setFiles, setFilteredFiles, selectedFileHandle, setSelectedFileHandle, setText);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const startEditing = (file) => {
    setEditingFile(file.name);
    setEditingName(file.name);
  };

  const cancelEditing = () => {
    setEditingFile(null);
    setEditingName('');
  };

  const handleEditChange = (e) => {
    setEditingName(e.target.value);
  };

  const saveRenameWrapper = async () => {
    await saveRename(folder, editingFile, editingName, fileHandles, setError, setFiles, setFilteredFiles, selectedFileHandle, setSelectedFileHandle);
    
  };

  return (
    <div className="mt-6">
      <div className="flex justify-end gap-2 mb-2">
        <button onClick={toggleSortDirection}>
          <span>{sortDirection === 'asc' ? '↓' : '↑'}</span>
        </button>

        <select
          value={sortFile}
          onChange={(e) => setSortFile(e.target.value)}
          className="bg-gray-200 text-sm px-2 py-1 rounded dark:bg-gray-900 dark:text-white"
        >
          <option value="time">Time</option>
          <option value="size">Size</option>
          <option value="name">Name</option>
        </select>

        <button onClick={() => { setShowInput(true); setInputEvent('search'); }}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button onClick={() => { setShowInput(true); setInputEvent('add'); }}>
          <i className="fa-solid fa-square-plus"></i>
        </button>
        <button onClick={() => {
          setFolder([]);
          setFiles([]);
          setFilteredFiles([]);
          setFolderName('');
          setSelectedFileHandle(null);
          setText('');
          setError('');
        }}>
          Clear
        </button>
      </div>

      {showInput && (
        <div className="flex justify-between p-2">
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none w-3/4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={() => {
            inputEvent === 'search' ? handleSearch() : handleAddFileWrapper(); if (!error === '') { setInputText('');
};
          }}>
            {inputEvent}
          </button>
        </div>
      )}

      <div className={`border-t border-gray-300 mt-4 text-left h-150 ${filteredFiles.length > 10 ? 'overflow-y-scroll' : ''}`}>
        {filteredFiles.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-2 py-1 dark:hover:bg-gray-800 "
          >
            {editingFile === file.name ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={handleEditChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveRenameWrapper();
                    if (e.key === 'Escape') cancelEditing();
                  }}
                  className="border-b border-gray-400 focus:outline-none w-48 p-2 py-1 px-2 "
                  autoFocus
                />
                <button onClick={()=>{saveRenameWrapper()}} className="ml-2 text-green-500"><span><i className="fa-solid fa-check"></i></span></button>
                <button onClick={()=>{cancelEditing();setError('')}} className="ml-1 text-red-500"><span><i className="fa-solid fa-xmark"></i></span></button>
              </>
            ) : (
              <>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileClick(file.name);
                  }}
                  
                  className="cursor-pointer"
                >
                  <p className='truncate overflow-hidden whitespace-nowrap max-w-[150px] block'>{file.name}</p>
                </a>
                <div>
                  <button onClick={()=>{ startEditing(file)}}><span><i className="fa-solid fa-pen"></i></span></button>
                <button
                  className="text-red-500 ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFileWrapper(file.name);
                  }}
                >
                  <span><i className="fa-solid fa-minus"></i></span>
                </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
