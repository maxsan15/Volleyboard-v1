// src/components/RotationSelector.tsx
import React from 'react';

// Props for the rotation selector component
interface RotationSelectorProps {
  rotation: number;
  setRotation: (rotation: number) => void;
}

// Component to allow the user to select a rotation (1-6)
const RotationSelector: React.FC<RotationSelectorProps> = ({ rotation, setRotation }) => {
  // Handle dropdown change events
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRotation = parseInt(event.target.value, 10);
    setRotation(newRotation);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="rotation-select">Select Rotation: </label>
      <select id="rotation-select" value={rotation} onChange={handleChange}>
        {[1, 2, 3, 4, 5, 6].map((rot) => (
          <option key={rot} value={rot}>
            {`Rotation ${rot}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RotationSelector;