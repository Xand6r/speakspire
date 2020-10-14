import React from 'react';
import './horizontalSpeaker.scss';
import PropTypes from 'prop-types';

import blueMic from '../../assets/blueMic.svg'

import like from '../../assets/like.svg';
import play from '../../assets/play.svg';
import profile from '../../assets/profile.svg';

export default function HorizontalSpeaker({
    category, profilePicture, fullname,
    position, company, primary
}) {
    return (
        <div class="horizontalspeaker">
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
                        <img src={play} alt=""/>
                        <img src={profile} alt=""/>
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
