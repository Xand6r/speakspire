import React from 'react';

import {component as NavBar} from '../../../utilities/navbar';
import {component as EventsFilter} from '../subcomponents/event_filter';
import FindEvent from '../../homepage/subcomponents/event/event';
import {component as Contact } from '../../../utilities/contact';
import {component as Footer} from '../../../utilities/footer';
import './eventsspage.scss';

export default function EventsPage() {
    return (
        <div className="eventspage">
            {/* the top navigation bar of the site */}
            <NavBar className="navbar" />
            {/* the top navigation bar of the site */}

            {/* the speaker filter section of the site */}
            <EventsFilter />
            {/* the speaker filter section of the site */}

            {/* section alerting the speaker to join us */}
            <FindEvent />
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
