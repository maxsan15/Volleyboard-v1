// src/components/Player.tsx
import React, { useState, useRef } from 'react';

interface PlayerProps {
  id: number;
  x: number;
  y: number;
  updatePosition: (id: number, newX: number, newY: number) => void;
}

const Player: React.FC<PlayerProps> = ({ id, x, y, updatePosition }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const offsetRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });
  const containerRectRef = useRef<DOMRect | null>(null);

  // Initiate dragging: capture pointer and calculate offset relative to container
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);

    // Get container bounding rectangle; default to null if undefined
    const containerRect = playerRef.current?.offsetParent?.getBoundingClientRect();
    containerRectRef.current = containerRect || null;

    // Compute offset relative to container coordinate system
    if (containerRectRef.current) {
      offsetRef.current = {
        offsetX: e.clientX - containerRectRef.current.left - x,
        offsetY: e.clientY - containerRectRef.current.top - y,
      };
    }
  };

  // Update player's position while dragging using container coordinates
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !containerRectRef.current) return;
    const newX = e.clientX - containerRectRef.current.left - offsetRef.current.offsetX;
    const newY = e.clientY - containerRectRef.current.top - offsetRef.current.offsetY;
    updatePosition(id, newX, newY);
  };

  // End dragging and release pointer capture
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'dodgerblue',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {id}
    </div>
  );
};

