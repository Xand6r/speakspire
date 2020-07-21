import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { component as Homepage } from './components/homepage';
import { component as SpeakersPage } from './components/speakerspage';
import { component as SignUpCategory } from './components/category';

function App() {
  return (
    <Switch>
      <Route exact  path='/' component={Homepage} />
      <Route exact path='/speakers' component={SpeakersPage} />
      <Route exact path='/category' component={SignUpCategory} />
    </Switch>
  );
}

export default App;
