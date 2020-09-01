import React from 'react';
import { GameRoom } from './components/GameRoom';
import { Home } from './components/Home';
import { GameNotFound } from './components/GameNotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path='/not-found'>
              <GameNotFound />
            </Route>
            <Route path='/game/:roomId'>
              <GameRoom />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Redirect to='/home' />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
