import React from 'react';

export default function BulkDownloadButton({ svgs }: { svgs: string[] }) {
  const handleBulkDownload = async () => {
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svgs }),
      });
      if (!res.ok) throw new Error('Failed to download ZIP');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'icons.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Bulk download failed.');
    }
  };
  return (
    <button onClick={handleBulkDownload} style={{ padding: '8px 16px', fontSize: 15, margin: '16px 0' }}>Download All as ZIP</button>
  );
}