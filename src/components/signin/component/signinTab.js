import React from 'react';
import './signinTab.scss';
import SigninInput from '../subcomponents/signinInputs';
import close from '../../../assets/close.svg';
import userLogo from '../assets/userLogo.svg';

export default function signintab() {
    return (
        <div className="signintab">
            <img
                className="signintab__close" 
                src={close}
                alt="close button"
            />

            <img
                className="signintab__sideimage"
                src={userLogo}
                alt="userLogo"
            />

            <div className="signininputcomponent">
                <SigninInput />
            </div>

        </div>
    )
}
