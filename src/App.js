import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './utilities/loadingScreen';
import 'antd/dist/antd.css';
import { getToken, setToken, getUser, getRole } from './api/user';
// import {component as Nav} from './utilities/navbar'

const Homepage = lazy(() => import('./components/homepage' /* webpackChunkName: "Homepage" */));
const SpeakersPage = lazy(() => import('./components/speakersPage' /* webpackChunkName: "SpeakersPage" */));
const SpeakersProfile = lazy(() => import('./components/speakerProfile' /* webpackChunkName: "SingleSpeakerPage" */));
const Profile =
	getRole() === 'speaker'
		? lazy(() => import('./components/speakerPersonalProfile' /* webpackChunkName: "Profile" */))
		: lazy(() => import('./components/organiserPersonalProfile' /* webpackChunkName: "Profile" */));
const SignUpCategory = lazy(() => import('./components/category' /* webpackChunkName: "SignUpCategory" */));
const SignInPage = lazy(() => import('./components/signin' /* webpackChunkName: "SignInPage" */));
const SpeakerSignUpPage = lazy(() => import('./components/speakerRegister' /* webpackChunkName: "SpeakerSignUpPage" */));
const OrganiserSignUpPage = lazy(() => import('./components/organiserRegister' /* webpackChunkName: "OrganiserSignUpPage" */));
const EventsPage = lazy(() => import('./components/eventsPage' /* webpackChunkName: "EventsPage" */));
const EventProfile = lazy(() => import('./components/eventProfile' /* webpackChunkName: "EventProfile" */));
const OrganisersPage = lazy(() => import('./components/organisersPage' /* webpackChunkName: "OrganisersPage" */));
const EventSignUpPage = lazy(() => import('./components/eventsRegister' /* webpackChunkName: "EventSignUpPage" */));
const OrganiserProfile = lazy(() => import('./components/organiserProfile' /* webpackChunkName: "OrganiserProfile" */));
const About = lazy(() => import('./components/about' /* webpackChunkName: "About" */));
const IndividualSignUp = lazy(() => import('./components/individualSignup' /* webpackChunkName: "IndividualSignUp" */));

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const loggedIn = getToken();
	return <Route {...rest} render={(props) => (loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)} />;
};

function App() {
	return (
		<>
			{/* <Nav /> */}
			<Suspense fallback={<Loader />}>
				<Switch>
					<Route exact path='/about' component={About} />
					<ProtectedRoute exact path='/speakers' component={SpeakersPage} />
					<ProtectedRoute exact path='/profile' component={Profile} />
					<ProtectedRoute exact path='/speakers/:id' component={SpeakersProfile} />
					<ProtectedRoute exact path='/events' component={EventsPage} />
					<Route exact path='/category' component={SignUpCategory} />
					<Route exact path='/login' component={SignInPage} />
					<Route path='/register' component={SpeakerSignUpPage} />
					<Route path='/organiser' component={OrganiserSignUpPage} />
					<ProtectedRoute path='/events/:id' component={EventProfile} />
					<ProtectedRoute path='/organisers' component={OrganisersPage} />
					<Route path='/individual' component={IndividualSignUp} />
					<Route path='/registerevent' component={EventSignUpPage} />
					<ProtectedRoute path='/organiserprofile/:id' component={OrganiserProfile} />
					<Route exact path='/' component={Homepage} />
				</Switch>
			</Suspense>
		</>
	);
}

export default App;
