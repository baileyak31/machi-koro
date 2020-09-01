import React from 'react';
import Landmark from './components/Landmark';

// Landmark Names
const trainStationName = 'Train Station';
const shoppingMallName = 'Shopping Mall';
const amusementParkName = 'Amusement Park';
const radioTowerName = 'Radio Tower';

// Landmark Costs
const trainStationCost = 4;
const shoppingMallCost = 10;
const amusementParkCost = 16;
const radioTowerCost = 22;

const landmarks = {
  trainStation: {
    name: trainStationName,
    cost: trainStationCost,
    render: (
      <Landmark
        title={trainStationName}
        cost={trainStationCost}
        description="You may roll 1 or 2 dice."
      />
    ),
  },

  shoppingMall: {
    name: shoppingMallName,
    cost: shoppingMallCost,
    render: (
      <Landmark
        title={shoppingMallName}
        cost={shoppingMallCost}
        description="Each of your bread and cup establishments earn +1 coin."
      />
    ),
  },

  amusementPark: {
    name: amusementParkName,
    cost: amusementParkCost,
    render: (
      <Landmark
        title={amusementParkName}
        cost={amusementParkCost}
        description="If you roll doubles, take another turn after this one."
      />
    ),
  },

  radioTower: {
    name: radioTowerName,
    cost: radioTowerCost,
    render: (
      <Landmark
        title={radioTowerName}
        cost={radioTowerCost}
        description="Once every turn, you can choose to re-roll your dice."
      />
    ),
  },
};

export { landmarks };
