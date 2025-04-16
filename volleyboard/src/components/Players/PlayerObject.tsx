type Props = {
    position: number;
  };
  
  const PlayerObject = ({ position }: Props) => {
    return (
      <div className="player-object">
        {`P${position}`}
      </div>
    );
  };
  
  export default PlayerObject;