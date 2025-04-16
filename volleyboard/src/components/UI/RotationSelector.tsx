import { useRotationStore } from '../../state/rotationStore';

const RotationSelector = () => {
  const { rotation, setRotation } = useRotationStore();

  return (
    <select value={rotation} onChange={(e) => setRotation(Number(e.target.value))}>
      {[1, 2, 3, 4, 5, 6].map((rot) => (
        <option key={rot} value={rot}>{`Rotation ${rot}`}</option>
      ))}
    </select>
  );
};

export default RotationSelector;