// openMenuUtils.js
export async function chooseFiles(setText, setSelectedFileHandle, setSelectedFiles) {
  try {
    const fileHandles = await window.showOpenFilePicker({
      multiple: true,
      types: [
        {
          description: 'Text files',
          accept: {
            'text/plain': ['.txt'],
          },
        },
      ],
    });

    const filesData = [];

    for (const fileHandle of fileHandles) {
      const file = await fileHandle.getFile();
      const content = await file.text();

      filesData.push({
        name: file.name,
        size: file.size,
        content: content,
      });
    }

    setSelectedFiles(filesData);

    // Set text for the first file
    if (filesData.length > 0) {
      setText(filesData[0].content);
      setSelectedFileHandle(fileHandles[0]); // Enables autosaving
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('File picking was canceled');
    } else {
      console.error('Error reading file:', err);
    }
  }
}
