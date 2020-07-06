import React from 'react';
import './contact.scss';

export default function contact() {
    return (
        <div>
            <div className="contact">
                <div className="contact__banner">
                    <div className="--text">
                    Speak to us, we would love to hear from you too!
                    </div>
                    <div className="--button">
                        Contact Us
                    </div>
                </div>

                <div className="contact__subscribe">
                    <div className="contact__subscribe__text">
                        Don’t miss out on expert speaking tips, trending topics, call for speakers and so much more!
                    </div>
                    <div className="contact__subscribe__search">
                        <div className="inputgroup">
                            <input 
                                className="contact__subscribe__search__input" 
                                type="text"
                                placeholder="E-mail"
                            />

                        </div>
                        <div className="contact__subscribe__search__button">
                            Subscribe
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
