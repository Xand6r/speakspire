import React from 'react';
import './event.scss';

import phoneWoman from '../../../../assets/phoneWoman.svg';
import GreenPlus from '../../../../assets/plus.svg';
import BlueUser from '../../../../assets/blueUser.svg';
import BlackMic from '../../../../assets/blackMicrophone.svg';
import smallPlus from '../../../../assets/smallPlus.svg';

const eventSteps = [
    ['Sign up as an organizer and add your events'],
    ['Get requests from our speakers'],
    ['Screen and select the best suited speakers for your event']
];

const upcomingEvents =[
    ['finance webinar','June 2nd'],
    ['business Summit','May 17th'],
    ['creativity Workshop','July 9th']
]

export default function Event() {
    return (
        <div>
            <div className="event">
                <div className="event__graphic">
                    <img src={phoneWoman} alt=""/>
                    <div className="event__graphic__floating_card">
                        <div className="--icons">
                            <div><img src={GreenPlus} alt=""/></div>
                            <div><img src={BlueUser} alt=""/></div>
                            <div><img src={BlackMic} alt=""/></div>
                        </div>
                        <div className="--card">
                            {
                                upcomingEvents.map((event,i)=>(
                                    <div className="--card-item" key={i}>
                                        <div className="--title">
                                            <img src={smallPlus} alt=""/>
                                            {event[0]}
                                        </div>
                                        <div className="date">
                                            {event[1]}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="event__text">
                    <div className="--header">
                        Let’s find the right speakers for your events
                    </div>
                    <div className="--subheader">
                    Find your speaker in a different way in 3 simple steps:
                    </div>
                    <div className="event__text__list_items">

                        {
                            eventSteps.map((item,i)=>(
                                <div className="--item" key={i}>
                                    <div className="--number">{i + 1}</div>
                                    <div className="--step">
                                        {item}
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="--button">
                        Add Event
                    </div>
                </div>
            </div>
        </div>
    )
}
