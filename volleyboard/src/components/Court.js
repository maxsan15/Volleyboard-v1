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
  const scaleRef = useRef(1);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 🖼️ Expand canvas width (only) beyond court
  useEffect(() => {
    const canvas = canvasRef.current;
    const court = courtRef.current;
    if (!canvas || !court) return;

    const resizeCanvas = () => {
      const rect = court.getBoundingClientRect();
      const horizontalPadding = 400; // 👈 Add 20px on each side
      const scale = window.devicePixelRatio || 1;
      scaleRef.current = scale;

      canvas.width = (rect.width + horizontalPadding) * scale;
      canvas.height = rect.height * scale;

      canvas.style.width = `${rect.width + horizontalPadding}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.style.position = 'absolute';
      canvas.style.left = `-${horizontalPadding / 2}px`;
      canvas.style.top = `0`;
      canvas.style.pointerEvents = isDrawingMode ? 'auto' : 'none';

      ctxRef.current = canvas.getContext('2d');
      ctxRef.current.setTransform(scale, 0, 0, scale, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isDrawingMode]);

  // 🖊️ Drawing listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // ✅ Use canvas bounds for accurate drawing position
    const getEventPos = (e) => {
      const rect = canvas.getBoundingClientRect();
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
  }, [isDrawingMode, isDrawing, lastPoint, drawColor]);

  // 🔁 Load player layout
  useEffect(() => {
    if (!rotations[currentRotation] || !rotations[currentRotation][formation]) {
      console.warn('Invalid rotation or formation:', currentRotation, formation);
      return;
    }

    const layout = rotations[currentRotation][formation];
    const clonedLayout = layout.map((p) => ({ ...p }));
    setPlayers(clonedLayout);
  }, [currentRotation, formation]);

  // 🖱️ Start dragging
  const handlePointerDown = (id) => (e) => {
    if (isDrawingMode) return;
    e.preventDefault();
    setDraggingId(id);
  };

  // 🏃 Player movement
  useEffect(() => {
    const handleMove = (e) => {
      if (draggingId === null || !courtRef.current) return;
      e.preventDefault();

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
      document.addEventListener('touchmove', handleMove, { passive: false });
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

      {/* 🎛️ Controls */}
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

      {/* 🏐 Court and Canvas */}
      <div className="Court" ref={courtRef} style={{ position: 'relative' }}>
        {/* Wider canvas layered below player icons */}
        <canvas
          ref={canvasRef}
          className="CourtCanvas"
          style={{ zIndex: 1 }}
        />

        <div className="Line" />

        {/* 🧍 Players */}
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