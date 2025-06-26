import React from 'react';

export default function SVGPreviewGrid({ svgs, onSelect }: { svgs: string[]; onSelect?: (svg: string) => void }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))', gap: 16, marginTop: 24 }}>
      {svgs.map((svg, i) => (
        <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8, background: '#fff', cursor: onSelect ? 'pointer' : 'default' }} onClick={() => onSelect?.(svg)}>
          <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: 64, height: 64, margin: '0 auto' }} />
        </div>
      ))}
    </div>
  );
}