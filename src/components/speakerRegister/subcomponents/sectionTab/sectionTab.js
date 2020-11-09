import React from 'react';
import PropTypes from 'prop-types';
import greenTick from '../../assets/greenTick.svg';
import './sectionTab.scss';

const SectionTab = ({
    index,
    text,
    active,
    changeTab,
    filled,
    error
}) => {
    return (
        <div 
            onClick={()=>{changeTab(index)}}
            className={`sectiontab ${(active)?'--selected':'--unselected'} ${error && '--error'}`}
        >
            <div
                className={`sectiontab__icon ${(!filled)? "unfilled":"filled"}`}
            >
                {
                    !filled ? index+1 : (
                        <img src={greenTick} alt="green" />
                    )
                }
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
    filled:PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
}

export default SectionTab
