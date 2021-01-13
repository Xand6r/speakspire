import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'

import './speakerCard.scss';
import {component as Skill} from '../../skillTab';
import placeholderIcon from '../assets/placeholderImage.svg'
import samplePicture from '../assets/samplepicture.svg';
import playIcon from '../assets/playIcon.svg';
import profileIcon from '../assets/profileIcon.svg';
import blueMic from '../assets/blueMic.svg';
import shareIcon from '../assets/share.svg';
import likeIcon from '../assets/like.svg';
import likedIcon from '../assets/liked.svg';
import planeIcon from '../assets/plane.svg';
import worldIcon from '../assets/world.svg';
import locationIcon from '../assets/location.svg';

// import placeholders

import fullnamePlaceHolder from '../assets/placeholders/nameplaceholder.svg';
import positionPlaceholder from '../assets/placeholders/positionplaceholder.svg';
import companyPlaceholder from '../assets/placeholders/companyplaceholder.svg';
import secondaryPlaceholder from '../assets/placeholders/secondaryplaceholder.svg';
import bioPlaceholder from '../assets/placeholders/bioPlaceholder.svg';


const PLACEHOLDER_SKILLS = [
    "skillplaceholder", "skillplaceholder", 
    "skillplaceholder", "skillplaceholder", 
]
const RenderPlaceholder = (image) =>(
    <img src={image} alt=""/>
);
export default function SpeakerCard({
    fullname, company, position, skills, image, tag,
    primary, secondary, id, bio,
    travelLocation, physical, virtual,
    state, country, languages, profile
}) {
    const [fav, setFav] = useState(false);

    const splitLanguage = (data) => {
		return data
			.replace(/['"]+/g, ' ')
			.replace(/['/[]+/g, '')
			.replace(/['/\]]+/g, '');
	};
    const history=useHistory();
    return (
        <div>
            <div className="speakercard">
                <div className={`speakercard__tag --${tag}`}>
                    {tag}
                </div>

                <div className="speakercard__profile">
                    <div className={`speakercard__profile__picturewrapper --${tag}wrapper`}>
                        <img src={image} alt="profile" className="pictureImage"/>
                    </div>
                    <div className="speakercard__profile__name">
                       {fullname.toLowerCase() || RenderPlaceholder(fullnamePlaceHolder)}
                    </div>
                    <div className="speakercard__profile__position">
                        <div className="--title">{position || RenderPlaceholder(positionPlaceholder)}</div>
                        <div className="--company">{company || RenderPlaceholder(companyPlaceholder)}</div>
                    </div>
                    <div className={`speakercard__profile__primary --${primary}`}>
                        <img src={blueMic} alt="bluemic"/>
                        <div className="--text_content">
                            {primary}
                        </div>
                    </div>
                    <div className="speakercard__profile__secondary">
                            {secondary || RenderPlaceholder(secondaryPlaceholder)}
                    </div>

                    <div className="speakercard__profile__skills">
                        {
                            skills.slice(0,3).map((skill,i)=>(
                                <Skill name={skill} key={i} />
                            ))
                        }
                    </div>
                    {
                        !profile && 
                        <>
                            <div className="speakercard__profile__sideitems --left">
                                {physical &&  <img src={profileIcon} alt=""/>}
                                {physical &&  <img src={playIcon} alt=""/>}
                            </div>
                            <div className="speakercard__profile__sideitems --right">
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

                <div className="speakercard__hoveritems">

                    <div className="speakercard__hoveritems__bio">
                        {bio || RenderPlaceholder(bioPlaceholder)}
                    </div>

                    <div className="speakercard__hoveritems__information">
                        <div className="informationgroup">
                            <div>
                                <img src={locationIcon} alt=""/>
                            </div>
                            <span>
                                {state} {country && ","} {country}
                                {!(state || country) && RenderPlaceholder(positionPlaceholder)}
                            </span>
                        </div>
                        <div className="informationgroup">
                            <div>
                                <img src={planeIcon} alt=""/>
                            </div>
                            <span>
                                {travelLocation || RenderPlaceholder(positionPlaceholder)}
                            </span>
                        </div>
                        <div className="informationgroup">
                            <div>
                                <img src={worldIcon} alt=""/>
                            </div>
                            <span>
                                {languages ? splitLanguage(languages) : RenderPlaceholder(positionPlaceholder)}
                            </span>
                        </div>
                    </div>
                    
                    {
                        !profile && (
                            <div
                                className="speakercard__hoveritems__action"
                                onClick={()=>history.push(`/speakers/${id}`)}
                            >
                                View Full Profile
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

SpeakerCard.propTypes= {
    id: PropTypes.number,
    fullname: PropTypes.string,
    company: PropTypes.string,
    position: PropTypes.string,
    skills: PropTypes.array,
    image: PropTypes.string,
    tag: PropTypes.string
}

SpeakerCard.defaultProps = {
    fullname: '',
    company: '',
    position: '',
    skills: PLACEHOLDER_SKILLS,
    image: placeholderIcon,
    tag: "tagplaceholder",
    primary: "primaryplaceholder",
    secondary: "",
    id:1
}
