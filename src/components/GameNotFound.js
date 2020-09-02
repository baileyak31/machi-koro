import React from 'react';
import { Link } from 'react-router-dom';

export const GameNotFound = ({ routePrefix }) => {
  return (
    <>
      <h1>Game not found</h1>
      <h3>Whoopsie doodle! Looks like that game doesn't exist.</h3>
      <Link to={`${routePrefix}`}>Back to Home</Link>
    </>
  );
};

export default GameNotFound;
