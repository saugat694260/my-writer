// writingAreaUtils.js
export async function saveFileContent(selectedFileHandle, content) {
  if (!selectedFileHandle) return;

  try {
    const writable = await selectedFileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  } catch (error) {
    console.error('Failed to save file:', error);
  }
}
