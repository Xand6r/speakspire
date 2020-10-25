import React from 'react';
import PropTypes from 'prop-types';
import {component as Skill} from '../../skillTab';


import FooterIcons from '../assets/footerIcons.svg';
import playIcon from '../assets/playIcon.svg';
import profileIcon from '../assets/profileIcon.svg';
import like from '../assets/like.svg'

import nameplaceholder from '../assets/placeholders/nameplaceholder.svg'
import titleplaceholder from '../assets/placeholders/titleplaceholder.svg'
import dateintervalplaceholder from '../assets/placeholders/dateplaceholder.svg'
import skillplaceholder from '../assets/placeholders/skillplaceholder.svg'
import footerplaceholder from '../assets/placeholders/footerplaceholder.svg'
import profileplaceholder from '../assets/placeholders/profileplaceholder.svg'
import coverplaceholder from '../assets/placeholders/coverplaceholder.svg'

import './eventCard.scss';

const tempskills = [
    "business","leadership","management",
]


export default function EventCard({
    eventName, eventTitle,
    dateInterval, skillsList,
    pcs, coverimage, profileimage
}) {
    return (
        <div>
            <div className="eventcard">
                <div className={`eventcard__headerimage ${(profileimage === 'placeholder') && 'placeholder'}`}>
                    {
                        (profileimage !== 'placeholder') &&
                        <img src={profileimage} alt=""/>
                    }
                </div>

                <div className="eventcard__content">
                    <div className="eventcard__content__preheader">
                        <div className="faux_image">
                            <img src={coverimage} alt=""/>
                        </div>
                        <div className="eventcard__content__preheader__text">
                            {eventName || <img src={nameplaceholder} alt="place"/>}
                        </div>
                    </div>
                    <div className="eventcard__content__title">
                        {eventTitle || <img src={titleplaceholder} alt="place"/>}
                    </div>
                    <div className="eventcard__content__subtitle">
                        {dateInterval || <img src={dateintervalplaceholder} alt="place"/>}
                    </div>

                    <div className="eventcard__content__skills">
                        {
                            skillsList.slice(0,5).map((skill, i)=>(
                                <Skill name={skill}  key={i}  />
                            ))
                        }{
                            skillsList.length > 0 || <img src={skillplaceholder} alt="place"/>
                        }
                    </div>
                    <div className="eventcard__content__footer">
                        <div className="--left">
                            {/* <div className="--images">
                                <img src={profileIcon} alt=""/>
                                <img src={playIcon} alt=""/>
                            </div> */}
                            {
                                (pcs)?(
                                    <img src={FooterIcons} alt=""/>
                                ):(
                                    <img src={footerplaceholder} alt=""/>
                                )
                            }
                            
                        </div>
                        {/* <div className="--like">
                            <img src={like} alt=""/>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

EventCard.propTypes = {
    eventName: PropTypes.string,
    eventTitle: PropTypes.string,
    dateInterval: PropTypes.string,
    skillsList: PropTypes.array,
    pcs: PropTypes.string,
    coverimage: PropTypes.string,
    profileimage: PropTypes.string,
}

EventCard.defaultProps = {
    eventName : "",
    eventTitle: "",
    dateInterval: "",
    skillsList: [],
    pcs:"",
    coverimage: profileplaceholder,
    profileimage: 'placeholder'
}