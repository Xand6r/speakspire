import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import GenderTab from './genderTab';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import { COUNTRY_LIST } from '../../component/constants';
import PasswordStrengthBar from 'react-password-strength-bar';

import {
    SPEAKER_PERSONAL_DETAILS_KEY
} from '../../component/constants';

import {
    cacheFormState
} from '../../../../utilities/dataPersist'

import notificationIcon from '../../assets/notification.svg';
import './personaldetails.scss';
import 'react-phone-input-2/lib/style.css';
import calendarIcon from '../../../../assets/calendar.svg'

const GENDER_OPTIONS = [
    'Male', 'Female', 'Other'
];

export default function Personaldetails({
    stateChanger, state
}) {
    const [activeTab, setactiveTab] = useState(GENDER_OPTIONS.indexOf(state.gender));
    const [passwordHidden, setPasswordHidden ] = useState(true);
    const history = useHistory()

    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    }

    const savePersonalDetails = (event)=>{
        console.log(state);
    }

    const makeActive = (clickedIndex) => {
        setactiveTab(clickedIndex)
        stateChanger({
            ...state,
            gender: GENDER_OPTIONS[clickedIndex]
          })
    }
    useEffect(()=>{
        cacheFormState(SPEAKER_PERSONAL_DETAILS_KEY, state)
    }, [state])


    const monthFormat = 'DD-MM-YY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );

    return (
        <div className="personaldetails">

            <div className="personaldetails__heading">
                <div className="personaldetails__heading__header">
                    Personal Details
                </div>
                <div className="personaldetails__heading__subheading">
                    Not a speaker? <span onClick={()=>history.push('/category')}>Choose another account type</span>
                </div>
            </div>

            <div className="personaldetails__formsection">
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Full Name *</label>
                    <input
                        maxLength="30"
                        type="text"
                        id="fullname"
                        name="fullname"
                        onChange={handleFormChange}
                        value={state.fullname}
                        placeholder="Enter first name and last name"
                    />
                </div>
                {/* wrapepr for the name */}
                
                {/* wrapper for the gender */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Gender *</label>
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
                    <label htmlFor="birthdate">Birthdate *</label>
                    <DatePicker
                        format={monthFormat}
                        placeholder="dd-mm-yy"
                        suffixIcon={<DateSuffix />}
                        onChange={(momentDate, dateString)=>{
                            stateChanger({
                                ...state,
                                birthdate: dateString
                            });

                        }}
                        value={state.birthdate? moment(state.birthdate, 'DD-MM-YY') : ''}
                        disabledDate={d => !d || d.isAfter(moment().subtract(18, 'years') )}
                    />
                </div>
                {/* wrapper for the birthdate */}

                {/* wrapper for the phone number */}
                <div className="--wrapper --date">
                    <label htmlFor="number">Phone</label>
                    <PhoneInput
                        country={'ng'}
                        value={state.phonenumber}
                        onChange={(value)=>(
                            stateChanger({
                                ...state,
                                phonenumber: value
                            })
                        )}
                    />
                </div>
                {/* wrapper for the phone number */}

                {/* wrapper for the city or state */}
                    <div className="--wrapper">
                    <label htmlFor="city">City or state *</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city or state"
                        onChange={handleFormChange}
                        value={state.city}
                    />
                </div>
                {/* wrapper for the city or state */}

                {/* wrapper for the country */}
                <div className="--wrapper">
                    <label htmlFor="coutry">Country *</label>
                    <div className="--singleselect">
                        <Select
                            options={COUNTRY_LIST}
                            isSearchable
                            placeholder="Select"
                            className="--item --cream"
                            onChange={(country) =>{
                                stateChanger({
                                    ...state,
                                    country: country.value
                                });
                            }}
                            value={
                                state.country? 
                                {
                                    value: state.country,
                                    label: state.country
                                }
                                : ""
                            }
                        />
                    </div>
                </div>
                {/* wrapper for the country */}

                {/* wrapper for the email */}
                    <div className="--wrapper">
                    <label htmlFor="email">Email *</label>
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
                    <label htmlFor="password"> Password *</label>
                    <div className="--passwordinput">
                        <input
                            // {/* placeholder="6+ Characters" */}
                            placeholder="Enter your password"
                            type={(passwordHidden)?"password":"text"}
                            name="password"
                            id="password"
                            onChange={handleFormChange}
                            value={state.password}
                        />
                        <i 
                            className={(passwordHidden)?"far fa-eye":"fa fa-eye-slash"}
                            id="togglePassword" 
                            onClick={() => setPasswordHidden(!passwordHidden)}
                        />
                    </div>
                    <div className="--passwordstrengthbarwrapper">
                        <PasswordStrengthBar password={state.password} />
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
                    <Link className="link" to="/">
                        <div className="cancel">
                            Cancel
                        </div>
                    </Link>

                    <Link onClick={savePersonalDetails} className="link" to="/register/2">
                        <div className="next">
                            Next
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Personaldetails.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}