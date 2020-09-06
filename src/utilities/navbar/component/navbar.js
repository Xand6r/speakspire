import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import './navbar.scss';

const MENU_ITEMS = [
    {text:"Speakers", "link":"/speakers"},
    {text:"Organizers", "link":"/speakers"},
    {text:"Events", "link":""},
    {text:"Blog", "link":""},
    {text:"About Us", "link":""},
];

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

                    {

                        MENU_ITEMS.map(menuItem => (
                            <Link className='link' to={menuItem.link}>
                                <div className="navigation__menu__item --item">
                                    {menuItem.text} 
                                </div>
                            </Link>
                        ))

                    }

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
 