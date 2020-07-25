import React from 'react';
import {component as NavBar} from '../../../utilities/navbar';

import SigninTab from './signinTab';
import './signin.scss';


export default function signin() {
    return (
        <div className="signin">
            {/* the navigation bar component */}
            <NavBar />
            {/* the navigation bar component */}

            {/* the choice section component */}
            <div className="signincomponent">
                <SigninTab />
            </div>
            {/* the choice section component */}

        </div>
    )
}
