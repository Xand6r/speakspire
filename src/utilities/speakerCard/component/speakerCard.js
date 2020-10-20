import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'

import './speakerCard.scss';
import {component as Skill} from '../../skillTab';
import placeholderIcon from '../assets/placeholderImage.svg'
import samplePicture from '../assets/samplepicture.svg';
import playIcon from '../assets/playIcon.svg';
import profileIcon from '../assets/profileIcon.svg';
import blueMic from '../assets/blueMic.svg';

// import placeholders

import fullnamePlaceHolder from '../assets/placeholders/nameplaceholder.svg';
import positionPlaceholder from '../assets/placeholders/positionplaceholder.svg';
import companyPlaceholder from '../assets/placeholders/companyplaceholder.svg';
import secondaryPlaceholder from '../assets/placeholders/secondaryplaceholder.svg';


const PLACEHOLDER_SKILLS = [
    "skillplaceholder", "skillplaceholder", 
    "skillplaceholder", "skillplaceholder", 
]
const RenderPlaceholder = (image) =>(
    <img src={image} alt=""/>
);
export default function SpeakerCard({
    fullname, company, position, skills, image, tag,
    primary, secondary, id
}) {
    const history=useHistory()
    return (
        <div
            onClick={()=>history.push(`/speakers/${id}`)}
        >
            <div className="speakercard">
                <div className={`speakercard__tag --${tag}`}>
                    {tag}
                </div>

                <div className="speakercard__profile">
                    <div className="speakercard__profile__picturewrapper">
                        <img src={image} alt="profile" className="pictureImage"/>
                    </div>
                    <div className="speakercard__profile__name">
                       {fullname || RenderPlaceholder(fullnamePlaceHolder)}
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
                            skills.map((skill,i)=>(
                                <Skill name={skill} key={i} />
                            ))
                        }
                    </div>
                    {/* <div className="speakercard__profile__footer">
                        <img src={profileIcon} alt=""/>
                        <img src={playIcon} alt=""/>
                    </div> */}
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
