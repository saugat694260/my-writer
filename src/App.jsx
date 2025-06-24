import MySideBar from "./components/MySideBar";
import { useState ,useEffect} from "react";
import MyWritingArea from "./components/MyWritingArea";

function App() {
  const [text, setText] = useState('');
  const [selectedFileHandle, setSelectedFileHandle] = useState([]);  // NEW

  const [folderHandle, setFolderHandle] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [files, setFiles] = useState([]);
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [sortFile, setSortFile] = useState('name');
     const [sortDirection, setSortDirection] = useState('desc'); 
       const [time, setTime] = useState(0); 
       const [running, setRunning] = useState(false);

       
          const dark= localStorage.getItem('theme') === 'dark'
         
       
         useEffect(() => {
           const root = window.document.documentElement;
           if (dark) {
             root.classList.add('dark');
           } else {
             root.classList.remove('dark');
           }
         }, []);
       
      

  return (
    <>
      <main className="flex justify-center items-center h-screen bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen w-screen relative">
        <section className="absolute top-0 left-0 ">
          <MySideBar
            text={text}
            setText={setText}
            folderHandle={folderHandle}
            setFolderHandle={setFolderHandle}
            folderName={folderName}
            setFolderName={setFolderName}
            files={files}
            setFiles={setFiles}
            selectedFileHandle={selectedFileHandle}         
            setSelectedFileHandle={setSelectedFileHandle}   
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            sortFile={sortFile}
            setSortFile={setSortFile}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
              time={time}
               setTime={setTime}
                running={running} 
                setRunning={setRunning} 
            
          />
        </section>
        <section className="h-full w-[50%]">
          <MyWritingArea
            text={text}
            setText={setText}
            selectedFileHandle={selectedFileHandle} 
                    
          />
        </section>
      </main>
    </>
  );
}

export default App;
