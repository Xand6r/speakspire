import React from 'react';
import './accountCard.scss';

export default function accountCard({
    icon,
    title,
    content,
    extraclass
}) {
    return (
        <div className={`accountcard ${extraclass}`}> 
            <div className="accountcard__header">
                <img src={icon} alt=""/>
                <span>
                    {title}
                </span>
            </div>
            <div className="accountcard__content">
                {content}
            </div>
        </div>
    )
}
