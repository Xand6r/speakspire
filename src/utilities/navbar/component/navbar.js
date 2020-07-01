import React from 'react';
import Logo from '../assets/Logo.svg';
import './navbar.scss';

export default function navbar() {
    return (
        <div>
            <div className="navigation">

                <div className="navigation__logo">
                    <img src={Logo} alt="Speakspire Logo"/>
                </div>

                <div className="navigation__menu">
                    <div className="navigation__menu__item --item"> Speakers </div>
                    <div className="navigation__menu__item --item"> Events </div>
                    <div className="navigation__menu__item --item"> Blog </div>
                    <div className="navigation__menu__item --item"> About Us </div>
                    <div className="navigation__menu__item --filledbutton"> Sign In </div>
                    <div className="navigation__menu__item --outlinedbutton"> Sign Up</div>
                </div>

            </div>
        </div>
    )
}
 