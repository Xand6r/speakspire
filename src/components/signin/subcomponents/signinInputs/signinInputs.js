import React, { useState } from 'react';
import './signinInputs.scss'

export default function SigninInputs() {

    const [passwordHidden, setPasswordHidden ] = useState(true)
    return (
        <div className="signininputs">
            
            <div className="signininputs__headers">
                <div className="signininputs__headers__heading">
                    Sign In
                </div>

                <div className="signininputs__headers__subheading">
                    New to Speakspire? <span>Sign Up</span>
                </div>
            </div>

            <div className="signininputs__form">
                <div className="--inputwrapper">
                    <label htmlFor="email"> Email </label>
                    <input 
                        placeholder="Enter your email"
                        type="text"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="--inputwrapper">
                    <label htmlFor="password"> Password </label>
                        <div className="--passwordinput">
                        <input
                            placeholder="Enter your password"
                            type={(passwordHidden)?"password":"text"}
                            name="password"
                            id="password"
                        />
                        <i 
                            className={(passwordHidden)?"far fa-eye":"fa fa-eye-slash"}
                            id="togglePassword" 
                            onClick={() => setPasswordHidden(!passwordHidden)}
                        />
                    </div>
                </div>

                <span>Forgot Password?</span>
            </div>

            <div className="signininputs__submit">
                Sign in
            </div>

        </div>
    )
}
