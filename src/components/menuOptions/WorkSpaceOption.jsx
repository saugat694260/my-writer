import React, { useState } from 'react';
import WorkSpaceSubOption from './menuSubOptions/WorkSpaceSubOption';
import { openFolder, handleFileClick } from '../../utils/workSpaceFunctions';

export default function WorkSpaceOption({
  setText,
  text,
  folderHandle,
  setFolderHandle,
  folderName,
  setFolderName,
  files,
  setFiles,
  selectedFileHandle,
  setSelectedFileHandle,
  sortFile,
  setSortFile,
  sortDirection,
  setSortDirection
}) {
  const [inputText, setInputText] = useState('page');
  const [error, setError] = useState('');

  const handleOpenFolder = () => {
    openFolder(setFolderHandle, setFolderName, setFiles, setSelectedFileHandle, setText, setError);
  };

  const handleFileClickWrapper = (fileName) => {
    handleFileClick(fileName, files, setText, setSelectedFileHandle, setError);
  };

  return (
    <div className="w-full text-center p-4 mt-2">
      <div>
        <p className="text-red-500 absolute">{error || ''}</p>
      </div>
      <p className="mt-[50px] truncate overflow-hidden whitespace-nowrap w-full  "> <span className='font-bold '>{folderName || 'No folder selected'}</span></p>

      <button
        onClick={handleOpenFolder}
        className="hover:bg-gray-400 w-full bg-gray-200 py-2 dark:bg-gray-900 text-black dark:text-white dark:hover:bg-gray-800"
      >
        <i className="fa-solid fa-file-import mr-2"></i>
        Open Folder
      </button>

      {folderHandle && (
        <WorkSpaceSubOption
          folder={[folderHandle]}
          setFolder={setFolderHandle}
          files={files.map(f => f.name)}
          inputText={inputText}
          setInputText={setInputText}
          fileHandles={files}
          setFiles={setFiles}
          setText={setText}
          text={text}
          folderName={folderName}
          setFolderName={setFolderName}
          handleFileClick={handleFileClickWrapper}
          selectedFileHandle={selectedFileHandle}
          setSelectedFileHandle={setSelectedFileHandle}
          sortFile={sortFile}
          setSortFile={setSortFile}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          setError={setError}
          error={error}
        />
      )}
    </div>
  );
}
