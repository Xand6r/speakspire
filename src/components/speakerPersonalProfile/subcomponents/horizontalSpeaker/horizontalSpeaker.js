import React from 'react';
import { useHistory } from 'react-router-dom'
import './horizontalSpeaker.scss';
import PropTypes from 'prop-types';

import blueMic from '../../assets/blueMic.svg'

import like from '../../assets/like.svg';
import play from '../../assets/play.svg';
import profile from '../../assets/profile.svg';
import {Tooltip} from 'antd';

export default function HorizontalSpeaker({
    category, profilePicture, fullname,
    position, company, primary, id, preferences
}) {
    const physical = preferences && preferences[0]?.delivery_mode.includes('Physical');
	const virtual = preferences && preferences[0]?.delivery_mode.includes('Virtual');
    const history=useHistory();
    return (
        <div 
        className="horizontalspeaker"
            onClick={()=>history.push(`/speakers/${id}`)}
        >
            <img
                className={`profilepicture --${category}`}
                src={profilePicture}
                alt=""
            />
            <div className="horizontalspeaker__details">
                <div className="horizontalspeaker__details__fullname">{fullname}</div>
                <div className="horizontalspeaker__details__position">{position}</div>
                <div className="horizontalspeaker__details__company">{company}</div>
                <div className="footer_group">
                    <div className="horizontalspeaker__details__primary">
                        <img src={blueMic} alt=""/>
                        {primary}
                    </div>

                    <div className="icongroup">
                        <img src={like} alt=""/>
                        {physical &&
                            <Tooltip title="Available for physical events">
                                <img src={profile} alt=""/>
                            </Tooltip>
                        }
                        {virtual &&
                            <Tooltip title="Available for virtual events">
                                <img src={play} alt=""/>
                            </Tooltip>
                        }
                    </div>

                </div>
            </div>

            <div
                className={`speakertypetag --${category}`}
            >
                {category}
            </div>

            <div className="icons">

            </div>
        </div>
    )
}

HorizontalSpeaker.propTypes = {
    category: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired
}
