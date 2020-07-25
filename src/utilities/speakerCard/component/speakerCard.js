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
    fullname
}) {
    return (
        <div>
            <div className="speakercard">
                <div className="speakercard__tag --premium">
                    premium
                </div>

                <div className="speakercard__profile">
                    <div className="speakercard__profile__picturewrapper">
                        <img src={samplePicture} alt="profile" className="pictureImage"/>
                    </div>
                    <div className="speakercard__profile__name">
                       {fullname}
                    </div>
                    <div className="speakercard__profile__position">
                        <div className="--title">Chief Executive Officer</div>
                        <div className="--company">Emeks Enterprises</div>
                    </div>

                    <hr className="--divider"/>
                    <div className="speakercard__profile__skills">
                        {
                            tempskills.map((skill,i)=>(
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
    fullname: PropTypes.string
}

SpeakerCard.defaultProps = {
    fullname: 'Emeka Chukwuma'
}
