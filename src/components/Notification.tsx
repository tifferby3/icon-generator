import React from 'react';

export default function Notification({ message, type = 'info' }: { message: string; type?: 'info' | 'error' }) {
  return (
    <div style={{
      background: type === 'error' ? '#ffeaea' : '#eaf6ff',
      color: type === 'error' ? '#b71c1c' : '#1565c0',
      border: `1px solid ${type === 'error' ? '#f44336' : '#90caf9'}`,
      borderRadius: 6,
      padding: '10px 16px',
      margin: '16px 0',
      fontWeight: 500
    }}>
      {message}
    </div>
  );
}