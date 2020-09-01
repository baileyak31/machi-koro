import React from 'react';
import Establishment from './components/Establishment';
import { turnPhases } from './components/Game';

const industries = {
  nil: '!!!NULL!!!',
  wheat: 'Wheat',
  cow: 'Cow',
  bread: 'Bread',
  cup: 'Cup',
  gear: 'Gear',
  tower: 'Tower',
  factory: 'Factory',
  fruit: 'Fruit',
};

const establishmentColors = {
  red: 'Red',
  blue: 'Blue',
  green: 'Green',
  purple: 'Purple',
};

const establishmentNames = {
  wheatField: 'Wheat Field',
  ranch: 'Ranch',
  bakery: 'Bakery',
  cafe: 'Cafe',
  convenienceStore: 'Convenience Store',
  forest: 'Forest',
  stadium: 'Stadium',
  tvStation: 'TV Station',
  businessCenter: 'Business Center',
  cheeseFactory: 'Cheese Factory',
  furnitureFactory: 'Furniture Factory',
  mine: 'Mine',
  familyRestaurant: 'Family Restaurant',
  appleOrchard: 'Apple Orchard',
  farmersMarket: 'Farmers Market',
};

const establishmentCosts = {
  wheatField: 1,
  ranch: 1,
  bakery: 1,
  cafe: 2,
  convenienceStore: 2,
  forest: 3,
  stadium: 6,
  tvStation: 7,
  businessCenter: 8,
  cheeseFactory: 5,
  furnitureFactory: 3,
  mine: 6,
  familyRestaurant: 3,
  appleOrchard: 3,
  farmersMarket: 2,
};

const establishmentActivationNums = {
  wheatField: [1],
  ranch: [2],
  bakery: [2, 3],
  cafe: [3],
  convenienceStore: [4],
  forest: [5],
  stadium: [6],
  tvStation: [6],
  businessCenter: [6],
  cheeseFactory: [7],
  furnitureFactory: [8],
  mine: [9],
  familyRestaurant: [9, 10],
  appleOrchard: [10],
  farmersMarket: [11, 12],
};

const makeEstablishmentTransaction = (gameState, establishment) => {
  switch (establishment.color) {
    case establishmentColors.blue:
      return onBlueEstablishmentActivated(gameState, establishment);
    case establishmentColors.green:
      return onGreenEstablishmentActivated(gameState, establishment);
    case establishmentColors.red:
      return onRedEstablishmentActivated(gameState, establishment);
    case establishmentColors.purple:
      return onPurpleEstablishmentActivated(gameState, establishment);
    default:
      return gameState;
  }
};

const onBlueEstablishmentActivated = (gameState, establishment) => {
  gameState.playerCoins[gameState.owner] += getRevenue(
    establishment,
    gameState.shoppingMallComplete
  );
  return gameState;
};

const onGreenEstablishmentActivated = (gameState, establishment) => {
  if (gameState.activePlayer === gameState.owner) {
    gameState.playerCoins[gameState.owner] += getRevenue(
      establishment,
      gameState.shoppingMallComplete,
      gameState
    );
  }
  return gameState;
};

const onRedEstablishmentActivated = (gameState, establishment) => {
  if (gameState.activePlayer !== gameState.owner) {
    exchangeCoinsBetweenPlayers(
      gameState,
      establishment,
      gameState.activePlayer
    );
  }
  return gameState;
};

const onPurpleEstablishmentActivated = (gameState, establishment) => {
  if (gameState.activePlayer === gameState.owner) {
    switch (establishment) {
      case establishments.stadium:
        return onStadiumActivated(gameState, establishment);
      case establishments.tvStation:
        return onTvStationActivated(gameState);
      case establishments.businessCenter:
        return onBusinessCenterActivated(gameState);
      default:
        return null;
    }
  }
  return gameState;
};

const onStadiumActivated = (gameState, establishment) => {
  Object.entries(gameState.playerCoins).forEach((pair) => {
    const player = pair[0];
    if (player !== gameState.owner) {
      gameState = exchangeCoinsBetweenPlayers(gameState, establishment, player);
    }
  });
  return gameState;
};

const onTvStationActivated = (gameState) => {
  gameState.turnPhase = turnPhases.choosePlayerToStealCoinsFrom;
  return gameState;
};

