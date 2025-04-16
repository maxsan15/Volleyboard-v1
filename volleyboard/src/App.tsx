import Court from './components/Court/Court';
import RotationSelector from './components/UI/RotationSelector';

const App = () => {
  return (
    <div className="App">
      <h1>Volleyball Rotation Tracker</h1>
      <RotationSelector />
      <Court />
    </div>
  );
};

export default App;