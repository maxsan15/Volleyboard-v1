// src/components/Court.tsx
import React, { useState } from 'react';
import Player from './Player';
import { PlayerData } from './Player';

// Define a type for a rotation set (6 rotations per set)
interface RotationSet {
  [rotation: number]: PlayerData[];
}

/*
  For this vertical layout, we base our percentages on a 600x900 container.
  Real dimensions: each side is 9m. Here, we display our team's side (9m) plus 
  half of the opposing side (4.5m) = 13.5m total.
  Our side occupies 9/13.5 ≈ 66.67% of the vertical space.
*/

// Default rotations – positions for our team (all players on our side)
const defaultRotations: RotationSet = {
  1: [
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
  ],
  2: [ 
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
   ],
  3: [ 
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
   ],
  4: [ 
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
   ],
  5: [ 
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
   ],
  6: [ 
    { id: 'OH1', x: 20, y: 40, color: '#000' },
    { id: 'S',   x: 50, y: 35, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 40, color: '#000' },
    { id: 'M1',  x: 30, y: 55, color: '#000' },
    { id: 'OP',  x: 50, y: 60, color: '#000' },
    { id: 'M2',  x: 70, y: 55, color: '#000' },
   ],
};

// Serve rotations – positions shifted slightly upward (closer to the net)
const serveRotations: RotationSet = {
  1: [
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' },
  ],
  2: [ 
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' }, ],

  3: [ 
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' }, ],

  4: [ 
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' }, ],

  5: [ 
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' }, ],

  6: [ 
    { id: 'OH1', x: 20, y: 38, color: '#000' },
    { id: 'S',   x: 50, y: 33, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 38, color: '#000' },
    { id: 'M1',  x: 30, y: 53, color: '#000' },
    { id: 'OP',  x: 50, y: 58, color: '#000' },
    { id: 'M2',  x: 70, y: 53, color: '#000' }, ],

};

// Receive rotations – positions shifted slightly downward (deeper on our side)
const receiveRotations: RotationSet = {
  1: [
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
  ],
  2: [ 
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
   ],
  3: [ 
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
   ],
  4: [ 
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
   ],
  5: [ 
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
   ],
  6: [ 
    { id: 'OH1', x: 20, y: 42, color: '#000' },
    { id: 'S',   x: 50, y: 37, color: '#467fbd' },
    { id: 'OH2', x: 80, y: 42, color: '#000' },
    { id: 'M1',  x: 30, y: 57, color: '#000' },
    { id: 'OP',  x: 50, y: 62, color: '#000' },
    { id: 'M2',  x: 70, y: 57, color: '#000' },
   ],
};

// Combine all rotation sets
const rotationSets = {
  default: defaultRotations,
  serve: serveRotations,
  receive: receiveRotations,
};

type RotationSetName = keyof typeof rotationSets;

const Court: React.FC = () => {
  // Active set: "default", "serve", or "receive"
  const [activeSet, setActiveSet] = useState<RotationSetName>('default');
  // Rotation number (1–6)
  const [rotationIndex, setRotationIndex] = useState<number>(1);

  // When the dropdown changes, force the active set to "default"
  const handleRotationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveSet('default');
    setRotationIndex(parseInt(e.target.value, 10));
  };

  // Clicking Serve or Receive changes the active set
  const handleSetChange = (setName: RotationSetName) => {
    setActiveSet(setName);
  };

  // Determine container max width based on screen size
  const maxWidth =
    typeof window !== 'undefined' && window.innerWidth < 768 ? '400px' : '600px';

  // Get current players’ positions from the selected set and rotation
  const currentPlayers = rotationSets[activeSet][rotationIndex];

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Top controls: Serve button, rotation dropdown, Receive button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        <button
          onClick={() => handleSetChange('serve')}
          style={{ padding: '8px 16px', fontSize: '1rem' }}
        >
          Serve
        </button>
        <select
          value={rotationIndex}
          onChange={handleRotationChange}
          style={{ padding: '8px', fontSize: '1rem' }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              Rotation {num}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleSetChange('receive')}
          style={{ padding: '8px 16px', fontSize: '1rem' }}
        >
          Receive
        </button>
      </div>

      {/* Display active set and rotation */}
      <div style={{ marginBottom: '10px', fontSize: '1rem' }}>
        Active Set: <strong>{activeSet}</strong>, Rotation:{' '}
        <strong>{rotationIndex}</strong>
      </div>

      {/* Responsive volleyball court container */}
      <div
        style={{
          position: 'relative',
          width: '90%',
          maxWidth,
          height: 0,
          paddingBottom: '150%', // 2:3 aspect ratio (e.g., 600x900)
          margin: '20px auto',
          backgroundColor: '#ddd',
          border: '2px solid #000',
        }}
      >
        {/* Draw a horizontal dashed net line at 66.67% from the top.
            Since our display represents 13.5m total height,
            our side (9m) occupies 66.67% and the opposing near half (4.5m) is 33.33%. */}
        <div
          style={{
            position: 'absolute',
            top: '66.67%',
            left: 0,
            width: '100%',
            borderTop: '2px dashed #999',
          }}
        />
        {/* Render players (positions are relative to a 600x900 container) */}
        {currentPlayers.map((player) => (
          <Player
            key={player.id}
            id={player.id}
            x={player.x}
            y={player.y}
            color={player.color}
            updatePosition={() => {
              /* Manual dragging is not used in this rotation example */
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Court;
