import React from 'react';
import ReactDOM from 'react-dom/client';

function Header() {
  return (
    <div className="Header">
        <button type="button" className="serve-btn btn btn-light">Serve</button>
        <div className="dropdown dd-menu">
            <button className="btn btn-light dropdown-toggle rotation-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Rotation
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Rotation 1</a></li>
                <li><a className="dropdown-item" href="#">Rotation 2</a></li>
                <li><a className="dropdown-item" href="#">Rotation 3</a></li>
                <li><a className="dropdown-item" href="#">Rotation 4</a></li>
                <li><a className="dropdown-item" href="#">Rotation 5</a></li>
                <li><a className="dropdown-item" href="#">Rotation 6</a></li>
            </ul>
        </div>
        <button type="button" className="btn btn-light receive-btn">Receive</button>
    </div>
  );
}

export default Header;


