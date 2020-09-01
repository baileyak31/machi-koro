import React, { useState, useEffect } from 'react';
import {
  emitLaunchGameRoom,
  subscribeToLaunchGameRoom,
  unsubscribeFromLaunchGameRoom,
} from '../api';
import { Link, useHistory } from 'react-router-dom';

export const Home = () => {
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    subscribeToLaunchGameRoom((roomId) => {
      launchGameRoom(roomId);
    });

    return unsubscribeFromLaunchGameRoom;
  });

  let history = useHistory();

  const onLaunchGameRoomClicked = () => {
    emitLaunchGameRoom();
  };

  const launchGameRoom = (roomId) => {
    console.log('launchGameRoom called');
    console.log(`joining room ${roomId}`);
    history.push(`/game/${roomId}`);
  };

  const onRoomIdChange = (event) => {
    console.log('onRoomIdChange called');
    setRoomId(event.target.value);
  };

  return (
    <>
      <h1>Welcome to Machi Koro!</h1>
      <h2>Join Game</h2>
      <input
        type='text'
        value={roomId}
        onChange={onRoomIdChange}
        placeholder='Enter game ID...'
      />
      <Link to={`/game/${roomId}`}>
        <button>Submit</button>
      </Link>
      <h2>Create New Game</h2>
      <button onClick={onLaunchGameRoomClicked}>Launch Game Room</button>
    </>
  );
};
