import React from 'react';
import PropTypes from 'prop-types';
import './organiserCard.scss';

import {component as Skill} from '../../utilities/skillTab';

// import placeholders
import CoverPlaceholder from './assets/placeholdercover.svg';
import ProfilePlaceholder from './assets/placeholderprofile.svg';

const PLACEHOLDER_SKILLS = [
    "skillplaceholder", "skillplaceholder", 
    "skillplaceholder", "skillplaceholder", 
]

const preview = ({
    coverImage, profileImage,
    companyName, specialty, services
}) => {
    return (
        <div className="organiser_preview">
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
                    services.slice(0,5).map((skill,i)=>(
                        <Skill name={skill} key={i} />
                    ))
                }
            </div>
        </div> 
    )
}

preview.propTypes = {
    coverImage: PropTypes.string,
    profileImage: PropTypes.string,
    companyName: PropTypes.string,
    specialty: PropTypes.string,
    services: PropTypes.instanceOf(Array)
}

preview.defaultProps = {
    coverImage: CoverPlaceholder,
    profileImage: ProfilePlaceholder,
    companyName: '',
    specialty: '',
    services: PLACEHOLDER_SKILLS
}

export default preview
