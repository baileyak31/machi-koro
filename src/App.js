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
  const routePrefix = '/machi-koro';

  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path={`${routePrefix}/not-found`}>
              <GameNotFound routePrefix={routePrefix} />
            </Route>
            <Route path={`${routePrefix}/game/:roomId`}>
              <GameRoom routePrefix={routePrefix} />
            </Route>
            <Route path={`${routePrefix}/home`}>
              <Home routePrefix={routePrefix} />
            </Route>
            <Redirect to={`${routePrefix}/home`} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
