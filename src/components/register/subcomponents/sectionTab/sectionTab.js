import React from 'react';
import PropTypes from 'prop-types';
import './sectionTab.scss';

const SectionTab = ({
    index,
    text,
    active,
    changeTab
}) => {
    return (
        <div 
            onClick={()=>{changeTab(index)}}
            className={`sectiontab ${(active)?'--selected':'--unselected'}`}
        >
            <div className="sectiontab__icon">
                {index+1}
            </div>
            <div className="sectiontab__text">
                {text}
            </div>
        </div>
    )
}

SectionTab.propTypes = {
    index:PropTypes.number.isRequired,
    text:PropTypes.string.isRequired,
    active:PropTypes.bool.isRequired,
    changeTab:PropTypes.func.isRequired,
}

export default SectionTab
