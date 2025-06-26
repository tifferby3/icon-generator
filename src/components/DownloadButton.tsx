import React from 'react';

export default function DownloadButton({ svg, filename }: { svg: string; filename: string }) {
  const handleDownload = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button onClick={handleDownload} style={{ padding: '6px 12px', fontSize: 14, marginTop: 8 }}>Download SVG</button>
  );
}