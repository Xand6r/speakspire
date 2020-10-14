import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { INITIAL_STATE } from './constants';
import { component as NavBar } from '../../../utilities/navbar';

import notificationIcon from '../assets/notification.svg';
import './usersignup.scss';


export default function Userdetails() {
    const [passwordHidden, setPasswordHidden ] = useState(true);
    const [state, stateChanger ] = useState(INITIAL_STATE);

    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    }

    const saveUserdetails = (event)=>{
        console.log(state);
    }


    return (
        <>
        <NavBar />
        <div className="userdetails__wrapper">
            <div className="userdetails">

                <div className="userdetails__heading">
                    <div className="userdetails__heading__header">
                        Personal Details
                    </div>
                    <div className="userdetails__heading__subheading">
                        Not an individual? <span>Choose another account type</span>
                    </div>
                </div>

                <div className="userdetails__formsection">
                    {/* wrapepr for the name */}
                    <div className="--wrapper">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            maxLength="30"
                            type="text"
                            id="fullname"
                            name="fullname"
                            onChange={handleFormChange}
                            value={state.fullname}
                            placeholder="Enter full name"
                        />
                    </div>
                    {/* wrapepr for the name */}


                    {/* wrapper for the email */}
                        <div className="--wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleFormChange}
                            value={state.email}
                        />
                    </div>
                    {/* wrapper for the email */}

                    {/* wrapper for you password */}
                    <div className="--wrapper">
                        <label htmlFor="password"> Password </label>
                            <div className="--passwordinput">
                            <input
                                placeholder="6+ Characters"
                                type={(passwordHidden)?"password":"text"}
                                name="password"
                                id="password"
                                value={state.password}
                                onChange={handleFormChange}
                            />
                            <i 
                                className={(passwordHidden)?"far fa-eye":"fa fa-eye-slash"}
                                id="togglePassword" 
                                onClick={() => setPasswordHidden(!passwordHidden)}
                            />
                        </div>
                    </div>
                    {/* wrapper for you password */}

                </div>

                <div className="userdetails__footer">
                    <div className="--notification">
                        <img src={notificationIcon} alt=""/>
                        <div className="--text">
                            By creating an account you agree to the 
                            <span> Terms and Conditions</span> and our <span>Privacy Policy</span>
                        </div>
                    </div>
                    <div className="--button_group">
                        <Link className="link" to="/">
                            <div className="cancel">
                                Cancel
                            </div>
                        </Link>

                        <Link onClick={saveUserdetails} className="link" to="/profile">
                            <div className="next">
                                Create My Account
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
