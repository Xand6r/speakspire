import React from 'react';
import {component as Nav} from '../../../utilities/navbar';
import mailIcon from '../assets/envelope.svg';
import {getMail} from '../../../api/user'

import './confirmMail.scss';


export default function confirmMail() {
    return (
        <div className="confirmmail">
            {/* the navigation bar of the page */}
            <div className="--sticky">
                <Nav />
            </div>
            {/* the navigation bar of the page */}

            {/* the notification banner */}
            <div className="confirmmail__banner">
                <img
                    src={mailIcon}
                    alt=""
                />
                <div className="confirmmail__banner__text">
                    <div className="confirmmail__banner__text__header">
                        Confirm Your Email
                    </div>
                    <div className="confirmmail__banner__text__subtext">
                        Hello! Thank you for signing up on Speakspire. 
                        <br /> <br />
                        We’ve sent a message to <b>{getMail() || "Your mail address"}</b> with a link to activate your account. To complete your registration, please check your email to confirm your email address.

                    </div>
                </div>
            </div>
            {/* the notification banner */}
        </div>
    )
}
