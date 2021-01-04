import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { message, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2';


import axios from '../../axios';
import {validateData} from './validator'
import {SPEAKER_SPECIALITY} from '../../../components/speakerRegister/subcomponents/expertise/constants';
import {INITIAL_STATE, COUNTRY_LIST} from './constants';

import 'react-phone-input-2/lib/style.css';
import './organiserProfileUpdates.scss';
import '../updates.scss';




export default function Index({ onClose, initialData, onSuccess }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const userId = useSelector(({ user }) => user.id);

    const changeListData = (key,value) =>{
        setState({
            ...state,
            [key]:value
        })
    }

    useEffect(()=> {
        if(initialData){
            const {name, phone, email, specialty, state, country} = initialData;
            setState({
                name, 
                phone,
                email,
                specialty,
                city: state,
                country: country
            })
        }
    },[initialData]);

    const saveProfileState = () => {
        const valid = validateData(state);
		if (valid) {
			// set lading state
			setLoading(true);
			// make patch request
			axios
				.patch(`organizers/${userId}/details`, {
                    "name": state.name,
                    "specialty": state.specialty,
                    "email": state.email,
                    "phone": state.phone,
                    "state": state.city,
                    "country":state.country
				})
				.then(() => {
					message.success('Details updated sucesfully!');
					onClose();
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					message.error('There was an error updating user!', err.response.data.message);
					onClose();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			message.error('Please fill in all details before submitting!');
			return;
		}
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
    return (
        <div className="updates organiser_profile_update">
            <div className="updates__form">
                <div className='updates__form__header'>Organizer Details</div>
                <div className="updates__form__content">

                    <div className="updates__form__content__item">
                        <label htmlFor="company">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter event name"
                            value={state.name}
                            onChange={({target:{name, value}}) => changeListData(name, value)}
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="specialty">Specialty</label>
                        <div className="--singleselect">
                            <Select
								options={SPEAKER_SPECIALITY}
								isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(specialty) => {
                                    changeListData('specialty', specialty.value)
                                }}
                                value={
                                    state.specialty
										? {
												value: state.specialty,
												label: state.specialty,
										  }
										: ''
                                }
                            />
                        </div>
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="company">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={({target:{name, value}}) => changeListData(name, value)}
                        />
                    </div>

                    <div className="updates__form__content__item --date">
                        <label htmlFor="company">Phone</label>
                        <PhoneInput
                            country={'ng'}
                            value={state.phone}
                            onChange={(value)=>(
                                changeListData('phone', state.phone)
                            )}
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="company">City or State</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter your city or state"
                            value={state.city}
                            onChange={({target:{name, value}}) => changeListData(name, value)}
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="company">Country</label>
                        <div className="--singleselect">
                            <Select
								options={COUNTRY_LIST}
								isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(country) => {
                                    changeListData('country', country.value)
                                }}
                                value={
                                    state.country
										? {
												value: state.country,
												label: state.country,
										  }
										: ''
                                }
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className='updates__action'>
				<div className='cancel' onClick={onClose}>
					Cancel
				</div>

				<div className='save' onClick={saveProfileState}>
					{loading ? <Spin indicator={antIcon} /> : 'Save'}
				</div>
			</div>
    
        </div>
    )
}
