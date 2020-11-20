import React from 'react';

import {component as NavBar} from '../../../utilities/navbar';
import {component as Contact} from '../../../utilities/contact';
import {component as Footer} from '../../../utilities/footer';

import Banner from '../subcomponents/banner';
import Filter from '../subcomponents/filter';

import './favourites.scss';
export default function Favourites() {
    return (
        <div className="favourites">
            {/* the top navigation bar of the site */}
            <NavBar />
            {/* the top navigation bar of the site */}

            {/* the banner of the site */}
            <Banner />
            {/* the banner of the site */}

            {/* the filter of the site  */}
            <Filter />
            {/* the filter of the site  */}
            

            {/* the contact section of the page */}
            <Contact />
            {/* the contact section of the page */}

            {/* teh footer of the page */}
            <Footer />
            {/* teh footer of the page */}
        </div>
    )
}
