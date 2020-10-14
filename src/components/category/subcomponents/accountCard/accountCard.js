import React from 'react';
import './accountCard.scss';

export default function accountCard({
    index,
    icon,
    title,
    content,
    extraclass,
    active,
    stateChanger
}) {
    return (
        <div
            onClick={()=>stateChanger(index)}
            className={`accountcard ${extraclass} ${active?"--active":""}`}
        > 
            <div className="accountcard__header">
                <img src={icon} alt=""/>
                <span>
                    {title}{active}
                </span>
            </div>
            <div className="accountcard__content">
                {content}
            </div>
        </div>
    )
}
