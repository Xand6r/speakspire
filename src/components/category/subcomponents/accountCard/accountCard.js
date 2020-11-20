import React, {useState} from 'react';
import './accountCard.scss';

export default function AccountCard({
    index,
    icon,
    title,
    content,
    extraclass,
    active,
    stateChanger,
    activeIcon
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={()=>stateChanger(index)}
            className={`accountcard ${extraclass} ${active?"--active":""}`}
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
        > 
            <div className="accountcard__header">
                <img
                    src={ (hovered || active)? activeIcon: icon }
                    alt=""
                />
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
