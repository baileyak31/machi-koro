import React, { useState, useEffect } from 'react';
import BankEstablishmentPiles from './BankEstablishmentPiles';
import Dice from './Dice';
import PhaseIndicator from './PhaseIndicator';
import Player from './Player';
import {
  establishments,
  establishmentColors,
  exchangeCoinsBetweenPlayers,
  makeEstablishmentTransaction,
} from '../establishments';
import { landmarks } from '../landmarks';
import {
  emitGameStateChanged,
  subscribeToGameStateChanged,
  unsubscribeFromGameStateChanged,
} from '../api';
import { getPlayerNumberFromIndex } from '../utils';

const turnPhases = {
  rollDice: 0,
  decideToReroll: 1,
  earnIncome: 2,
  construction: 3,
  choosePlayerToStealCoinsFrom: 4,
  chooseEstablishmentToSteal: 5,
};

// Leaving this outside of the Game component in case it needs to be exported
// to another component
const changeGameState = (changedItems, setterMap, emitChangeInState = true) => {
  Object.entries(changedItems).forEach((pair) => {
    const itemName = pair[0];
    const newValue = pair[1];
    console.log(`changing ${itemName} to ${newValue}`);
    const setter = setterMap[itemName];
    if (setter !== undefined) {
      setter(newValue);
      console.log(`${itemName} changed`);
    }
  });
  if (emitChangeInState) emitGameStateChanged(changedItems);
};

