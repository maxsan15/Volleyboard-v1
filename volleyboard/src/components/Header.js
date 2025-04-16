import React from 'react';
import ReactDOM from 'react-dom/client';

function Header({
  currentRotation,
  setCurrentRotation,
  formation,
  setFormation,
}) {
  return (
    <div className="Header">
        <button type="button" className="btn btn-light serve-btn" onClick={() => setFormation('serve')}>Serve</button>
        <div className="dropdown dd-menu">
            <select className="btn btn-light dropdown-toggle rotation-button" type="button" data-bs-toggle="dropdown" aria-expanded="false"
              value={currentRotation}
              onChange={(e) => {
                setCurrentRotation(Number(e.target.value));
                setFormation(null); // <- reset to default
              }}
              >
                <option value={1}>Rotation 1</option>
                <option value={2}>Rotation 2</option>
                <option value={3}>Rotation 3</option>
                <option value={4}>Rotation 4</option>
                <option value={5}>Rotation 5</option>
                <option value={6}>Rotation 6</option>
            </select>
        </div>
        <button type="button" className="btn btn-light receive-btn" onClick={() => setFormation('receive')}>Receive</button>
    </div>
  );
}

export default Header;