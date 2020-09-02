import React, { useEffect, useState } from 'react';
import { Game } from './Game';
import {
  emitJoinGameRoom,
  emitLeaveGameRoom,
  emitStartGame,
  subscribeToGameRoomJoinSuccess,
  subscribeToGameRoomJoinFailed,
  subscribeToChangeInGameRoomPlayers,
  subscribeToGameStarted,
  unsubscribeFromGameRoomJoinSuccess,
  unsubscribeFromGameRoomJoinFailed,
  unsubscribeFromChangeInGameRoomPlayers,
  unsubscribeFromGameStarted,
} from '../api';
import { Redirect, useParams, Link } from 'react-router-dom';
import { getPlayerNumberFromIndex } from '../utils';

export const GameRoom = ({ routePrefix }) => {
  const { roomId } = useParams();
  const [winner, setWinner] = useState(-1);
  const [thisPlayerIndex, setThisPlayerIndex] = useState(0);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameRoomJoined, setGameRoomJoined] = useState(false);
  const [currentPlayerCount, setCurrentPlayerCount] = useState(0);

  useEffect(() => {
    subscribeToGameRoomJoinSuccess((playerCount, gameInProgress) => {
      setGameRoomJoined(true);
      setCurrentPlayerCount(playerCount);
      setGameInProgress(gameInProgress);
      console.log('game room join success: playerCount === ', playerCount);
    });

    subscribeToGameRoomJoinFailed(() => {
      setGameNotFound(true);
      console.log('game room join failed');
    });

    subscribeToChangeInGameRoomPlayers((playerCount) => {
      setCurrentPlayerCount(playerCount);
      console.log(
        'change in game room player count: playerCount === ',
        playerCount
      );
    });

    subscribeToGameStarted((playerIndex) => {
      setGameInProgress(true);
      setThisPlayerIndex(playerIndex);
    });

    if (!gameRoomJoined) {
      console.log('joining game room');
      emitJoinGameRoom(roomId);
    }
    return () => {
      unsubscribeFromGameRoomJoinSuccess();
      unsubscribeFromGameRoomJoinFailed();
      unsubscribeFromChangeInGameRoomPlayers();
      unsubscribeFromGameStarted();
    };
  });

  const onStartGameClick = () => {
    console.log('currentPlayerCount: ', currentPlayerCount);
    emitStartGame(roomId);
  };

  const onGoHomeClick = () => {
    emitLeaveGameRoom();
  };

  const endGame = (activePlayer) => {
    setGameInProgress(false);
    setWinner(activePlayer);
  };

  const winnerDeclared = winner >= 0;

  return gameNotFound ? (
    <Redirect to={`${routePrefix}/not-found`} />
  ) : gameInProgress ? (
    <Game
      thisPlayerIndex={thisPlayerIndex}
      playerCount={currentPlayerCount}
      endGame={endGame}
    />
  ) : (
    <>
      <h1>
        {winnerDeclared
          ? `Player ${getPlayerNumberFromIndex(winner)} wins`
          : 'Welcome to your game room!'}
      </h1>
      <h2>Share your game room ID with your friends: {roomId}</h2>
      <div>Player count: {currentPlayerCount}</div>
      {currentPlayerCount < 2 ? (
        <h3>Waiting for more players...</h3>
      ) : (
        <div>
          <h3>
            Ready to start!
            {currentPlayerCount < 4
              ? ' Or you can keep waiting for more players (max 4)'
              : ''}
          </h3>
          <button onClick={onStartGameClick}>Start Game</button>
        </div>
      )}
      <Link to={`${routePrefix}/home`}>
        <button className='homeButton' onClick={onGoHomeClick}>
          Go to Home
        </button>
      </Link>
    </>
  );
};

export default GameRoom;
