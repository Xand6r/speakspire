import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../assets/Logo.svg';
import {setLoggedIn, setLoggedOut} from '../../../redux/userSlice';

import { fetchAllSpeakers } from '../../../redux/speakerSlice';
import { fetchAllEvents } from '../../../redux/eventSlice';
import { fetchAllOrganizers } from '../../../redux/organiserSlice';


import {useDispatch, useSelector} from 'react-redux';

import './navbar.scss';
import { message } from 'antd';

const MENU_ITEMS = [
	{text: 'Speakers', link: '/speakers'},
	{text: 'Organizers', link: '/organisers'},
	{text: 'Events', link: '/events'},
	{text: 'Blog', link: ''},
	{text: 'About Us', link: '/about'},
];



export default function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        // fetch all speakers
        dispatch(fetchAllSpeakers());
        // fetch all events
        dispatch(fetchAllEvents());
        // fetch all organisers
        dispatch(fetchAllOrganizers());

        const foundSession = sessionStorage.getItem("speakspire_token")
        if(foundSession){
            dispatch(setLoggedIn());
        }
    }, [dispatch])
    const signOut = ()=>{
        sessionStorage.clear();
        dispatch(setLoggedOut());
        message.success("Logout sucessfull");
        setTimeout(()=>history.push("/"), 1000)
    }
    const userState = useSelector(({user}) => user)
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

                    {
                        (!userState.loggedIn)?
                        (
                            <>
                            <Link className="link" to="/login">
                                <div className="navigation__menu__item --outlinedbutton"> Sign In </div>
                            </Link>

                            <Link className="link" to="/category">
                                <div className="navigation__menu__item --filledbutton"> Sign Up</div>
                            </Link>
                            </>

                        ):(
                            <Link className="link" onClick={signOut} >
                                <div className="navigation__menu__item --filledbutton"> Sign Out</div>
                            </Link>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
