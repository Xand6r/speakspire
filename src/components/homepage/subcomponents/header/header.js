import React from 'react';
import {useHistory} from 'react-router-dom';

import HeaderIcon from '../../../../assets/curve.svg';
import './header.scss';

export default function Header() {
    const history = useHistory();
    return (
        <div>
            <div className="header">

                <div className="header__text">
                    <div className="header__text__primary">
                        Ready to ignite a vibrant world?
                    </div>
                    <div className="header__text__secondary">
                        Start by SPEAKING about it.
                    </div>
                    <div
                        className="header__text__action"
                        onClick = {()=>history.push('/category')}
                    >
                        Sign Up
                    </div>
                </div>

                <div className="header__logo">
                    <img src={HeaderIcon} alt="Curve"/>
                </div>
            </div>
        </div>
    )
}
