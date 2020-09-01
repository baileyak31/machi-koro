import React, { useState } from 'react';
import { turnPhases } from './Game';
import {
  establishments,
  establishmentLookupTable,
  industries,
} from '../establishments';
import {
  getPlayerNumberFromIndex,
  splitListIntoSublistsWithMaxLength,
} from '../utils';

const PhaseIndicator = ({
  thisPlayersTurn,
  allPlayerCoins,
  allPlayerEstablishments,
  activePlayer,
  currentTurnPhase,
  endTurn,
  repeatingTurn,
  onAcceptReroll,
  onDeclineReroll,
  onStealeeChosen,
  onEstablishmentsToTradeChosen,
}) => {
  const [playerEstablishmentToTrade, setPlayerEstablishmentToTrade] = useState([
    -1,
    establishments.wheatField,
  ]);
  const [
    opponentEstablishmentToTrade,
    setOpponentEstablishmentToTrade,
  ] = useState([-1, establishments.wheatField]);

  const messages = {};
  messages[turnPhases.rollDice] = 'Roll, ya slowpoke!';
  messages[turnPhases.decideToReroll] =
    "Since you've completed the radio tower, you may re-roll the dice once this turn.";
  messages[turnPhases.earnIncome] = 'Dispersing income...';
  messages[
    turnPhases.choosePlayerToStealCoinsFrom
  ] = `TV Station activated! Choose a poor soul to steal ${establishments.tvStation.revenue} coins from:`;
  messages[turnPhases.chooseEstablishmentToSteal] =
    'Business Center activated! Choose an establishment you own to swap with another player:';
  messages[turnPhases.construction] =
    'Purchase an establishment or landmark (if you want).';

  const mayRerollDice = currentTurnPhase === turnPhases.decideToReroll;
  const shouldDisplaySkipButton =
    currentTurnPhase === turnPhases.construction && thisPlayersTurn;
  const shouldDisplayRolledDoublesMessage =
    currentTurnPhase === turnPhases.construction && repeatingTurn;
  const shouldDisplayPlayersToStealFrom =
    currentTurnPhase === turnPhases.choosePlayerToStealCoinsFrom &&
    thisPlayersTurn;
  const shouldDisplayEstablishmentsToSteal =
    currentTurnPhase === turnPhases.chooseEstablishmentToSteal &&
    thisPlayersTurn;
  const message = messages[currentTurnPhase];
  const establishmentMap = {};

  allPlayerEstablishments.forEach((establishments, playerIndex) => {
    establishmentMap[playerIndex] = {};
    establishments.forEach(
      (establishment) => (establishmentMap[playerIndex][establishment.name] = 0)
    );
    establishments.forEach(
      (establishment) => establishmentMap[playerIndex][establishment.name]++
    );
  });

  const onOpponentEstablishmentToTradeChanged = (event) => {
    const pair = event.target.value.split(':');
    const playerIndex = parseInt(pair[0]);
    const establishmentName = pair[1];
    setOpponentEstablishmentToTrade([
      playerIndex,
      establishmentLookupTable[establishmentName],
    ]);
  };

  const onPlayerEstablishmentToTradeChanged = (event) => {
    const establishmentName = event.target.value.split(':')[1];
    setPlayerEstablishmentToTrade([
      activePlayer,
      establishmentLookupTable[establishmentName],
    ]);
  };

  const getPlayerEstablishmentRendering = (playerIndex) => {
    return splitListIntoSublistsWithMaxLength(
      Object.entries(establishmentMap[playerIndex]),
      4
    ).map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((pair) => {
          const establishmentName = pair[0];
          const count = pair[1];
          const establishment = establishmentLookupTable[establishmentName];
          const checked =
            playerIndex === activePlayer
              ? establishment === playerEstablishmentToTrade[1]
              : playerIndex === opponentEstablishmentToTrade[0] &&
                establishment === opponentEstablishmentToTrade[1];

          if (count > 0 && establishment.industry !== industries.tower) {
            return (
              <div key={establishmentName} className='row'>
                <input
                  id={establishmentName}
                  type='radio'
                  value={playerIndex + ':' + establishmentName}
                  checked={checked}
                  onChange={
                    activePlayer === playerIndex
                      ? onPlayerEstablishmentToTradeChanged
                      : onOpponentEstablishmentToTradeChanged
                  }
                />
                {establishmentName}
                <div className='row'>Count: {count}</div>
              </div>
            );
          }

          return null;
        })}
      </div>
    ));
  };

  return (
    <>
      <h2>Player {getPlayerNumberFromIndex(activePlayer)}'s turn</h2>
      <h3>{message}</h3>
      {shouldDisplayPlayersToStealFrom && (
        <div className='row'>
          {allPlayerCoins.map((playerCoins, playerIndex) => {
            if (playerIndex !== activePlayer) {
              return (
                <div className='column' key={playerIndex}>
                  Player {getPlayerNumberFromIndex(playerIndex)}
                  <button onClick={() => onStealeeChosen(playerIndex)}>
                    Steal
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {shouldDisplayEstablishmentsToSteal && (
        <>
          <h3>Your establishments</h3>
          {getPlayerEstablishmentRendering(activePlayer)}
          {allPlayerCoins.map((coins, playerIndex) => {
            if (playerIndex !== activePlayer) {
              return (
                <div key={playerIndex}>
                  <h3>
                    Player {getPlayerNumberFromIndex(playerIndex)}'s
                    establishments
                  </h3>
                  {getPlayerEstablishmentRendering(playerIndex)}
                </div>
              );
            }
            return null;
          })}
          <button
            onClick={() =>
              onEstablishmentsToTradeChosen(
                playerEstablishmentToTrade[1],
                opponentEstablishmentToTrade[1],
                opponentEstablishmentToTrade[0]
              )
            }
            disabled={opponentEstablishmentToTrade[0] < 0}
          >
            Trade
          </button>
        </>
      )}
      {mayRerollDice && (
        <>
          <h3>Would you like to re-roll the dice?</h3>
          <button onClick={onAcceptReroll}>Yes</button>
          <button onClick={onDeclineReroll}>No</button>
        </>
      )}
      {shouldDisplayRolledDoublesMessage && (
        <h3>
          Well done! You rolled doubles, so you get to take another turn after
          this one!
        </h3>
      )}
      {shouldDisplaySkipButton && (
        <button onClick={() => endTurn()}>Skip</button>
      )}
    </>
  );
};

export default PhaseIndicator;
