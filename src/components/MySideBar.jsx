import React, { useState, useEffect, useRef } from 'react';
import MySideBarSubContent from './MySideBarSubContent';
import { myFullScreen } from '../utils/fullScreen';

export default function MySideBar({
  text,
  setText,
  folderHandle,
  setFolderHandle,
  folderName,
  setFolderName,
  files,
  setFiles,
   setSelectedFileHandle,
   selectedFiles, setSelectedFiles
   ,
    sortFile,
            setSortFile,
            sortDirection,
            setSortDirection,
            time,setTime,running,setRunning
}) {
  const [subMenu, setSubMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [sideBar, setSideBar] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    if (!sideBarRef.current) return;

    const options = sideBarRef.current.querySelectorAll('a');
    const handleClick = (e) => {
      e.preventDefault();
      const label = e.currentTarget.innerText.trim().toLowerCase();

      if (label !== 'writer' && label !== 'toggle full screen' && label !== 'new') {
        setSelectedOption(label);
        setSubMenu(true);
      }
    };

    options.forEach((option) => {
      const label = option.textContent.trim().toLowerCase();
      if (label !== 'writer' && label !== 'toggle full screen' && label !== 'new') {
        option.addEventListener('click', handleClick);
      }
    });

    return () => {
      options.forEach((option) => {
        const label = option.textContent.trim().toLowerCase();
        if (label !== 'writer' && label !== 'toggle full screen' && label !== 'new') {
          option.removeEventListener('click', handleClick);
        }
      });
    };
  }, [sideBar]);

  return (
    <>
      {!sideBar && (
       <button onClick={() => setSideBar(true)}>
  <span>
    <img
      src="https://cdn2.steamgriddb.com/icon/a236d3f651b6736c17ae3d4b55e63697.ico"
      alt="goku"
      style={{ width: '62px', height: '62px', padding:'4px' }}
    />
  </span>
  <span></span>
</button>

      )}

      {sideBar && (
        <div className="h-screen bg-gray-300 dark:bg-gray-800 text-slate-600 dark:bg-gray-900 text-black dark:text-white flex flex-col w-[300px] text-2xl duration-400 overflow-hidden fixed z-10">

          <div
            ref={sideBarRef}
            className="flex flex-col p-4 side-bar [&_span]:mr-2 [&_a]:hover:bg-gray-400 duration-200 [&_a]:p-2 [&_a]:rounded relative h-full [&_a]:hover:dark:hover:bg-gray-800"
          >
            {subMenu && (
              <MySideBarSubContent
                options={selectedOption}
                setSubMenu={setSubMenu}
                text={text}
                setText={setText}
                folderHandle={folderHandle}
                setFolderHandle={setFolderHandle}
                folderName={folderName}
                setFolderName={setFolderName}
                files={files}
                setFiles={setFiles}
                 setSelectedFileHandle={setSelectedFileHandle}
                  selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
             sortFile={sortFile}
            setSortFile={setSortFile}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
              time={time} setTime={setTime} running={running} setRunning={setRunning} 
              />
            )}

            <div>
              <a
                className="p-2 rounded"
                onClick={() => setSideBar(false)}
              >
                <span>
                  <i className="fa-solid fa-less-than"></i>
                </span>{' '}
                writer
              </a>
            </div>

            <div className="grid grid-row-5 gap-4 pt-4">
              <a href="#" onClick={() => { setText(' ') }}>
                <span>
                  <i className="fa-solid fa-file"></i>
                </span>
                <span> new</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-brands fa-creative-commons-nd"></i>
                </span>
                <span>workspace</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-solid fa-folder-open"></i>
                </span>
                <span>open</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-solid fa-floppy-disk"></i>
                </span>
                <span>save</span>
              </a>
              <a href="#" onClick={() => { myFullScreen() }}>
                <span>
                  <i className="fa-solid fa-expand"></i>
                </span>
                <span>toggle full screen</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-solid fa-gear"></i>
                </span>
                <span>settings</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-solid fa-circle-info"></i>
                </span>
                <span>info</span>
              </a>
              <a href="#">
                <span>
                  <i className="fa-solid fa-circle-exclamation"></i>
                </span>
                <span>notice</span>
              </a>
            </div>


           
          </div>
        </div>
      )}
    </>
  );
}
