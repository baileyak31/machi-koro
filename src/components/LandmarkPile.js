import React from 'react';
import { turnPhases } from './Game';

const LandmarkPile = ({
  thisPlayersTurn,
  landmarksCompleted,
  playerIndex,
  landmark,
  onBuyButtonClick,
  activePlayer,
  currentPhase,
  coins,
}) => {
  const landmarkIsComplete = landmarksCompleted[playerIndex].includes(landmark);

  return (
    <>
      {landmark.render}
      <div>Completed: {landmarkIsComplete ? 'yes' : 'no'}</div>
      <button
        onClick={() => onBuyButtonClick(landmark)}
        disabled={
          playerIndex !== activePlayer ||
          landmarkIsComplete ||
          currentPhase !== turnPhases.construction ||
          coins < landmark.cost ||
          !thisPlayersTurn
        }
      >
        Buy {landmark.name}
      </button>
    </>
  );
};

export default LandmarkPile;
