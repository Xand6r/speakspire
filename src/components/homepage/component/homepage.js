import React from 'react';
import {component as NavBar} from '../../../utilities/navbar';
import {component as Header} from '../subcomponents/header';
import {component as SpeakerFilter} from '../subcomponents/filter_upper';
import {component as EventFilter} from '../subcomponents/filter_lower';
import {component as Vision} from '../subcomponents/vision';
import {component as Event} from '../subcomponents/event';
import './homepage.scss'

export default function homepage() {
    return (
        <div class="hompage">
            {/* the top navigation bar of the site */}
            <NavBar />
            {/* the top navigation bar of the site */}

            {/* The headver page of the webiste */}
            <Header />
            {/* The headver page of the webiste */}

            {/* The filter functionaity to search for a speaker */}
            <SpeakerFilter />
            {/* The filter functionaity to search for a speaker */}

            {/* The vision of speakspire */}
            <Vision />
            {/* The vision of speakspire */}

            {/* The filter functionality to search events */}
            <EventFilter />
            {/* The filter functionality to search events */}

            {/* The event section of the page */}
            <Event />
            {/* The event section of the page */}

        </div>
    )
}
