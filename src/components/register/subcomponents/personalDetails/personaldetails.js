import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GenderTab from './genderTab';
import PhoneInput from 'react-phone-input-2';

import notificationIcon from '../../assets/notification.svg';
import './personaldetails.scss';
import 'react-phone-input-2/lib/style.css';

const GENDER_OPTIONS = [
    'Male', 'Female', 'Others'
];

export default function Personaldetails({
    onNameChange, nameValue
}) {
    const [activeTab, setactiveTab] = useState(0);
    const [passwordHidden, setPasswordHidden ] = useState(true)

    const handleNameChange = (event)=>{
        onNameChange(event.target.value);
    }

    const makeActive = (clickedIndex) => {
        setactiveTab(clickedIndex)
    }
    return (
        <div class="personaldetails">
            <div className="personaldetails__heading">
                <div className="personaldetails__heading__header">
                    Personal Details
                </div>
                <div className="personaldetails__heading__subheading">
                    Not a speaker? <span>Choose another account type</span>
                </div>
            </div>

            <div className="personaldetails__formsection">
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        maxLength="30"
                        type="text"
                        id="fullname"
                        name="fullname"
                        onChange={handleNameChange}
                        value={nameValue}
                    />
                </div>
                {/* wrapepr for the name */}
                
                {/* wrapper for the gender */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Gender</label>
                    <div className="--gendersection">
                        {
                            GENDER_OPTIONS.map((gender, index)=>(
                                <GenderTab 
                                    key={Math.random()}
                                    option={gender}
                                    index={index}
                                    active={index === activeTab }
                                    changeTab={makeActive}
                                />
                            ))
                        }

                    </div>
                </div>
                {/* wrapper for the gender */}

                {/* wrapper for the birthdate */}
                <div className="--wrapper">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                    />
                </div>
                {/* wrapper for the birthdate */}

                {/* wrapper for the phone number */}
                <div className="--wrapper --date">
                    <label htmlFor="number">Phone</label>
                    <PhoneInput
                        country={'ng'}
                        placeholder=""
                    />
                </div>
                {/* wrapper for the phone number */}

                {/* wrapper for the city or state */}
                    <div className="--wrapper">
                    <label htmlFor="location">City or state</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your city or state"
                    />
                </div>
                {/* wrapper for the city or state */}

                {/* wrapper for the email */}
                    <div className="--wrapper">
                    <label htmlFor="location">Email</label>
                    <input
                        type="email"
                        id="location"
                        name="location"
                        placeholder="Enter your email"
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

            <div className="personaldetails__footer">
                <div className="--notification">
                    <img src={notificationIcon} alt=""/>
                    <div className="--text">
                        By creating an account you agree to the 
                        <span> Terms and Conditions</span> and our <span>Privacy Policy</span>
                    </div>
                </div>
                <div className="--button_group">
                    <div className="cancel">
                        Cancel
                    </div>
                    <div className="next">
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

Personaldetails.propTypes = {
    onNameChange: PropTypes.func.isRequired,
    nameValue: PropTypes.string.isRequired
}