import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './organiserCard.scss';
import {useHistory} from 'react-router-dom';

import {component as Skill} from '../../utilities/skillTab';

import locationIcon from '../speakerCard/assets/location.svg';
import playIcon from '../speakerCard/assets/playIcon.svg';
import profileIcon from '../speakerCard/assets/profileIcon.svg';
import positionPlaceholder from '../speakerCard/assets/placeholders/positionplaceholder.svg';
import bioPlaceholder from '../speakerCard/assets/placeholders/infoPlaceholder.svg';
import likeIcon from '../speakerCard/assets/like.svg';
import likedIcon from '../speakerCard/assets/liked.svg';
import shareIcon from '../speakerCard/assets/share.svg';

// import placeholders
import CoverPlaceholder from './assets/placeholdercover.svg';
import ProfilePlaceholder from './assets/placeholderprofile.svg';


const PLACEHOLDER_SKILLS = [
    "skillplaceholder", "skillplaceholder", 
    "skillplaceholder", "skillplaceholder", 
]

const RenderPlaceholder = (image) =>(
    <img src={image} alt=""/>
);

const state = "Lagos"
const country="Nigeria"
const about = "Join us on this journey. Find your tick! Discover a whole new world of fashion, relive art, recreate epic designs and let out your creative..."

const Preview = ({
    id, coverImage, profileImage,
    companyName, specialty, services,
    state, country, about, profile,
}) => {
    const history = useHistory();
    const [fav, setFav] = useState(false);

    return (
        <div
            className="organiser_preview"
        >
            <div className="organiser_preview__cover">
                <img
                    src={coverImage}
                    alt="a cover"
                />
            </div>
            <div className="organiser_preview__profile">
                <img
                    src={profileImage}
                    alt="a profile"
                />
            </div>
            <div className={`organiser_preview__title ${companyName?"":"--placeholder"}`}>
                {companyName}
            </div>
            <div className={`organiser_preview__specialty ${specialty?"":"--placeholder"}`}>
                {specialty}
            </div>
            <div className="organiser_preview__skills">
                {
                    //{/* display only the top 5 services */}
                    services.slice(0,2).map((skill,i)=>(
                        <Skill name={skill} key={i} />
                    ))
                }
            </div>

            <div className="organiser_preview__hoveritems">
                <div className="organiser_preview__hoveritems__about">
                    {about || RenderPlaceholder(bioPlaceholder)}
                </div>
                <div className="informationgroup">
                    <div>
                        <img src={locationIcon} alt=""/>
                    </div>
                    <span>
                        {state} {country && ","} {country}
                        {!(state || country) && RenderPlaceholder(positionPlaceholder)}
                    </span>
                </div>

                {
                    !profile && 
                    <div
                        className="organiser_preview__hoveritems__action"
                        onClick={
                            () => history.push(`/organiserprofile/${id}`)
                        }
                    >
                        View Organizer Details
                    </div>
                }
            </div>

            {
                !profile && 
                <>
                    <div className="organiser_preview__sideitems --right">
                        <img
                            src={fav ? likedIcon : likeIcon}
                            onClick={() => setFav(!fav)}
                            style={{cursor: "pointer"}}
                            alt=""
                        />
                        <img src={shareIcon} alt=""/>
                    </div>
                </>
            }
        </div> 
    )
}

Preview.propTypes = {
    id: PropTypes.number.isRequired,
    coverImage: PropTypes.string,
    profileImage: PropTypes.string,
    companyName: PropTypes.string,
    specialty: PropTypes.string,
    services: PropTypes.instanceOf(Array)
}

Preview.defaultProps = {
    coverImage: CoverPlaceholder,
    profileImage: ProfilePlaceholder,
    companyName: '',
    specialty: '',
    services: PLACEHOLDER_SKILLS
}

export default Preview