const onBusinessCenterActivated = (gameState) => {
  gameState.turnPhase = turnPhases.chooseEstablishmentToSteal;
  return gameState;
};

const exchangeCoinsBetweenPlayers = (
  gameState,
  establishment,
  payingPlayer
) => {
  const actualExchangeAmount = Math.min(
    getRevenue(establishment, gameState.shoppingMallComplete),
    gameState.playerCoins[payingPlayer]
  );
  gameState.playerCoins[payingPlayer] -= actualExchangeAmount;
  gameState.playerCoins[gameState.owner] += actualExchangeAmount;
  return gameState;
};

const getRevenue = (establishment, shoppingMallComplete, gameState = {}) => {
  return (
    establishment.revenue * getRevenueMultiplier(establishment, gameState) +
    ((establishment.industry === industries.bread ||
      establishment.industry === industries.cup) &&
    shoppingMallComplete
      ? 1
      : 0)
  );
};

const getRevenueMultiplier = (activatedEstablishment, gameState) => {
  if (
    gameState !== {} &&
    activatedEstablishment.dependingIndustry !== industries.nil
  ) {
    const establishmentIndustryCount = gameState.playerEstablishments[
      gameState.owner
    ].filter(
      (establishment) =>
        establishment.industry === activatedEstablishment.dependingIndustry
    ).length;
    return establishmentIndustryCount;
  }
  return 1;
};

