import PlayerCircle from '../Players/PlayerCircle';
import './Court.css';

const Court = () => {
  return (
    <div className="court-grid">
      {[...Array(6)].map((_, i) => (
        <PlayerCircle key={i} position={i + 1} />
      ))}
    </div>
  );
};

export default Court;