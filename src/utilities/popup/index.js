import React, {useState} from 'react'
import {message} from 'antd';

import "./popup.scss";
export default function Index({closed, onClose, Component}) {

    return (
        <div
            style={closed? {"display": "none"}: {"display":"flex"}}
            className="popupcontainer"
            onClick={onClose}
        >   
            <div onClick={(e) => e.stopPropagation()}>
                <Component />
            </div>
        </div>
    )
}
