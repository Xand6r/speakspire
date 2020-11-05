import React, { useState, useEffect } from 'react';
import { Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import PasswordStrengthBar from 'react-password-strength-bar';
import { COUNTRY_LIST } from '../../component/constants';
import Select from 'react-select';


import notificationIcon from '../../assets/notification.svg';
import './personaldetails.scss';
import 'react-phone-input-2/lib/style.css';
import {
    ORGANISER_PERSONAL_DETAILS_KEY
} from '../../component/constants';
import {
	cacheFormState
}  from '../../../../utilities/dataPersist';



export default function Personaldetails({
    stateChanger, state
}) {
    const [passwordHidden, setPasswordHidden ] = useState(true)
    const history = useHistory()

    const handleFormChange = (event)=>{

        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
        });
    }

	/**
	 * watch for changes in the state and uplod accordingly
	*/
    useEffect(()=>{
        cacheFormState(ORGANISER_PERSONAL_DETAILS_KEY,state);
    }, [state])


    return (
        <div className="companypersonaldetails">

            <div className="companypersonaldetails__heading">
                <div className="companypersonaldetails__heading__header">
                    Organizer Details
                </div>
                <div className="companypersonaldetails__heading__subheading">
                    Not an Organizer? <span onClick={()=>history.push('/category')}>Choose another account type</span>
                </div>
            </div>

            <div className="companypersonaldetails__formsection">
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Company Name</label>
                    <input
                        maxLength="30"
                        type="text"
                        id="companyName"
                        name="companyName"
                        onChange={handleFormChange}
                        value={state.companyName}
                        placeholder="Enter company name"
                        required
                    />
                </div>
                {/* wrapepr for the name */}

                {/* wrapper for the phone number */}
                <div className="--wrapper --date">
                    <label htmlFor="number">Phone</label>
                    <PhoneInput
                        country={'ng'}
                        value={state.phoneNumber}
                        onChange={(value)=>(
                            stateChanger({
                                ...state,
                                phoneNumber: value
                            })
                        )}
                    />
                </div>
                {/* wrapper for the phone number */}

                {/* wrapper for the city or state */}
                <div className="--wrapper">
                    <label htmlFor="city">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter house number and street name"
                        onChange={handleFormChange}
                        value={state.address}
                        required
                    />
                </div>
                {/* wrapper for the city or state */}

                {/* wrapper for the city or state */}
                    <div className="--wrapper">
                    <label htmlFor="city">City or state</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city or state"
                        onChange={handleFormChange}
                        value={state.city}
                        required
                    />
                </div>
                {/* wrapper for the city or state */}

                {/* wrapper for the country */}
                <div className="--wrapper">
                    <label htmlFor="coutry">Country</label>
                    <div className="--singleselect">
                        <Select
                            options={COUNTRY_LIST}
                            isSearchable
                            placeholder="Select"
                            className="--item --cream"
                            onChange={(value) =>{
                                stateChanger({
                                    ...state,
                                    country: value.value
                                });
                                console.log(state)
                            }}
                            // {/* value={state.country} */}
                        />
                    </div>
                </div>
                {/* wrapper for the country */}
                
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Company Email</label>
                    <input
                        maxLength="30"
                        type="text"
                        id="companyEmail"
                        name="companyEmail"
                        onChange={handleFormChange}
                        value={state.companyEmail}
                        placeholder="Enter company email"
                        required
                    />
                </div>
                {/* wrapepr for the name */}

                {/* wrapper for you password */}
                <div className="--wrapper">
                    <label htmlFor="password"> Password </label>
                        <div className="--passwordinput">
                        <input
                            placeholder="6+ Characters"
                            type={(passwordHidden)?"password":"text"}
                            name="password"
                            id="password"
                            onChange={handleFormChange}
                            value={state.password}
                            required
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

            <div className="companypersonaldetails__footer">
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

                    <Link className="link" to="/organiser/2">
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