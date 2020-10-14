import React from 'react';
import './frontpage.scss';

// images
import World from '../../assets/world.svg';

export default function frontpage() {
    return (
        <div className="frontpage">
            <div className="frontpage__textcontent">
                <div className="frontpage__textcontent__header">
                    Inspiration for a better world
                </div>
                <div className="frontpage__textcontent__subheader">
                    SPEAKSPIRE is an online platform for professional speakers of various specialties. We are building the largest community of first-class speakers in Nigeria and Africa. Our mission is to inspire a vibrant society by delivering the best speakers. This mission is inspired by our desire for people to live a truly inspired life.
                </div>
            </div>
            <div className="frontpage__imagecontent">
                <img
                    src={World}
                    alt=""
                />
            </div>
        </div>
    )
}
