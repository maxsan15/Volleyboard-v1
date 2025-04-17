import React, { useState, useRef, useEffect } from 'react';
import rotations from './Rotations';

function Court({ currentRotation, formation }) {
  const courtRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawColor, setDrawColor] = useState('#000000');
  const [lastPoint, setLastPoint] = useState(null);
  const scaleRef = useRef(1); // 👈 New scale reference

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // ---- 1. Setup resizeCanvas ONLY ONCE ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const court = courtRef.current;
    if (!canvas || !court) return;

    const resizeCanvas = () => {
      const rect = court.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      scaleRef.current = scale; // ✅ Store latest scale!
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctxRef.current = canvas.getContext('2d');
      ctxRef.current.setTransform(scale, 0, 0, scale, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Empty dependency array: only run once

  // ---- 2. Setup Drawing Listeners ----
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const getEventPos = (e) => {
      const court = courtRef.current;
      const rect = court.getBoundingClientRect();
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const startDrawing = (e) => {
      if (!isDrawingMode) return;
      e.preventDefault();
      const { x, y } = getEventPos(e);
      setIsDrawing(true);
      setLastPoint({ x, y });
    };

    const draw = (e) => {
      if (!isDrawingMode || !isDrawing || !lastPoint) return;
      const { x, y } = getEventPos(e);

      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.strokeStyle = drawColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      setLastPoint({ x, y });
    };

    const stopDrawing = () => {
      if (!isDrawingMode) return;
      setIsDrawing(false);
      setLastPoint(null);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);

      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawingMode, isDrawing, lastPoint, drawColor]); // ✅ depends only on drawing needs

  // ---- 3. Load player rotation layout ----
  useEffect(() => {
    if (!rotations[currentRotation] || !rotations[currentRotation][formation]) {
      console.warn('Invalid rotation or formation:', currentRotation, formation);
      return;
    }

    const layout = rotations[currentRotation][formation];
    const clonedLayout = layout.map((p) => ({ ...p }));
    setPlayers(clonedLayout);
  }, [currentRotation, formation]);

  const handlePointerDown = (id) => (e) => {
    if (isDrawingMode) return;
    e.preventDefault();
    setDraggingId(id);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (draggingId === null || !courtRef.current) return;

      const courtRect = courtRef.current.getBoundingClientRect();
      let clientX, clientY;

      if (e.type.startsWith('touch')) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const newX = ((clientX - courtRect.left) / courtRect.width) * 100;
      const newY = ((clientY - courtRect.top) / courtRect.height) * 100;

      setPlayers((prev) =>
        prev.map((p) =>
          p.id === draggingId ? { ...p, x: newX, y: newY } : p
        )
      );
    };

    const handlePointerUp = () => {
      setDraggingId(null);
    };

    if (draggingId !== null) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handlePointerUp);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handlePointerUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handlePointerUp);
    };
  }, [draggingId]);

  return (
    <div className="CourtContainer">
      {isDrawingMode && (
        <div className="DrawModeNotice">Draw Mode Active</div>
      )}

      <div className="CourtControls btn-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsDrawingMode((prev) => !prev)}
        >
          {isDrawingMode ? 'Switch to Move Players' : 'Switch to Draw Mode'}
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={clearCanvas}
        >
          Clear Drawings
        </button>

        <select
          className="btn btn-light"
          value={drawColor}
          onChange={(e) => setDrawColor(e.target.value)}
        >
          <option value="#000000">Black</option>
          <option value="#FF0000">Red (Attack)</option>
          <option value="#0000FF">Blue (Defense)</option>
          <option value="#008000">Green (Setup)</option>
        </select>
      </div>

      <div className="Court" ref={courtRef}>
        <canvas
          ref={canvasRef}
          className="CourtCanvas"
        />
        <div className="Line" />

        {players.map((player) => (
          <div
            key={player.id}
            className="Player"
            onMouseDown={handlePointerDown(player.id)}
            onTouchStart={handlePointerDown(player.id)}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: isDrawingMode ? 'none' : 'auto',
            }}
          >
            {player.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Court;