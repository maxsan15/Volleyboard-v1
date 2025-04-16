import { useState } from 'react';
import Header from './components/Header';
import Court from './components/Court';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [currentRotation, setCurrentRotation] = useState(1);
  const [formation, setFormation] = useState('default');

  return (
    <div className="App">
      <Header 
        currentRotation={currentRotation}
        setCurrentRotation={setCurrentRotation}
        formation={formation}
        setFormation={setFormation}
      />
      <div className="main-content">
      <Court 
        currentRotation={currentRotation}
        formation={formation}
      />
      </div>
    </div>
  );
}

export default App;
