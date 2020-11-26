import React, {useState} from 'react'
import './contactMethods.scss';

import CloseIcon from './assets/close.svg';
export default function Index({closed, onClose}) {
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

                <div id="call" className="contactmethod__wrapper__item">
                    <div className="img"></div>
                    <span>Call</span>
                </div>

                <div id="mail" className="contactmethod__wrapper__item">
                <div className="img"></div>
                    <span>Email</span>
                </div>

                <div id="whatsapp" className="contactmethod__wrapper__item --disabled">
                <div className="img"></div>
                    <span>WhatsApp</span>
                </div>

            </div>
        </div>
    )
}
