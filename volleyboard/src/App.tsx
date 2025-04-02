// src/App.tsx
import React from 'react';
import Court from './components/Court';

const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'auto',
      }}
    >
      <h1>Volleyball Rotations & Substitutions Tracker</h1>
      <Court />
    </div>
  );
};

export default App;
