import React from 'react';
import {component as Skill} from '../../skillTab';

import playIcon from '../assets/playIcon.svg';
import profileIcon from '../assets/profileIcon.svg';
import FooterIcons from '../assets/footerIcons.svg';
import like from '../assets/like.svg'
import './eventCard.scss';

const tempskills = [
    "business","leadership","management",
]

export default function eventCard() {
    return (
        <div>
            <div className="eventcard">
                <div className="eventcard__headerimage">
                    <img src="" alt=""/>
                </div>

                <div className="eventcard__content">
                    <div className="eventcard__content__title">
                        Vodafone Fashion, Arts <br />
                        & Creativity Festival 2020
                    </div>
                    <div className="eventcard__content__subtitle">
                        20th - 23rd August, 2020
                    </div>

                    <hr className="divider"/>
                    <div className="eventcard__content__skills">
                    {
                            tempskills.map((skill, i)=>(
                                <Skill name={skill}  key={i}  />
                            ))
                        }
                    </div>
                    <div className="eventcard__content__footer">
                        <div className="--left">
                            <div className="--images">
                                <img src={profileIcon} alt=""/>
                                <img src={playIcon} alt=""/>
                            </div>
                            <img src={FooterIcons} alt=""/>
                        </div>
                        <div className="--like">
                            <img src={like} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
