// src/App.tsx
import React, { useState } from 'react';
import Court from './components/Court';
import RotationSelector from './components/RotationSelector';

const App: React.FC = () => {
  const [rotation, setRotation] = useState<number>(1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',      // Ensure the container is at least as tall as the viewport
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'auto',        // Allow scrolling if needed
      }}
    >
      <h1>Volleyball Rotations & Substitutions Tracker</h1>
      <RotationSelector rotation={rotation} setRotation={setRotation} />
      <Court rotation={rotation} />
    </div>
  );
};

export default App;