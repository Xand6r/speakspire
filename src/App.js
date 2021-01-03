import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './utilities/loadingScreen';
import 'antd/dist/antd.css';
import { getToken, setToken, getUser, getRole } from './api/user';
import ConfirmMail from './components/confirmMail/index';
// import {component as Nav} from './utilities/navbar'

const Homepage = lazy(() => import('./components/homepage' /* webpackChunkName: "Homepage" */));
const SpeakersPage = lazy(() => import('./components/speakersPage' /* webpackChunkName: "SpeakersPage" */));
// const SpeakersProfile = lazy(() => import('./components/speakerProfile' /* webpackChunkName: "SingleSpeakerPage" */));
const SpeakerPersonalProfile = lazy(() => import('./components/speakerPersonalProfile' /* webpackChunkName: "Profile" */));
// const OrganiserProfile = lazy(() => import('./components/organiserProfile' /* webpackChunkName: "OrganiserProfile" */));
const OrganiserPersonalProfile = lazy(() => import('./components/organiserPersonalProfile' /* webpackChunkName: "Profile" */));
const SignUpCategory = lazy(() => import('./components/category' /* webpackChunkName: "SignUpCategory" */));
const SignInPage = lazy(() => import('./components/signin' /* webpackChunkName: "SignInPage" */));
const SpeakerSignUpPage = lazy(() => import('./components/speakerRegister' /* webpackChunkName: "SpeakerSignUpPage" */));
const OrganiserSignUpPage = lazy(() => import('./components/organiserRegister' /* webpackChunkName: "OrganiserSignUpPage" */));
const EventsPage = lazy(() => import('./components/eventsPage' /* webpackChunkName: "EventsPage" */));
const EventProfile = lazy(() => import('./components/eventProfile' /* webpackChunkName: "EventProfile" */));
const OrganisersPage = lazy(() => import('./components/organisersPage' /* webpackChunkName: "OrganisersPage" */));
const EventSignUpPage = lazy(() => import('./components/eventsRegister' /* webpackChunkName: "EventSignUpPage" */));
const About = lazy(() => import('./components/about' /* webpackChunkName: "About" */));
const IndividualSignUp = lazy(() => import('./components/individualSignup' /* webpackChunkName: "IndividualSignUp" */));
const Favourites = lazy(() => import('./components/favourites' /* webpackChunkName: "IndividualSignUp" */));
const ForgotPassword = lazy(() => import('./components/password/forgotPassword' /* webpackChunkName: "IndividualSignUp" */));
const ResetPassword = lazy(() => import('./components/password/resetPassword' /* webpackChunkName: "IndividualSignUp" */));

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const loggedIn = getToken();
	return <Route {...rest} render={(props) => (loggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />)} />;
};

function App() {
	const role = useSelector(({ user }) => user.role);
	return (
		<>
			{/* <Nav /> */}
			<Suspense fallback={<Loader />}>
				<Switch>
					<ProtectedRoute exact path='/profile' component={role === 'speaker' ? SpeakerPersonalProfile : OrganiserPersonalProfile} />
					<ProtectedRoute exact path='/favourites' component={Favourites} />
					<Route exact path='/about' component={About} />
					<Route exact path='/speakers' component={SpeakersPage} />
					<Route exact path='/speakers/:id' component={SpeakerPersonalProfile} />
					<Route exact path='/events' component={EventsPage} />
					<Route exact path='/category' component={SignUpCategory} />
					<Route exact path='/login' component={SignInPage} />
					<Route path='/register' component={SpeakerSignUpPage} />
					<Route path='/organiser' component={OrganiserSignUpPage} />
					<Route path='/events/:id' component={EventProfile} />
					<Route path='/organisers' component={OrganisersPage} />
					<Route path='/individual' component={IndividualSignUp} />
					<ProtectedRoute path='/registerevent' component={EventSignUpPage} />
					<Route path='/organiserprofile/:id' component={OrganiserPersonalProfile} />
					<Route exact path='/' component={Homepage} />
					<Route exact path='/confirm' component={ConfirmMail} />
					<Route exact path='/forgotpassword' component={ForgotPassword} />
					<Route exact path='/resetpassword' component={ResetPassword} />
				</Switch>
			</Suspense>
		</>
	);
}

export default App;
