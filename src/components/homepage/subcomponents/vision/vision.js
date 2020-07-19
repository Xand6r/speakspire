import React from 'react';
import './vision.scss';
import SpeakerJoinUs from './joinus';

import WorldMap from './assets/world.svg';
import Face from './assets/face.svg';
import circleBig from './assets/circleBig.svg';
import circleMed from './assets/circleMed.svg';
import circleSmall from './assets/circleSmall.svg';


export default function vision() {
    return (
        <div>
            <div className="vision">

                <div className="vision__mission_statement">
                    <div className="vision__mission_statement__text">
                        <div className="--wrapper">
                            <div className="--heading">
                                Reigniting the world one speaker at a time
                            </div>
                            <div className="--subheading">
                                We are a community of speakers who aren’t just interested in showing up at events but showing up in people’s lives to inspire them to be better.
                                The world needs the inspiration to light up.   
                            </div>
                        </div>
                    </div>
                    <div className="vision__mission_statement__world">
                        <div className="--circles">
                            <div className="--auxilary_images">

                                <img src={circleBig} className="first" alt=""/>
                                <img src={circleMed} className="second" alt=""/>
                                <img src={circleSmall} className="third" alt=""/>

                            </div>
                            <img src={Face} alt=""/>
                        </div>
                        <div className="--axis"></div>
                        <img className="--world" src={WorldMap} alt="worldmap"/>
                    </div>
                </div>

                <SpeakerJoinUs />

            </div>
        </div>
    )
}
