//import openSocket from 'socket.io-client';
import io from 'socket.io-client';

//const port = 2000;
// Change this to http://localhost:${port} for testing
//const socket = openSocket('https://machi-koro-server.herokuapp.com');
const socket = io();

const emitStartGame = (roomId) => {
  socket.emit('start game', roomId);
};

const emitLaunchGameRoom = () => {
  socket.emit('launch game room');
};

const emitJoinGameRoom = (roomId) => {
  socket.emit('join game room', roomId);
};

const emitLeaveGameRoom = () => {
  socket.emit('leave game room');
};

const emitGameStateChanged = (gameState) => {
  socket.emit('game state changed', gameState);
};

const subscribeToLaunchGameRoom = (callback) => {
  socket.on('game room launched', (roomId) => callback(roomId));
};

const subscribeToChangeInGameRoomPlayers = (callback) => {
  socket.on('change in game room players', (playerCount) =>
    callback(playerCount)
  );
};

const subscribeToGameStarted = (callback) => {
  socket.on('game started', (playersInRoom) => {
    const playerIndex = playersInRoom.findIndex(
      (socketId) => socketId === socket.id
    );
    callback(playerIndex);
  });
};

const subscribeToGameRoomJoinSuccess = (callback) => {
  socket.on('game room join success', (playerCount, gameInProgress) =>
    callback(playerCount, gameInProgress)
  );
};

const subscribeToGameRoomJoinFailed = (callback) => {
  socket.on('game room join failed', callback);
};

const subscribeToGameStateChanged = (callback) => {
  socket.on('game state changed', (newGameState) => callback(newGameState));
};

const unsubscribeFromLaunchGameRoom = () => {
  socket.off('game room launched');
};

const unsubscribeFromGameRoomJoinSuccess = () => {
  socket.off('game room join success');
};

const unsubscribeFromGameRoomJoinFailed = () => {
  socket.off('game room join failed');
};

const unsubscribeFromChangeInGameRoomPlayers = () => {
  socket.off('change in game room players');
};

const unsubscribeFromGameStarted = () => {
  socket.off('game started');
};

const unsubscribeFromGameStateChanged = () => {
  socket.off('game state changed');
};

export {
  emitStartGame,
  emitLaunchGameRoom,
  emitJoinGameRoom,
  emitLeaveGameRoom,
  emitGameStateChanged,
  subscribeToGameStarted,
  subscribeToLaunchGameRoom,
  subscribeToChangeInGameRoomPlayers,
  subscribeToGameRoomJoinSuccess,
  subscribeToGameRoomJoinFailed,
  subscribeToGameStateChanged,
  unsubscribeFromGameRoomJoinSuccess,
  unsubscribeFromGameRoomJoinFailed,
  unsubscribeFromLaunchGameRoom,
  unsubscribeFromChangeInGameRoomPlayers,
  unsubscribeFromGameStarted,
  unsubscribeFromGameStateChanged,
};
