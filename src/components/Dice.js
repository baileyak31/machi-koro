import React from 'react';
import { turnPhases } from './Game';

const Dice = ({
  thisPlayersTurn,
  diceCount,
  setDiceCount,
  onDiceRoll,
  trainStationActivated,
  firstDieValue,
  secondDieValue,
  currentPhase,
}) => {
  const rollDie = () => 1 + Math.floor(Math.random() * 6);

  const makeRoll = (rollTwoDice) => {
    const firstDieResult = rollDie();
    if (!rollTwoDice) {
      return [firstDieResult, 0];
    }
    const secondDieResult = rollDie();
    return [firstDieResult, secondDieResult];
  };

  const onRollButtonClicked = () => {
    const [firstDieResult, secondDieResult] = makeRoll(diceCount === 2);
    onDiceRoll(firstDieResult, secondDieResult);
  };

  return (
    <>
      <h3>Dice</h3>
      <input
        id='dice1'
        type='radio'
        value={1}
        checked={diceCount === 1}
        disabled={currentPhase !== turnPhases.rollDice || !thisPlayersTurn}
        onChange={() => setDiceCount(1)}
      />
      1
      <input
        id='dice2'
        type='radio'
        value={2}
        checked={diceCount !== 1}
        disabled={
          currentPhase !== turnPhases.rollDice ||
          !trainStationActivated ||
          !thisPlayersTurn
        }
        onChange={() => setDiceCount(2)}
      />
      2
      <div>
        You rolled:{' '}
        {secondDieValue === 0
          ? firstDieValue
          : `${firstDieValue} + ${secondDieValue} = ${
              firstDieValue + secondDieValue
            }`}
      </div>
      <button
        disabled={currentPhase !== turnPhases.rollDice || !thisPlayersTurn}
        onClick={onRollButtonClicked}
      >
        Roll
      </button>
    </>
  );
};

export default Dice;
