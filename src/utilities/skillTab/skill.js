import React from 'react';
import PropTypes from 'prop-types';

import './skill.scss';

export default function Skill({name}) {
    return (
        <div className={`skill --${name}`}>
            {name}
        </div>
    )
}

Skill.propTypes= {
    name: PropTypes.string,
}

Skill.defaultProps = {
    name: 'skillplaceholder',
}