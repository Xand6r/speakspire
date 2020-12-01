import React, { useState, useEffect } from 'react';
import {message} from 'antd';

import {initialState} from './constants';
import './speakerprofileupdates.scss';
import '../updates.scss';

export default function UpdateProfile({
    initialData, onClose
}) {
    const [state, setState] = useState(initialState);
    const changeFormState = (name, value)=>{
        setState(state => ({
            ...state,
            [name]: value
          }));
    }
    
    useEffect(() =>{
        const {name, phone, email} = initialData;
        changeFormState('fullname', name);
        changeFormState('phonenumber', phone);
        changeFormState('email', email);
    }, [initialData])

    const changeInputState = ({target: {name, value}}) =>{
        changeFormState(name, value);
    }

    const savePersonalDetails = () =>{
        // update the details logic
        message.success("Details updated sucesfully!");
        onClose();
    }

    return (
        <div className="updates">

            <div className="updates__form">
                <div className="updates__form__header">
                    Contact Details
                </div>

                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={state.fullname}
                            onChange={changeInputState}
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={state.phonenumber}
                            onChange={changeInputState}
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Email
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={state.email}
                            onChange={changeInputState}
                        />
                    </div>
                </div>

            </div>
            <div className="updates__action">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    Cancel
                </div>

                <div
                    className="save"
                    onClick={savePersonalDetails}
                >
                    Save
                </div>
            </div>

        </div>
    )
}
