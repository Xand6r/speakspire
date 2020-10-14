import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { component as Homepage } from './components/homepage';
import { component as SpeakersPage } from './components/speakersPage';
import { component as SignUpCategory } from './components/category';
import { component as SignInPage } from './components/signin';
import { component as SpeakerSignUpPage } from './components/speakerRegister';
import { component as OrganiserSignUpPage } from './components/organiserRegister';
import { component as EventsPage } from './components/eventsPage';
import { component as SpeakersProfile } from './components/speakerProfile';
import { component as EventProfile } from './components/eventProfile';
import { component as OrganisersPage } from './components/organisersPage';
import { component as EventSignUpPage } from './components/eventsRegister';
import { component as OrganiserProfile } from './components/organiserProfile';
import { component as About } from './components/about';
import { ProtectedRoute } from './utilities/protectedRoute/components';

import IndividualSignUp from './components/individualSignup';

import 'antd/dist/antd.css'; 

function App() {
  return (
    <Switch>
      <Route exact  path='/' component={Homepage} />
      <Route exact path="/about" component={About} />
      <Route exact path='/speakers' component={SpeakersPage} />
      <Route exact path='/events' component={EventsPage} />
      <Route exact path='/category' component={SignUpCategory} />
      <Route exact path='/login' component={SignInPage} />
      <Route path='/register' component={SpeakerSignUpPage} />
      <Route path='/organiser' component={OrganiserSignUpPage} />
      <Route path='/profile' component={SpeakersProfile} />
      <Route path='/eventprofile' component={EventProfile} />
      <Route path='/organisers' component={OrganisersPage} />
      <Route path='/individual' component={IndividualSignUp} />
      <Route path="/registerevent" component={EventSignUpPage} />
      <Route path='/organiserprofile' component={OrganiserProfile} />
    </Switch>
  );
}


export default App;
