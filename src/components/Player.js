import React from 'react';
import PlayerLandmarkRow from './PlayerLandmarkRow';
import {
  getPlayerNumberFromIndex,
  splitListIntoSublistsWithMaxLength,
} from '../utils';
import { establishmentLookupTable } from '../establishments';

const Player = ({
  thisPlayersTurn,
  playerIndex,
  establishments,
  allPlayerCoins,
  activePlayer,
  landmarksCompleted,
  currentPhase,
  coins,
  onBuyButtonClick,
}) => {
  establishments.sort((a, b) => a.sortOrder - b.sortOrder);

  const establishmentMap = {};
  establishments.forEach(
    (establishment) => (establishmentMap[establishment.name] = 0)
  );
  establishments.forEach(
    (establishment) => establishmentMap[establishment.name]++
  );

  return (
    <>
      <h2>Player {getPlayerNumberFromIndex(playerIndex)}</h2>
      <div>Coins: {allPlayerCoins[playerIndex]}</div>
      <PlayerLandmarkRow
        playerIndex={playerIndex}
        activePlayer={activePlayer}
        landmarksCompleted={landmarksCompleted}
        currentPhase={currentPhase}
        coins={coins}
        onBuyButtonClick={onBuyButtonClick}
        thisPlayersTurn={thisPlayersTurn}
      />
      <h3>Your Establishments</h3>
      {splitListIntoSublistsWithMaxLength(
        Object.entries(establishmentMap),
        3
      ).map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((pair) => {
            const establishmentName = pair[0];
            const count = pair[1];
            console.log(
              `establishment name = ${establishmentName}, count = ${count}`
            );
            if (establishmentLookupTable[establishmentName] === undefined) {
              console.log(
                `${establishmentName} lookup is undefined! Crash incoming, hit the deck!`
              );
            }
            if (count > 0) {
              return (
                <div key={establishmentName} className='column'>
                  {establishmentLookupTable[establishmentName].render}
                  <div>Count: {count}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </>
  );
};

export default Player;
