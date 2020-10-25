import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './utilities/loadingScreen';
import 'antd/dist/antd.css';

const Homepage = lazy(() => import('./components/homepage' /* webpackChunkName: "Homepage" */));
const SpeakersPage = lazy(() => import('./components/speakersPage' /* webpackChunkName: "SpeakersPage" */));
const SingleSpeakerPage = lazy(() => import('./components/singleSpeakerProfile' /* webpackChunkName: "SingleSpeakerPage" */));
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

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { loggedIn } = useSelector(({ user }) => user);

	return <Route {...rest} render={(props) => (loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)} />;
};

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				<Route exact path='/about' component={About} />
				<ProtectedRoute exact path='/speakers' component={SpeakersPage} />
				<Route exact path='/speakers/:id' component={SingleSpeakerPage} />
				<ProtectedRoute exact path='/events' component={EventsPage} />
				<Route exact path='/category' component={SignUpCategory} />
				<Route exact path='/login' component={SignInPage} />
				<Route path='/register' component={SpeakerSignUpPage} />
				<Route path='/organiser' component={OrganiserSignUpPage} />
				<ProtectedRoute path='/profile' component={SpeakersProfile} />
				<ProtectedRoute path='/eventprofile' component={EventProfile} />
				<ProtectedRoute path='/organisers' component={OrganisersPage} />
				<Route path='/individual' component={IndividualSignUp} />
				<Route path='/registerevent' component={EventSignUpPage} />
				<Route path='/organiserprofile/:id' component={OrganiserProfile} />
				<Route exact path='/' component={Homepage} />
			</Switch>
		</Suspense>
	);
}

export default App;
