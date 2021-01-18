import React, { useState } from 'react'
import './contactMethods.scss';
import {message} from 'antd';

import CloseIcon from './assets/close.svg';
export default function Index({closed, onClose, contacts}) {
    const {
        whatsapp, email, phone
    } = contacts;

    const contactProfile = (contactKeyValue) => {
        const [[key, value]] = Object.entries(contactKeyValue);
        if(!value) return;
        switch (key) {
            case "whatsapp":
                window.open(value, '_blank');
                break;
            case "email":
                window.location.href = `mailto:${value}`;
                break;
            case "phone":
                window.open(`tel:${phone}`);
                break;
            default:
                message.error('invalid contact method.')
          }
    }
    return (
        <div
            style={closed? {"display": "none"}: {"display":"flex"}}
            className="contactmethod"
        >
            <img
                className="contactmethod__close"
                src={CloseIcon} alt=""
                onClick = {onClose}
            />
            <div className="contactmethod__wrapper">

                <div
                    id="call"
                    className={`contactmethod__wrapper__item ${!phone && '--disabled'}`}
                    onClick = {() => contactProfile({phone})}
                >
                    <div className="img"></div>
                    <span>Call</span>
                </div>

                <div
                    id="mail"
                    className={`contactmethod__wrapper__item ${!email && '--disabled'}`}
                    onClick = {() => contactProfile({email})}
                >
                <div className="img"></div>
                    <span>Email</span>
                </div>

                <div
                    id="whatsapp"
                    className={`contactmethod__wrapper__item ${!whatsapp && '--disabled'}`}
                    onClick = {() => contactProfile({whatsapp})}
                >
                <div className="img"></div>
                    <span>WhatsApp</span>
                </div>

            </div>
        </div>
    )
}
