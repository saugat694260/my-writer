import React from 'react';
import OpenMenuOption from './menuOptions/OpenMenuOption';
import SaveMenuOption from './menuOptions/SaveMenuOption';
import SettingMenuOption from './menuOptions/SettingMenuOption';
import WorkSpaceOption from './menuOptions/WorkSpaceOption';
import InfosMenuOption from './menuOptions/InfosMenuOption';
import NoticeMenuOption from './menuOptions/NoticeMenuOption';

export default function MySideBarSubContent({
  options,
  setSubMenu,
  text,
  setText,
  folderHandle,
  setFolderHandle,
  folderName,
  setFolderName,
  files,
  setFiles,
  setSelectedFileHandle,
  selectedFiles,
  setSelectedFiles,
  sortFile,
  setSortFile,
  sortDirection,
  setSortDirection,
  time,
  setTime,
  running,
  setRunning,
}) {
  const selectedOptionEvent = () => {
    switch (options) {
      case 'open':
        return (
          <OpenMenuOption
            setText={setText}
            setSelectedFileHandle={setSelectedFileHandle}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        );

      case 'workspace':
        return (
          <WorkSpaceOption
            setText={setText}
            text={text}
            folderHandle={folderHandle}
            setFolderHandle={setFolderHandle}
            folderName={folderName}
            setFolderName={setFolderName}
            files={files}
            setFiles={setFiles}
            setSelectedFileHandle={setSelectedFileHandle}
            sortFile={sortFile}
            setSortFile={setSortFile}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        );

      case 'save':
        return <SaveMenuOption text={text} />;

      case 'settings':
        return <SettingMenuOption time={time} setTime={setTime} running={running} setRunning={setRunning} />;

      case 'info':
        return <InfosMenuOption/>

      case 'notice':
        return <NoticeMenuOption/>

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-300 absolute w-[87%] h-full right-0 top-0 dark:bg-gray-900 text-black dark:text-white">
      <p className="flex p-4">{options}</p>
      {selectedOptionEvent()}
    </div>
  );
}
