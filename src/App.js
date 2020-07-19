import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { component as Homepage } from './components/homepage';
import { component as SpeakersPage } from './components/speakerspage';

function App() {
  return (
    <Switch>
      <Route exact  path='/' component={Homepage} />
      <Route exact path='/speakers' component={SpeakersPage} />
    </Switch>
  );
}

export default App;
