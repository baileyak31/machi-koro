import React from 'react';
import LandmarkPile from './LandmarkPile';
import { landmarks } from '../landmarks';

const PlayerLandmarkRow = ({
  thisPlayersTurn,
  playerIndex,
  activePlayer,
  landmarksCompleted,
  currentPhase,
  coins,
  onBuyButtonClick,
}) => {
  return (
    <>
      <h3>Your Landmarks</h3>
      <div className='row'>
        <div className='column'>
          <LandmarkPile
            playerIndex={playerIndex}
            activePlayer={activePlayer}
            landmark={landmarks.trainStation}
            landmarksCompleted={landmarksCompleted}
            currentPhase={currentPhase}
            coins={coins}
            onBuyButtonClick={onBuyButtonClick}
            thisPlayersTurn={thisPlayersTurn}
          />
        </div>
        <div className='column'>
          <LandmarkPile
            playerIndex={playerIndex}
            activePlayer={activePlayer}
            landmark={landmarks.shoppingMall}
            landmarksCompleted={landmarksCompleted}
            currentPhase={currentPhase}
            coins={coins}
            onBuyButtonClick={onBuyButtonClick}
            thisPlayersTurn={thisPlayersTurn}
          />
        </div>
        <div className='column'>
          <LandmarkPile
            playerIndex={playerIndex}
            activePlayer={activePlayer}
            landmark={landmarks.amusementPark}
            landmarksCompleted={landmarksCompleted}
            currentPhase={currentPhase}
            coins={coins}
            onBuyButtonClick={onBuyButtonClick}
            thisPlayersTurn={thisPlayersTurn}
          />
        </div>
        <div className='column'>
          <LandmarkPile
            playerIndex={playerIndex}
            activePlayer={activePlayer}
            landmark={landmarks.radioTower}
            landmarksCompleted={landmarksCompleted}
            currentPhase={currentPhase}
            coins={coins}
            onBuyButtonClick={onBuyButtonClick}
            thisPlayersTurn={thisPlayersTurn}
          />
        </div>
      </div>
    </>
  );
};

export default PlayerLandmarkRow;
