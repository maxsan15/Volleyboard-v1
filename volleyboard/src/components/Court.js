import React, { useState, useRef, useEffect } from 'react';
import rotations from './Rotations';

function Court({ currentRotation, formation }) {
  const courtRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const scaleRef = useRef(1);

  const [players, setPlayers] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#000000');
  const [lastPoint, setLastPoint] = useState(null);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokes([]);
    setCurrentStroke([]);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const updatedStrokes = strokes.slice(0, -1);
    setStrokes(updatedStrokes);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw remaining strokes
    updatedStrokes.forEach(({ points, color }) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    });
  };

  // Resize and expand canvas width, then redraw strokes
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const courtWrapper = courtRef.current?.parentNode;
    if (!canvas || !courtWrapper) return;

    const rect = courtWrapper.getBoundingClientRect();
    const horizontalPadding = 600; // total extra width (300px each side)
    const scale = window.devicePixelRatio || 1;
    scaleRef.current = scale;

    // physical resolution
    canvas.width = (rect.width + horizontalPadding) * scale;
    canvas.height = rect.height * scale;
    // CSS size
    canvas.style.width = `${rect.width + horizontalPadding}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.style.position = 'absolute';
    canvas.style.left = `-${horizontalPadding / 2}px`;
    canvas.style.top = '0';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctxRef.current = ctx;

    // redraw all strokes after resizing
    strokes.forEach(({ points, color }) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      points.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    });
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isDrawingMode, strokes]); // also run when strokes change to keep canvas in sync

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const getEventPos = e => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      const clientY = e.touches?.[0]?.clientY ?? e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const startDrawing = e => {
      if (!isDrawingMode) return;
      e.preventDefault();
      const pos = getEventPos(e);
      setIsDrawing(true);
      setLastPoint(pos);
      setCurrentStroke([pos]);
    };

    const draw = e => {
      if (!isDrawingMode || !isDrawing || !lastPoint) return;
      const pos = getEventPos(e);
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      setLastPoint(pos);
      setCurrentStroke(prev => [...prev, pos]);
    };

    const stopDrawing = () => {
      if (!isDrawingMode) return;
      setIsDrawing(false);
      setLastPoint(null);
      if (currentStroke.length > 1) {
        setStrokes(prev => [...prev, { points: currentStroke, color: drawColor }]);
      }
      setCurrentStroke([]);
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
  }, [isDrawingMode, isDrawing, lastPoint, drawColor, currentStroke]);

  // Load rotation
  useEffect(() => {
    if (!rotations[currentRotation]?.[formation]) return;
    setPlayers(rotations[currentRotation][formation].map(p => ({ ...p })));
  }, [currentRotation, formation]);

  // Player dragging
  const handlePointerDown = id => e => {
    if (isDrawingMode) return;
    e.preventDefault();
    setDraggingId(id);
  };

  useEffect(() => {
    const handleMove = e => {
      if (draggingId === null || !courtRef.current) return;
      e.preventDefault();
      const rect = courtRef.current.getBoundingClientRect();
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      const clientY = e.touches?.[0]?.clientY ?? e.clientY;
      const newX = ((clientX - rect.left) / rect.width) * 100;
      const newY = ((clientY - rect.top) / rect.height) * 100;
      setPlayers(prev => prev.map(p => p.id === draggingId ? { ...p, x: newX, y: newY } : p));
    };
    const stop = () => setDraggingId(null);
    if (draggingId !== null) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', stop);
    }
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', stop);
    };
  }, [draggingId]);

  return (
    <div className="CourtContainer">
      {isDrawingMode && <div className="DrawModeNotice">Draw Mode Active</div>}
      <div className="CourtControls btn-group">
        <button className="btn btn-primary" onClick={() => setIsDrawingMode(prev => !prev)}>
          {isDrawingMode ? 'Switch to Move Players' : 'Switch to Draw Mode'}
        </button>
        <button className="btn btn-danger" onClick={clearCanvas}>Clear Drawings</button>
        <button className="btn btn-warning" onClick={handleUndo}>Undo Last Stroke</button>
        <select className="btn btn-light" value={drawColor} onChange={e => setDrawColor(e.target.value)}>
          <option value="#000000">Black</option>
          <option value="#FF0000">Red (Attack)</option>
          <option value="#0000FF">Blue (Defense)</option>
          <option value="#008000">Green (Setup)</option>
        </select>
      </div>
      <div className="CourtWrapper">
        <canvas ref={canvasRef} className="CourtCanvas" style={{ pointerEvents: isDrawingMode ? 'auto' : 'none' }} />
        <div className="Court" ref={courtRef}>
          <div className="Line" />
          {players.map(player => (
            <div
              key={player.id}
              className="Player"
              onMouseDown={handlePointerDown(player.id)}
              onTouchStart={handlePointerDown(player.id)}
              style={{ left: `${player.x}%`, top: `${player.y}%`, transform: 'translate(-50%, -50%)', pointerEvents: isDrawingMode ? 'none' : 'auto' }}
            >
              {player.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Court;