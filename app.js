import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import Auction from './components/Auction';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UserRegistration setUsername={setUsername} />
        </Route>
        <Route path="/auction">
          <Auction username={username} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
