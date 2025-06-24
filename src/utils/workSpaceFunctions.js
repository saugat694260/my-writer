// fileOperations.js

export async function openFolder(setFolderHandle, setFolderName, setFiles, setSelectedFileHandle, setText, setError) {
  try {
    const dirHandle = await window.showDirectoryPicker();
    const newFiles = [];

    for await (const [name, handle] of dirHandle.entries()) {
      if (handle.kind === 'file' && name.endsWith('.txt')) {
        newFiles.push({ name, handle });
      }
    }

    setFolderHandle(dirHandle);
    setFolderName(dirHandle.name);
    setFiles(newFiles);
    setSelectedFileHandle(null);
    setText('');
    setError('');
  } catch (error) {
    if (error.name !== 'AbortError') {
      setError('Error opening folder.');
    }
  }
}

export async function handleFileClick(fileName, files, setText, setSelectedFileHandle, setError) {
  try {
    const fileObj = files.find(f => f.name === fileName);
    if (!fileObj) {
      setError('File handle not found!');
      return;
    }

    const file = await fileObj.handle.getFile();
    const content = await file.text();

    setText(content);
    setSelectedFileHandle(fileObj.handle);
    setError('');
  } catch (error) {
    setError('Failed to load file content.');
  }
}

export async function handleAddFile(folder, inputText, setError, setFiles, setFilteredFiles) {
  try {
    if (!folder || folder.length === 0) {
      setError('No folder selected.');
      return;
    }

    const folderHandle = folder[0];
    const fileName = inputText.trim();

    if (!fileName || !fileName.endsWith('.txt')) {
      setError('Please enter a valid .txt file name.');
      return;
    }

    try {
      await folderHandle.getFileHandle(fileName);
      setError('File already exists.');
      return;
    } catch {}

    const newFileHandle = await folderHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write('');
    await writable.close();

    const newFile = await newFileHandle.getFile();
    const enrichedFile = {
      name: newFile.name,
      size: newFile.size,
      time: newFile.lastModified,
      handle: newFileHandle
    };

    setFiles(prev => [...prev, enrichedFile]);
    setFilteredFiles(prev => [...prev, enrichedFile]);
    setError('');
  } catch {
    setError('Failed to create file.');
  }
}

export async function handleDeleteFile(folder, fileName, fileHandles, setError, setFiles, setFilteredFiles, selectedFileHandle, setSelectedFileHandle, setText) {
  try {
    if (!folder || folder.length === 0) {
      setError('No folder selected.');
      return;
    }

    const folderHandle = folder[0];
    const fileObj = fileHandles.find(f => f.name === fileName);
    if (!fileObj) {
      setError('File handle not found.');
      return;
    }

    await folderHandle.removeEntry(fileName);
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setFilteredFiles(prev => prev.filter(f => f.name !== fileName));

    if (selectedFileHandle === fileObj.handle) {
      setSelectedFileHandle(null);
      setText('');
    }

    setError('');
  } catch {
    setError('Failed to delete file.');
  }
}

export async function saveRename(folder, editingFile, editingName, fileHandles, setError, setFiles, setFilteredFiles, selectedFileHandle, setSelectedFileHandle) {
  if (!folder || folder.length === 0) {
    setError('No folder selected.');
    return;
  }

  if (!editingName || !editingName.endsWith('.txt')) {
    setError('Filename must end with .txt');
    return;
  }

  try {
    const folderHandle = folder[0];
    const oldFileObj = fileHandles.find(f => f.name === editingFile);
    if (!oldFileObj) {
      setError('Original file not found.');
      return;
    }

    if (editingName !== editingFile) {
      try {
        await folderHandle.getFileHandle(editingName);
        setError('File with this name already exists.');
        return;
      } catch {}

      const oldFile = await oldFileObj.handle.getFile();
      const content = await oldFile.text();

      const newFileHandle = await folderHandle.getFileHandle(editingName, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      await folderHandle.removeEntry(editingFile);

      setFiles(prev =>
        prev.map(f =>
          f.name === editingFile ? { ...f, name: editingName, handle: newFileHandle } : f
        )
      );
      setFilteredFiles(prev =>
        prev.map(f =>
          f.name === editingFile ? { ...f, name: editingName, handle: newFileHandle } : f
        )
      );

      if (selectedFileHandle === oldFileObj.handle) {
        setSelectedFileHandle(newFileHandle);
      }
    }

    setError('');
  } catch {
    setError('Failed to rename file.');
  }
}
