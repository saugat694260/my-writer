import React, { useRef, useEffect } from 'react';
import MyLettersTracker from './widgets/MyLettersTracker';
import { saveFileContent } from '../utils/myWritingAreaFunctions';  // adjust path if needed

export default function MyWritingArea({ text, setText, selectedFileHandle }) {
  const divRef = useRef(null);

  // Handler for when user edits the contentEditable div
  const handleInput = async () => {
    const currentText = divRef.current?.innerText || '';
    setText(currentText);

    await saveFileContent(selectedFileHandle, currentText);
  };

  // When `text` changes externally (like file load), update the contentEditable div content
  useEffect(() => {
    if (divRef.current && divRef.current.innerText !== text) {
      divRef.current.innerText = text;
    }
  }, [text]);

  // Calculate word and character counts
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.replace(/\s/g, '').length;

  return (
    <div className='h-full flex flex-col'>
      <div
        ref={divRef}
        className="h-full focus:outline-none text-xl p-4 whitespace-pre-wrap break-words overflow-y-scroll hide-scrollbar selection:bg-blue-200 text-slate-700 break-all dark:bg-gray-800 dark:text-white "
        contentEditable={true}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        spellCheck={false}
      />
      <MyLettersTracker wordCount={wordCount} charCount={charCount} />
    </div>
  );
}
