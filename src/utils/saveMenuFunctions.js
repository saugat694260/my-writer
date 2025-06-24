// saveUtils.js
export function downloadFile(text, fileName, format) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}${format}`;
  a.click();
  URL.revokeObjectURL(url);
}
