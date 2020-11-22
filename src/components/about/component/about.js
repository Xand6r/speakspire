import React from 'react';
import {component as NavBar} from '../../../utilities/navbar';
import {component as Contact} from '../../../utilities/contact';
import {component as Footer} from '../../../utilities/footer';
import FrontPage from '../subcomponents/frontpage';
import Catchphrase from '../subcomponents/catchphrase';
import DreamBone from '../subcomponents/wishbone';

import './about.scss';

export default function about() {
    return (
        <div className="about">

            {/* the navigation bar component */}
            <div className="--sticky">
                <NavBar />
            </div>
            {/* the navigation bar component */}
            
            {/* the catchy frontpage */}
            <FrontPage />
            {/* the catchy frontpage */}

            {/* the cattchphrase */}
            <Catchphrase />
            {/* the cattchphrase */}

            {/* landscape image of man smiling */}
            <div className="speaker_sample_image">
            </div>
            {/* landscape image of man smiling */}

            {/* wishbone section */}
            <DreamBone />
            {/* wishbone section */}

            {/* The contact section of the page */}
            <Contact />
            {/* The contact section of the page */}

            {/* The footer of the page */}
            <Footer />
            {/* The footer of the page */}
        </div>
    )
}
