import React from 'react';

import {component as NavBar} from '../../../utilities/navbar';

import ChoiceTab from './choiceTab';

import './category.scss';

export default function category() {
    return (
        <div className="category">
            {/* the navigation bar component */}
            <div className="--sticky">
                <NavBar />
            </div>
            {/* the navigation bar component */}
            
            {/* teh choice section component */}
            <div className="choicetabcomponent">
                <ChoiceTab />
            </div>
            {/* teh choice section component */}
        </div>
    )
}
