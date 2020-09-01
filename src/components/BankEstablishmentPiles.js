import React from 'react';
import { turnPhases } from './Game';
import { establishmentList, establishmentTotals } from '../establishments';
import { splitListIntoSublistsWithMaxLength } from '../utils';

const BankEstablishmentPiles = ({
  thisPlayersTurn,
  activePlayerCoinCount,
  playerEstablishments,
  turnPhase,
  onBuyButtonClick,
}) => {
  const establishmentCounts = {};
  Object.keys(establishmentTotals).forEach(
    (key) => (establishmentCounts[key] = establishmentTotals[key])
  );
  playerEstablishments.forEach((establishments) => {
    establishments.forEach((establishment) => {
      establishmentCounts[establishment.name]--;
    });
  });

  return (
    <>
      {splitListIntoSublistsWithMaxLength(establishmentList, 5).map(
        (row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((establishment, colIndex) => (
              <div key={colIndex} className='column'>
                {establishment.render}
                <div>Count: {establishmentCounts[establishment.name]}</div>
                <button
                  disabled={
                    turnPhase !== turnPhases.construction ||
                    activePlayerCoinCount < establishment.cost ||
                    establishmentCounts[establishment.name] <= 0 ||
                    !thisPlayersTurn
                  }
                  onClick={() => onBuyButtonClick(establishment)}
                >
                  Buy {establishment.name}
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default BankEstablishmentPiles;
