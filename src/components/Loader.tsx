import React from 'react';

export default function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
        <circle cx="24" cy="24" r="20" stroke="#888" strokeWidth="4" fill="none" opacity="0.2" />
        <path d="M44 24a20 20 0 1 1-8-16" stroke="#0070f3" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      <div style={{ marginTop: 16 }}>Generating icons…</div>
    </div>
  );
}