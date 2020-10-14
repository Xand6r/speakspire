import React from 'react';

import {component as NavBar} from '../../../utilities/navbar';
import {component as SpeakerFilter} from '../subcomponents/speaker_filter';
import {SpeakerJoinUs} from '../../homepage/subcomponents/vision';
import {component as Contact } from '../../../utilities/contact';
import {component as Footer} from '../../../utilities/footer';
import './speakerspage.scss';

export default function speakerspage() {
    return (
        <div className="speakerspage">
            {/* the top navigation bar of the site */}
            <NavBar className="navbar" />
            {/* the top navigation bar of the site */}

            {/* the speaker filter section of the site */}
            <SpeakerFilter />
            {/* the speaker filter section of the site */}

            {/* section alerting the speaker to join us */}
            <SpeakerJoinUs />
            {/* section alerting the speaker to join us */}

            {/* contact section of the page */}
            <div className="contact">
                <Contact />
            </div>
            {/* contact section of the page */}
            <Footer />
            {/* footer section */}
        </div>
    )
}
