import React, {Suspense, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import {ProtectedRoute} from './utilities/protectedRoute/components';

const Homepage = lazy(() => import('./components/homepage' /* webpackChunkName: "Homepage" */));
const SpeakersPage = lazy(() => import('./components/speakersPage' /* webpackChunkName: "SpeakersPage" */));
const SignUpCategory = lazy(() => import('./components/category' /* webpackChunkName: "SignUpCategory" */));
const SignInPage = lazy(() => import('./components/signin' /* webpackChunkName: "SignInPage" */));
const SpeakerSignUpPage = lazy(() => import('./components/speakerRegister' /* webpackChunkName: "SpeakerSignUpPage" */));
const OrganiserSignUpPage = lazy(() => import('./components/organiserRegister' /* webpackChunkName: "OrganiserSignUpPage" */));
const EventsPage = lazy(() => import('./components/eventsPage' /* webpackChunkName: "EventsPage" */));
const SpeakersProfile = lazy(() => import('./components/speakerProfile' /* webpackChunkName: "SpeakersProfile" */));
const EventProfile = lazy(() => import('./components/eventProfile' /* webpackChunkName: "EventProfile" */));
const OrganisersPage = lazy(() => import('./components/organisersPage' /* webpackChunkName: "OrganisersPage" */));
const EventSignUpPage = lazy(() => import('./components/eventsRegister' /* webpackChunkName: "EventSignUpPage" */));
const OrganiserProfile = lazy(() => import('./components/organiserProfile' /* webpackChunkName: "OrganiserProfile" */));
const About = lazy(() => import('./components/about' /* webpackChunkName: "About" */));
const IndividualSignUp = lazy(() => import('./components/individualSignup' /* webpackChunkName: "IndividualSignUp" */));

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/about' component={About} />
				<ProtectedRoute exact path='/speakers' component={SpeakersPage} />
				<ProtectedRoute exact path='/events' component={EventsPage} />
				<Route exact path='/category' component={SignUpCategory} />
				<Route exact path='/login' component={SignInPage} />
				<Route path='/register' component={SpeakerSignUpPage} />
				<Route path='/organiser' component={OrganiserSignUpPage} />
				<ProtectedRoute path='/profile' component={SpeakersProfile} />
				<ProtectedRoute path='/eventprofile' component={EventProfile} />
				<ProtectedRoute path='/organisers' component={OrganisersPage} />
				<Route path='/individual' component={IndividualSignUp} />
				<ProtectedRoute path='/registerevent' component={EventSignUpPage} />
				<ProtectedRoute path='/organiserprofile' component={OrganiserProfile} />
			</Switch>
		</Suspense>
	);
}

export default App;
