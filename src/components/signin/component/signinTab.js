import React from 'react';
import './signinTab.scss';
import SigninInput from '../subcomponents/signinInputs';
import close from '../../../assets/close.svg';
import userLogo from '../assets/userLogo.svg';

import {withRouter} from 'react-router-dom';

function signintab({history}) {
	return (
		<div className='signintab'>
			<img className='signintab__close' src={close} alt='close button' onClick={() => history.goBack()} />

			<img className='signintab__sideimage' src={userLogo} alt='userLogo' />
			<div className='signininputcomponent'>
				<SigninInput />
			</div>
		</div>
	);
}

export default withRouter(signintab);
