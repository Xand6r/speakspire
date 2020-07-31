import React from 'react';
import PropTypes from 'prop-types';

import './speakerCard.scss';
import {component as Skill} from '../../skillTab';
import samplePicture from '../assets/samplepicture.svg';
import playIcon from '../assets/playIcon.svg';
import profileIcon from '../assets/profileIcon.svg';

const tempskills = [
    "business","leadership","management",
    "startup advisory","aquisitions"
]
export default function SpeakerCard({
    fullname, company, position, skills, image
}) {
    return (
        <div>
            <div className="speakercard">
                <div className="speakercard__tag --premium">
                    premium
                </div>

                <div className="speakercard__profile">
                    <div className="speakercard__profile__picturewrapper">
                        <img src={image} alt="profile" className="pictureImage"/>
                    </div>
                    <div className="speakercard__profile__name">
                       {fullname}
                    </div>
                    <div className="speakercard__profile__position">
                        <div className="--title">{position}</div>
                        <div className="--company">{company}</div>
                    </div>

                    <hr className="--divider"/>
                    <div className="speakercard__profile__skills">
                        {
                            skills.map((skill,i)=>(
                                <Skill name={skill} key={i} />
                            ))
                        }
                    </div>
                    <div className="speakercard__profile__footer">
                        <img src={profileIcon} alt=""/>
                        <img src={playIcon} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

SpeakerCard.propTypes= {
    fullname: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    skills: PropTypes.array,
    image: PropTypes.string
}

SpeakerCard.defaultProps = {
    fullname: 'Emeka Chukwuma',
    company: 'Emeks Enterprises',
    position: 'Chief Executive Officer',
    skills: tempskills,
    image: samplePicture
}