const Game = ({ thisPlayerIndex, playerCount, endGame }) => {
  const [activePlayer, setActivePlayer] = useState(0);
  const [firstDieValue, setFirstDieValue] = useState(1);
  const [secondDieValue, setSecondDieValue] = useState(0);
  const [turnPhase, setTurnPhase] = useState(turnPhases.rollDice);
  const [playerCoins, setPlayerCoins] = useState(Array(playerCount).fill(3));
  const [diceCount, setDiceCount] = useState(1);
  const [repeatingTurn, setRepeatingTurn] = useState(false);
  const [
    activePlayerHasNotRerolledThisTurn,
    setActivePlayerHasNotRerolledThisTurn,
  ] = useState(true);
  const [playerEstablishments, setPlayerEstablishments] = useState(
    Array(playerCount).fill([establishments.wheatField, establishments.bakery])
  );
  const [landmarksCompleted, setLandmarksCompleted] = useState(
    Array(playerCount).fill([])
  );
  const [activatedEstablishments, setActivatedEstablishments] = useState([]);

  useEffect(() => {
    subscribeToGameStateChanged((changedItems) => {
      changeGameState(changedItems, setterMap, false);
    });
    return unsubscribeFromGameStateChanged;
  });

  const setterMap = {};
  setterMap['activePlayer'] = setActivePlayer;
  setterMap['firstDieValue'] = setFirstDieValue;
  setterMap['secondDieValue'] = setSecondDieValue;
  setterMap['turnPhase'] = setTurnPhase;
  setterMap['playerCoins'] = setPlayerCoins;
  setterMap['diceCount'] = setDiceCount;
  setterMap['repeatingTurn'] = setRepeatingTurn;
  setterMap[
    'activePlayerHasNotRerolledThisTurn'
  ] = setActivePlayerHasNotRerolledThisTurn;
  setterMap['playerEstablishments'] = setPlayerEstablishments;
  setterMap['landmarksCompleted'] = setLandmarksCompleted;
  setterMap['activatedEstablishments'] = setActivatedEstablishments;

  const totalCoins = 282;
  const bankCoins = totalCoins - playerCoins.reduce((a, b) => a + b);
  const activePlayerCompletedRadioTower = landmarksCompleted[
    activePlayer
  ].includes(landmarks.radioTower);
  const shoppingMallComplete = landmarksCompleted[activePlayer].includes(
    landmarks.shoppingMall
  );
  const thisPlayersTurn = thisPlayerIndex === activePlayer;

  const onDiceRoll = (firstDieValue, secondDieValue) => {
    const amusementParkActivated = landmarksCompleted[activePlayer].includes(
      landmarks.amusementPark
    );
    let newRepeatingTurn = false;

    if (amusementParkActivated && firstDieValue === secondDieValue) {
      /*setRepeatingTurn(true);*/
      newRepeatingTurn = true;
    }
    if (activePlayerCompletedRadioTower && activePlayerHasNotRerolledThisTurn) {
      /*setTurnPhase(turnPhases.decideToReroll);*/
      changeGameState(
        {
          turnPhase: turnPhases.decideToReroll,
          repeatingTurn: newRepeatingTurn,
          firstDieValue: firstDieValue,
          secondDieValue: secondDieValue,
        },
        setterMap
      );
      return;
    }

    /*setFirstDieValue(firstDieValue);
    setSecondDieValue(secondDieValue);*/
    const newState = beginEarnIncomePhase(firstDieValue + secondDieValue);
    changeGameState(
      {
        turnPhase: newState.turnPhase,
        repeatingTurn: newRepeatingTurn,
        firstDieValue: firstDieValue,
        secondDieValue: secondDieValue,
        playerEstablishments: newState.playerEstablishments,
        activatedEstablishments: newState.activatedEstablishments,
        playerCoins: newState.playerCoins,
      },
      setterMap
    );
  };

  const onAcceptReroll = () => {
    /*setTurnPhase(turnPhases.rollDice);
    setRepeatingTurn(false);
    setActivePlayerHasNotRerolledThisTurn(false);*/
    changeGameState(
      {
        turnPhase: turnPhases.rollDice,
        repeatingTurn: false,
        activePlayerHasNotRerolledThisTurn: false,
      },
      setterMap
    );
  };

  const onDeclineReroll = () => {
    beginEarnIncomePhase(firstDieValue + secondDieValue);
  };

  const beginEarnIncomePhase = (newRoll) => {
    const newActivatedEstablishments = gatherActivatedEstablishments(newRoll);

    return performTransactionsOnActivatedEstablishments(
      {
        playerCoins,
        playerEstablishments,
        turnPhase: turnPhases.construction,
      },
      newActivatedEstablishments
    );
  };

  const gatherActivatedEstablishments = (newRoll) => {
    // 1. Create collections for each establishment type
    let newActivatedEstablishments = [];
    const activatedEstablishmentsByColor = {};
    activatedEstablishmentsByColor[establishmentColors.red] = [];
    activatedEstablishmentsByColor[establishmentColors.blue] = [];
    activatedEstablishmentsByColor[establishmentColors.green] = [];
    activatedEstablishmentsByColor[establishmentColors.purple] = [];

    playerEstablishments.forEach((ownedEstablishments, owner) =>
      ownedEstablishments
        .filter((establishment) =>
          establishment.activationNum.includes(newRoll)
        )
        .forEach((establishment) => {
          activatedEstablishmentsByColor[establishment.color].push({
            establishment,
            owner,
          });
        })
    );

    // 2. Put all activated establishments into one collection in order
    newActivatedEstablishments = newActivatedEstablishments.concat(
      activatedEstablishmentsByColor[establishmentColors.purple]
    );
    newActivatedEstablishments = newActivatedEstablishments.concat(
      activatedEstablishmentsByColor[establishmentColors.green]
    );
    newActivatedEstablishments = newActivatedEstablishments.concat(
      activatedEstablishmentsByColor[establishmentColors.blue]
    );
    newActivatedEstablishments = newActivatedEstablishments.concat(
      activatedEstablishmentsByColor[establishmentColors.red]
    );

    return newActivatedEstablishments;
  };

  const performTransactionsOnActivatedEstablishments = (
    newState,
    newActivatedEstablishments
  ) => {
    while (
      newActivatedEstablishments.length > 0 &&
      newState.turnPhase === turnPhases.construction
    ) {
      const card = newActivatedEstablishments.pop();
      newState = makeEstablishmentTransaction(
        {
          activePlayer,
          owner: card.owner,
          playerEstablishments: newState.playerEstablishments,
          playerCoins: newState.playerCoins,
          shoppingMallComplete,
          turnPhase: turnPhases.construction,
          activatedEstablishments: newActivatedEstablishments,
        },
        card.establishment
      );
    }

    /*setPlayerEstablishments(newState.playerEstablishments);
    setActivatedEstablishments(newState.activatedEstablishments);
    setPlayerCoins(newState.playerCoins);
    setTurnPhase(newState.turnPhase);*/
    return newState;
  };

  const endTurn = () => {
    let newActivePlayer =
      activePlayer + 1 === playerCoins.length ? 0 : activePlayer + 1;
    if (repeatingTurn) {
      newActivePlayer = activePlayer;
    }
    changeGameState(
      {
        diceCount: 1,
        activePlayer: newActivePlayer,
        repeatingTurn: false,
        activePlayerHasNotRerolledThisTurn: true,
        turnPhase: turnPhases.rollDice,
      },
      setterMap
    );
  };

  const buyEstablishment = (establishment) => {
    playerEstablishments[activePlayer] = [
      ...playerEstablishments[activePlayer],
      establishment,
    ];
    playerCoins[activePlayer] -= establishment.cost;
    /*setPlayerEstablishments(playerEstablishments);
    setPlayerCoins(playerCoins);*/
    changeGameState(
      {
        playerEstablishments: playerEstablishments,
        playerCoins: playerCoins,
      },
      setterMap
    );
  };

  const buyLandmark = (landmark) => {
    landmarksCompleted[activePlayer] = [
      ...landmarksCompleted[activePlayer],
      landmark,
    ];
    if (landmarksCompleted[activePlayer].length >= 4) {
      endGame(activePlayer);
      return;
    }
    playerCoins[activePlayer] -= landmark.cost;
    /*setLandmarksCompleted(landmarksCompleted);
    setPlayerCoins(playerCoins);*/
    changeGameState(
      {
        landmarksCompleted: landmarksCompleted,
        playerCoins: playerCoins,
      },
      setterMap
    );
  };

  const onStealeeChosen = (stealeeIndex) => {
    const newGameState = exchangeCoinsBetweenPlayers(
      {
        shoppingMallComplete,
        playerEstablishments,
        playerCoins,
        owner: activePlayer,
        turnPhase: turnPhases.construction,
      },
      establishments.tvStation,
      stealeeIndex
    );
    performTransactionsOnActivatedEstablishments(
      newGameState,
      activatedEstablishments
    );
  };

  const tradeEstablishments = (
    activePlayerEstablishment,
    opponentEstablishment,
    opponentIndex
  ) => {
    const newGameState = {
      shoppingMallComplete,
      playerCoins,
      owner: activePlayer,
      turnPhase: turnPhases.construction,
    };

    newGameState.playerEstablishments = replacePlayerEstablishment(
      playerEstablishments,
      activePlayerEstablishment,
      opponentEstablishment,
      activePlayer
    );
    newGameState.playerEstablishments = replacePlayerEstablishment(
      newGameState.playerEstablishments,
      opponentEstablishment,
      activePlayerEstablishment,
      opponentIndex
    );

    performTransactionsOnActivatedEstablishments(
      newGameState,
      activatedEstablishments
    );
  };

  const replacePlayerEstablishment = (
    newPlayerEstablishments,
    establishmentOwned,
    establishmentReceiving,
    playerIndex
  ) => {
    newPlayerEstablishments[playerIndex].push(establishmentReceiving);

    const establishmentOwnedIndex = newPlayerEstablishments[
      playerIndex
    ].findIndex(
      (establishment) => establishment.name === establishmentOwned.name
    );

    newPlayerEstablishments[playerIndex].splice(establishmentOwnedIndex, 1);

    return newPlayerEstablishments;
  };

  return (
    <div>
      <h1>You are player {getPlayerNumberFromIndex(thisPlayerIndex)}</h1>
      <h2>Bank</h2>
      <div>Coins: {bankCoins}</div>
      <BankEstablishmentPiles
        thisPlayersTurn={thisPlayersTurn}
        activePlayerCoinCount={playerCoins[activePlayer]}
        playerEstablishments={playerEstablishments}
        turnPhase={turnPhase}
        onBuyButtonClick={(establishment) => {
          buyEstablishment(establishment);
          endTurn();
        }}
      />
      <PhaseIndicator
        thisPlayersTurn={thisPlayersTurn}
        allPlayerCoins={playerCoins}
        allPlayerEstablishments={playerEstablishments}
        activePlayer={activePlayer}
        currentTurnPhase={turnPhase}
        endTurn={endTurn}
        repeatingTurn={repeatingTurn}
        onAcceptReroll={onAcceptReroll}
        onDeclineReroll={onDeclineReroll}
        onStealeeChosen={onStealeeChosen}
        onEstablishmentsToTradeChosen={tradeEstablishments}
      />
      <Dice
        thisPlayersTurn={thisPlayersTurn}
        diceCount={diceCount}
        setDiceCount={setDiceCount}
        firstDieValue={firstDieValue}
        secondDieValue={secondDieValue}
        onDiceRoll={onDiceRoll}
        trainStationActivated={landmarksCompleted[activePlayer].includes(
          landmarks.trainStation
        )}
        currentPhase={turnPhase}
      />
      <div className='row'>
        {playerCoins.map((coins, index) => (
          <div key={index} className='playerColumn'>
            <Player
              thisPlayersTurn={thisPlayersTurn}
              playerIndex={index}
              activePlayer={activePlayer}
              coins={coins}
              allPlayerCoins={playerCoins}
              establishments={playerEstablishments[index]}
              landmarksCompleted={landmarksCompleted}
              currentPhase={turnPhase}
              onBuyButtonClick={(landmark) => {
                buyLandmark(landmark);
                endTurn();
              }}
              activePlayerHasNotRerolledThisTurn={
                activePlayerHasNotRerolledThisTurn
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Game, turnPhases, changeGameState };
