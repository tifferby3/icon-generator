import React from 'react';

export default function LiveMockup({ svg }: { svg: string }) {
  return (
    <div style={{ margin: '24px 0', padding: 16, border: '1px dashed #ccc', borderRadius: 8, background: '#fafbfc' }}>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>Live Mockup</div>
      <div style={{ width: 96, height: 96, margin: '0 auto' }} dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}