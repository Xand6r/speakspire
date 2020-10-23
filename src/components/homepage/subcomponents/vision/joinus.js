import React from 'react';
import { useHistory } from 'react-router-dom';

import UserLogo from '../../../../assets/user.svg';
import UsersLogo from '../../../../assets/users.svg';
import MicrophoneLogo from '../../../../assets/microphone.svg';

import './joinus.scss';

const benefits = [
    [UserLogo, 'Sign up for free, no fee or credit card required' ],
    [UsersLogo, 'Join a community of world-class speakers and life coaches'],
    [MicrophoneLogo, 'Get more exposure and value for your work']
]

export default function Joinus() {
    const history = useHistory()
    return (

        <div className="vision__register">
            <div className="--heading">
                Become an inspiration. Sign up as a speaker.
            </div>
            <div className="vision__register__benefits">
                {
                    benefits.map((benefit,i) => (
                        <div className="--benefit" key={i}>
                            <img src={benefit[0]} alt="" className="--icon"/>
                            <div className="--text">
                                {benefit[1]}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div
                className="signup"
                onClick = {()=>history.push('/category')}
            >
                Sign Up
            </div>
        </div>
    )
}