const establishments = {
  wheatField: {
    name: establishmentNames.wheatField,
    activationNum: establishmentActivationNums.wheatField,
    cost: establishmentCosts.wheatField,
    industry: industries.wheat,
    color: establishmentColors.blue,
    revenue: 1,
    dependingIndustry: industries.nil,
    sortOrder: 0,
    render: (
      <Establishment
        title={establishmentNames.wheatField}
        activationNum={establishmentActivationNums.wheatField}
        color={establishmentColors.blue}
        industry={industries.wheat}
        cost={establishmentCosts.wheatField}
        description="Get 1 coin from the bank. (anyone's turn)"
      />
    ),
  },

  ranch: {
    name: establishmentNames.ranch,
    activationNum: establishmentActivationNums.ranch,
    cost: establishmentCosts.ranch,
    industry: industries.cow,
    color: establishmentColors.blue,
    revenue: 1,
    dependingIndustry: industries.nil,
    sortOrder: 1,
    render: (
      <Establishment
        title={establishmentNames.ranch}
        activationNum={establishmentActivationNums.ranch}
        color={establishmentColors.blue}
        industry={industries.cow}
        cost={establishmentCosts.ranch}
        description="Get 1 coin from the bank. (anyone's turn)"
      />
    ),
  },

  bakery: {
    name: establishmentNames.bakery,
    activationNum: establishmentActivationNums.bakery,
    cost: establishmentCosts.bakery,
    industry: industries.bread,
    color: establishmentColors.green,
    revenue: 1,
    dependingIndustry: industries.nil,
    sortOrder: 2,
    render: (
      <Establishment
        title={establishmentNames.bakery}
        activationNum={establishmentActivationNums.bakery}
        color={establishmentColors.green}
        industry={industries.bread}
        cost={establishmentCosts.bakery}
        description='Get 1 coin from the bank. (your turn only)'
      />
    ),
  },

  cafe: {
    name: establishmentNames.cafe,
    activationNum: establishmentActivationNums.cafe,
    cost: establishmentCosts.cafe,
    industry: industries.cup,
    color: establishmentColors.red,
    revenue: 1,
    dependingIndustry: industries.nil,
    sortOrder: 3,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.cafe}
        title={establishmentNames.cafe}
        color={establishmentColors.red}
        industry={industries.cup}
        cost={establishmentCosts.cafe}
        description="Take 1 coin from the active player. (opponent's turn)"
      />
    ),
  },

  convenienceStore: {
    name: establishmentNames.convenienceStore,
    activationNum: establishmentActivationNums.convenienceStore,
    cost: establishmentCosts.convenienceStore,
    industry: industries.bread,
    color: establishmentColors.green,
    revenue: 3,
    dependingIndustry: industries.nil,
    sortOrder: 4,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.convenienceStore}
        title={establishmentNames.convenienceStore}
        color={establishmentColors.green}
        industry={industries.bread}
        cost={establishmentCosts.convenienceStore}
        description='Get 3 coins from the bank. (your turn only)'
      />
    ),
  },

  forest: {
    name: establishmentNames.forest,
    activationNum: establishmentActivationNums.forest,
    cost: establishmentCosts.forest,
    industry: industries.gear,
    color: establishmentColors.blue,
    revenue: 3,
    dependingIndustry: industries.nil,
    sortOrder: 5,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.forest}
        title={establishmentNames.forest}
        color={establishmentColors.blue}
        industry={industries.gear}
        cost={establishmentCosts.forest}
        description="Get 1 coin from the bank. (anyone's turn)"
      />
    ),
  },

  stadium: {
    name: establishmentNames.stadium,
    activationNum: establishmentActivationNums.stadium,
    cost: establishmentCosts.stadium,
    industry: industries.tower,
    color: establishmentColors.purple,
    revenue: 2,
    dependingIndustry: industries.nil,
    sortOrder: 6,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.stadium}
        title={establishmentNames.stadium}
        color={establishmentColors.purple}
        industry={industries.tower}
        cost={establishmentCosts.stadium}
        description='Get 2 coins from all players. (your turn only)'
      />
    ),
  },

  tvStation: {
    name: establishmentNames.tvStation,
    activationNum: establishmentActivationNums.tvStation,
    cost: establishmentCosts.tvStation,
    industry: industries.tower,
    color: establishmentColors.purple,
    revenue: 5,
    dependingIndustry: industries.nil,
    sortOrder: 7,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.tvStation}
        title={establishmentNames.tvStation}
        color={establishmentColors.purple}
        industry={industries.tower}
        cost={establishmentCosts.tvStation}
        description='Take 5 coins from any one player. (your turn only)'
      />
    ),
  },

  businessCenter: {
    name: establishmentNames.businessCenter,
    activationNum: establishmentActivationNums.businessCenter,
    cost: establishmentCosts.businessCenter,
    industry: industries.tower,
    color: establishmentColors.purple,
    revenue: 0,
    dependingIndustry: industries.nil,
    sortOrder: 8,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.businessCenter}
        title={establishmentNames.businessCenter}
        color={establishmentColors.purple}
        industry={industries.tower}
        cost={establishmentCosts.businessCenter}
        description={`Trade one non-${industries.tower} establishment with another player. (your turn only)`}
      />
    ),
  },

  cheeseFactory: {
    name: establishmentNames.cheeseFactory,
    activationNum: establishmentActivationNums.cheeseFactory,
    cost: establishmentCosts.cheeseFactory,
    industry: industries.factory,
    color: establishmentColors.green,
    revenue: 3,
    dependingIndustry: industries.cow,
    sortOrder: 9,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.cheeseFactory}
        title={establishmentNames.cheeseFactory}
        color={establishmentColors.green}
        industry={industries.factory}
        cost={establishmentCosts.cheeseFactory}
        description={`Get 3 coins from the bank for each ${industries.cow} establishment that you own. (your turn only)`}
      />
    ),
  },

  furnitureFactory: {
    name: establishmentNames.furnitureFactory,
    activationNum: establishmentActivationNums.furnitureFactory,
    cost: establishmentCosts.furnitureFactory,
    industry: industries.factory,
    color: establishmentColors.green,
    revenue: 3,
    dependingIndustry: industries.gear,
    sortOrder: 10,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.furnitureFactory}
        title={establishmentNames.furnitureFactory}
        color={establishmentColors.green}
        industry={industries.factory}
        cost={establishmentCosts.furnitureFactory}
        description={`Get 3 coins from the bank for each ${industries.gear} establishment that you own. (your turn only)`}
      />
    ),
  },

  mine: {
    name: establishmentNames.mine,
    activationNum: establishmentActivationNums.mine,
    cost: establishmentCosts.mine,
    industry: industries.gear,
    color: establishmentColors.blue,
    revenue: 5,
    dependingIndustry: industries.nil,
    sortOrder: 11,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.mine}
        title={establishmentNames.mine}
        color={establishmentColors.blue}
        industry={industries.gear}
        cost={establishmentCosts.mine}
        description="Get 5 coins from the bank. (anyone's turn)"
      />
    ),
  },

  familyRestaurant: {
    name: establishmentNames.familyRestaurant,
    activationNum: establishmentActivationNums.familyRestaurant,
    cost: establishmentCosts.familyRestaurant,
    industry: industries.cup,
    color: establishmentColors.red,
    revenue: 2,
    dependingIndustry: industries.nil,
    sortOrder: 12,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.familyRestaurant}
        title={establishmentNames.familyRestaurant}
        color={establishmentColors.red}
        industry={industries.cup}
        cost={establishmentCosts.familyRestaurant}
        description="Take 2 coins from the active player. (opponent's turn)"
      />
    ),
  },

  appleOrchard: {
    name: establishmentNames.appleOrchard,
    activationNum: establishmentActivationNums.appleOrchard,
    cost: establishmentCosts.appleOrchard,
    industry: industries.wheat,
    color: establishmentColors.blue,
    revenue: 3,
    dependingIndustry: industries.nil,
    sortOrder: 13,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.appleOrchard}
        title={establishmentNames.appleOrchard}
        color={establishmentColors.blue}
        industry={industries.wheat}
        cost={establishmentCosts.appleOrchard}
        description="Get 3 coins from the bank. (anyone's turn)"
      />
    ),
  },

  farmersMarket: {
    name: establishmentNames.farmersMarket,
    activationNum: establishmentActivationNums.farmersMarket,
    cost: establishmentCosts.farmersMarket,
    industry: industries.fruit,
    color: establishmentColors.green,
    revenue: 2,
    dependingIndustry: industries.wheat,
    sortOrder: 14,
    render: (
      <Establishment
        activationNum={establishmentActivationNums.farmersMarket}
        title={establishmentNames.farmersMarket}
        color={establishmentColors.green}
        industry={industries.fruit}
        cost={establishmentCosts.farmersMarket}
        description={`Get 2 coins from the bank for each ${industries.wheat} establishment that you own. (your turn only)`}
      />
    ),
  },
};

