import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import './navbar.scss';

export default function navbar() {
    return (
        <div>
            <div className="navigation">

                <Link className='link' to="/">
                    <div className="navigation__logo">
                        <img src={Logo} alt="Speakspire Logo"/>
                    </div>
                </Link>

                <div className="navigation__menu">

                    <Link className='link' to="/speakers">
                        <div className="navigation__menu__item --item">
                            Speakers 
                        </div>
                    </Link>

                    <Link className='link'>
                        <div className="navigation__menu__item --item"> Events </div>
                    </Link>

                    <Link className='link'>
                        <div className="navigation__menu__item --item"> Blog </div>
                    </Link>

                    <Link className="link">
                        <div className="navigation__menu__item --item"> About Us </div>
                    </Link>

                    <Link className="link" to="/login">
                        <div className="navigation__menu__item --outlinedbutton"> Sign In </div>
                    </Link>

                    <Link className="link" to="/category">
                        <div className="navigation__menu__item --filledbutton"> Sign Up</div>
                    </Link>
                </div>

            </div>
        </div>
    )
}
 