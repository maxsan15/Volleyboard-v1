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
      <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              console.log('Serve button clicked');
              setFormation('serve');
            }}
          >
            Serve
          </button>
            <select className="btn btn-light rotation-button" type="button" data-bs-toggle="dropdown" aria-expanded="false"
              value={currentRotation}
              onChange={(e) => {
                const selected = Number(e.target.value);

                if (selected === currentRotation) {
                  setFormation('default');
                } else {
                  setCurrentRotation(selected);
                  setFormation('default'); // <- reset to default
                }
              }}
              >
                <option class="dropdown-item" value={1}>Rotation 1</option>
                <option class="dropdown-item" value={2}>Rotation 2</option>
                <option class="dropdown-item" value={3}>Rotation 3</option>
                <option class="dropdown-item" value={4}>Rotation 4</option>
                <option class="dropdown-item" value={5}>Rotation 5</option>
                <option class="dropdown-item" value={6}>Rotation 6</option>
            </select>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              console.log('Receive button clicked');
              setFormation('receive');
            }}
          >
          Receive
          </button>
        </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setFormation(null); // temporarily force a change
              setTimeout(() => setFormation('default'), 0); // immediately back to default
            }}
          >
            Reset Rotation
          </button>
  </div>
  );
}

export default Header;