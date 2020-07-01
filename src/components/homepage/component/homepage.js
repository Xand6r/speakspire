import React from 'react';

import {component as NavBar} from '../../../utilities/navbar';
import {component as Header} from '../subcomponents/header';
import {component as Filter} from '../subcomponents/filter';

export default function homepage() {
    return (
        <div>
            {/* the top navigation bar of the site */}
            <NavBar />
            {/* the top navigation bar of the site */}

            {/* The headver page of the webiste */}
            <Header />
            {/* The headver page of the webiste */}

            {/* The filter functionaity to search for a speaker */}
            <Filter />
            {/* The filter functionaity to search for a speaker */}

        </div>
    )
}
