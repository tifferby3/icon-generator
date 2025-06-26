import React from 'react';

export default function PromptInput({ value, onChange, onSubmit }: { value: string; onChange: (v: string) => void; onSubmit: () => void }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Describe your icon (e.g. farming management system)"
        style={{ flex: 1, padding: 8, fontSize: 16 }}
      />
      <button type="submit" style={{ padding: '8px 16px', fontSize: 16 }}>Generate</button>
    </form>
  );
}