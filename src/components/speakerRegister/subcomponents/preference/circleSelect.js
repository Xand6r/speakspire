import React from 'react'
import PropTypes from 'prop-types'

import './circleSelect.scss';
import circleTick from '../../assets/whiteTick.svg';

const circleSelect = ({
    text, active
}) => {
    return (
        <div className={`circleSelect ${active? "--active":""}`}>
            <div className="circleSelect__text">
                {text}
            </div>
            <div className="circleSelect__icon">
                {
                    (active)?<img src={circleTick} alt="white circle"/>: ""
                }
            </div>
        </div>
    )
}

circleSelect.propTypes = {
    text: PropTypes.string,
    active: PropTypes.bool
}

circleSelect.defaultProps = {
    text: "Global",
    active: true
}

export default circleSelect