/** const RotationData = {
  rotations: [
    { // Rotation 1
        positions: [
            { name: "S", x: 500, y: 450 },      //Position 1
            { name: "OH1", x: 500, y: 250 },    //Position 2
            { name: "M2", x: 400, y: 250 },     //Position 3
            { name: "OP", x: 300, y: 250 },     //Position 4
            { name: "OH2", x: 300, y: 450 },    //Position 5
            { name: "L", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "S", x: 500, y: 575},       //Position 1
            { name: "OH1", x: 425, y: 250 },    //Position 2
            { name: "M2", x: 400, y: 200 },     //Position 3
            { name: "OP", x: 375, y: 250 },     //Position 4
            { name: "OH2", x: 400, y: 450 },    //Position 5
            { name: "L", x: 450, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "S", x: 510, y: 455 },      //Position 1
            { name: "OH1", x: 475, y: 425 },    //Position 2
            { name: "M2", x: 280, y: 250 },     //Position 3
            { name: "OP", x: 265, y: 200 },     //Position 4
            { name: "OH2", x: 325, y: 425 },    //Position 5
            { name: "L", x: 400, y: 425 }       //Position 6
        ],
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_1"
    },

    { // Rotation 2
        positions: [
            { name: "OH1", x: 500, y: 450 },    //Position 1
            { name: "M2", x: 500, y: 250 },     //Position 2
            { name: "OP", x: 400, y: 250 },     //Position 3
            { name: "OH2", x: 300, y: 250 },    //Position 4
            { name: "L", x: 300, y: 450 },      //Position 5
            { name: "S", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "OH1", x: 500, y: 575 },    //Position 1
            { name: "M2", x: 400, y: 200 },     //Position 2
            { name: "OP", x: 375, y: 250 },     //Position 3
            { name: "OH2", x: 330, y: 200 },    //Position 4
            { name: "L", x: 300, y: 375 },      //Position 5
            { name: "S", x: 500, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "OH1", x: 500, y: 425 },    //Position 1
            { name: "M2", x: 525, y: 275 },     //Position 2
            { name: "OP", x: 500, y: 200 },     //Position 3
            { name: "OH2", x: 300, y: 400 },    //Position 4
            { name: "L", x: 400, y: 425 },      //Position 5
            { name: "S", x: 450, y: 250 }       //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_2"
    },

    { // Rotation 3
        positions: [
            { name: "L", x: 500, y: 450 },       //Position 1
            { name: "OP", x: 500, y: 250 },      //Position 2
            { name: "OH2", x: 400, y: 250 },     //Position 3
            { name: "M1", x: 300, y: 250 },      //Position 4
            { name: "S", x: 300, y: 450 },       //Position 5
            { name: "OH1", x: 400, y: 450 }      //Position 6
        ],
        servePositions: [
            { name: "M2", x: 500, y: 575 },      //Position 1
            { name: "OP", x: 475, y: 200 },      //Position 2
            { name: "OH2", x: 425, y: 250 },     //Position 3
            { name: "M1", x: 400, y: 200 },      //Position 4
            { name: "S", x: 350, y: 375 },       //Position 5
            { name: "OH1", x: 400, y: 450 }      //Position 6
        ],
        receivePositions: [
            { name: "L", x: 475, y: 425 },       //Position 1
            { name: "OP", x: 525, y: 275 },      //Position 2
            { name: "OH2", x: 300, y: 400 },     //Position 3
            { name: "M1", x: 275, y: 250 },      //Position 4
            { name: "S", x: 350, y: 275 },       //Position 5
            { name: "OH1", x: 400, y: 425 }      //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_3"
    },

    { // Rotation 4
        positions: [
            { name: "OP", x: 500, y: 450 },      //Position 1
            { name: "OH2", x: 500, y: 250 },     //Position 2
            { name: "M1", x: 400, y: 250 },      //Position 3
            { name: "S", x: 300, y: 250 },       //Position 4
            { name: "OH1", x: 300, y: 450 },     //Position 5
            { name: "L", x: 400, y: 450 }        //Position 6
        ],
        servePositions: [
            { name: "OP", x: 500, y: 575 },      //Position 1
            { name: "OH2", x: 425, y: 250 },     //Position 2
            { name: "M1", x: 400, y: 200 },      //Position 3
            { name: "S", x: 375, y: 250 },       //Position 4
            { name: "OH1", x: 400, y: 450 },     //Position 5
            { name: "L", x: 450, y: 375 }        //Position 6
        ],
        receivePositions: [
            { name: "OP", x: 510, y: 525 },      //Position 1
            { name: "OH2", x: 325, y: 400 },     //Position 2
            { name: "M1", x: 280, y: 250 },      //Position 3
            { name: "S", x: 265, y: 200 },       //Position 4
            { name: "OH1", x: 475, y: 425 },     //Position 5
            { name: "L", x: 400, y: 425 }        //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_4"
    },

    { // Rotation 5
        positions: [
            { name: "OH2", x: 500, y: 450 },     //Position 1
            { name: "M1", x: 500, y: 250 },      //Position 2
            { name: "S", x: 400, y: 250 },       //Position 3
            { name: "OH1", x: 300, y: 250 },     //Position 4
            { name: "L", x: 300, y: 450 },       //Position 5
            { name: "OP", x: 400, y: 450 }       //Position 6
        ],
        servePositions: [
            { name: "OH2", x: 500, y: 575 },     //Position 1
            { name: "M1", x: 400, y: 200 },      //Position 2
            { name: "S", x: 375, y: 250 },       //Position 3
            { name: "OH1", x: 330, y: 200 },     //Position 4
            { name: "L", x: 300, y: 375 },       //Position 5
            { name: "OP", x: 500, y: 375 }       //Position 6
        ],
        receivePositions: [
            { name: "OH2", x: 475, y: 425 },     //Position 1
            { name: "M1", x: 525, y: 275 },      //Position 2
            { name: "S", x: 450, y: 200 },       //Position 3
            { name: "OH1", x: 325, y: 400 },     //Position 4
            { name: "L", x: 400, y: 425 },       //Position 5
            { name: "OP", x: 450, y: 525 }       //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_5"
    },

    { // Rotation 6
        positions: [
            { name: "M1", x: 500, y: 450 },      //Position 1
            { name: "S", x: 500, y: 250 },       //Position 2
            { name: "OH1", x: 400, y: 250 },     //Position 3
            { name: "M2", x: 300, y: 250 },      //Position 4
            { name: "OP", x: 300, y: 450 },      //Position 5
            { name: "OH2", x: 400, y: 450 }      //Position 6
        ],
        servePositions: [
            { name: "M1", x: 500, y: 575 },      //Position 1
            { name: "S", x: 475, y: 200 },       //Position 2
            { name: "OH1", x: 425, y: 250 },     //Position 3
            { name: "M2", x: 400, y: 200 },      //Position 4
            { name: "OP", x: 350, y: 375 },      //Position 5
            { name: "OH2", x: 400, y: 450 }      //Position 6
        ],
        receivePositions: [
            { name: "L", x: 475, y: 425 },       //Position 1
            { name: "S", x: 450, y: 200 },       //Position 2
            { name: "OH1", x: 325, y: 400 },     //Position 3
            { name: "M2", x: 275, y: 275 },      //Position 4
            { name: "OP", x: 350, y: 525 },      //Position 5
            { name: "OH2", x: 400, y: 425 }      //Position 6
        ], 
        youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_6"
    }, */

export default Player;