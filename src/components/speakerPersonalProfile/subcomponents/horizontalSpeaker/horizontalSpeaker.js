import React from 'react';
import {Tooltip} from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setFavoriteSpeakers } from '../../../../redux/userSlice';
import blueMic from '../../assets/blueMic.svg'

import like from '../../assets/like.svg';
import likedIcon from '../../../../utilities/speakerCard/assets/liked.svg';
import play from '../../assets/play.svg';
import profile from '../../assets/profile.svg';
import axios from '../../../../utilities/axios';


import './horizontalSpeaker.scss';
export default function HorizontalSpeaker({
    category, profilePicture, fullname,
    position, company, primary, id, preferences
}) {
    const physical = preferences && preferences[0]?.delivery_mode.includes('Physical');
    const virtual = preferences && preferences[0]?.delivery_mode.includes('Virtual');

    const dispatch=useDispatch();
    const history=useHistory();

    const { user } = useSelector((state) => state.user);
    const userState = useSelector(({ user }) => user);


	const userId = user.id;
	const favoriteSpeakers = user.favoriteSpeakers || [];

	const likedStatus = favoriteSpeakers.includes(id) || false;

	const addToFavorites = () => {
		const newArray = [...favoriteSpeakers, id];
		dispatch(setFavoriteSpeakers(newArray));
		makeRequest(newArray);
	};

	const removeFromFavorites = () => {
		const newArray = favoriteSpeakers.filter((data) => data !== id);
		dispatch(setFavoriteSpeakers(newArray));
		makeRequest(newArray);
	};

	const makeRequest = async (speakers) => {
		await axios.post(`/speakers/${userId}/favorites/speakers`, {
			favoriteSpeakers: JSON.stringify(speakers),
		});
	};

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
                        {
                            userState.loggedIn &&
                            <img
                                src={likedStatus? likedIcon : like}
                                onClick={(e) => {
                                            e.stopPropagation();
											likedStatus ? removeFromFavorites() : addToFavorites();
										}}
                                style={{ cursor: 'pointer' }}
                                alt=""
                            />
                        }
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