const establishmentLookupTable = {
  [establishments.wheatField.name]: establishments.wheatField,
  [establishments.ranch.name]: establishments.ranch,
  [establishments.bakery.name]: establishments.bakery,
  [establishments.cafe.name]: establishments.cafe,
  [establishments.convenienceStore.name]: establishments.convenienceStore,
  [establishments.forest.name]: establishments.forest,
  [establishments.stadium.name]: establishments.stadium,
  [establishments.tvStation.name]: establishments.tvStation,
  [establishments.businessCenter.name]: establishments.businessCenter,
  [establishments.cheeseFactory.name]: establishments.cheeseFactory,
  [establishments.furnitureFactory.name]: establishments.furnitureFactory,
  [establishments.mine.name]: establishments.mine,
  [establishments.familyRestaurant.name]: establishments.familyRestaurant,
  [establishments.appleOrchard.name]: establishments.appleOrchard,
  [establishments.farmersMarket.name]: establishments.farmersMarket,
};

const establishmentList = [
  establishments.wheatField,
  establishments.ranch,
  establishments.bakery,
  establishments.cafe,
  establishments.convenienceStore,
  establishments.forest,
  establishments.stadium,
  establishments.tvStation,
  establishments.businessCenter,
  establishments.cheeseFactory,
  establishments.furnitureFactory,
  establishments.mine,
  establishments.familyRestaurant,
  establishments.appleOrchard,
  establishments.farmersMarket,
];

const establishmentTotals = {
  [establishments.wheatField.name]: 10,
  [establishments.ranch.name]: 6,
  [establishments.bakery.name]: 9,
  [establishments.cafe.name]: 5,
  [establishments.convenienceStore.name]: 6,
  [establishments.forest.name]: 6,
  [establishments.stadium.name]: 4,
  [establishments.tvStation.name]: 4,
  [establishments.businessCenter.name]: 4,
  [establishments.cheeseFactory.name]: 6,
  [establishments.furnitureFactory.name]: 6,
  [establishments.mine.name]: 6,
  [establishments.familyRestaurant.name]: 6,
  [establishments.appleOrchard.name]: 6,
  [establishments.farmersMarket.name]: 6,
};

export {
  establishments,
  establishmentList,
  establishmentLookupTable,
  establishmentColors,
  establishmentTotals,
  industries,
  exchangeCoinsBetweenPlayers,
  makeEstablishmentTransaction,
};
