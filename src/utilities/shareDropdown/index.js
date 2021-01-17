import React from 'react';
import "./shareDropdown.scss";
import { message, Menu } from 'antd';
import { useSelector } from 'react-redux';

import ShareIcon from './assets/shareIcon.svg';
import {
    RenderInstagramIcon, RenderLinkedInIcon,
    RenderTwitterInIcon, RenderFacebookIcon
} from './svgs'


export default function ({closed, onClose, meta}) {
    const {id, profilePhoto} = meta;
    
    // const shareFacebook = () => {
    //     const facebookShareLink = profileUrl + '&picture=' + profilePhoto + '&description=descript';
    //     console.log(facebookShareLink);
    //     var fbpopup = window.open("https://www.facebook.com/sharer/sharer.php?u=" + facebookShareLink+ "?imageurl="+profilePhoto);
    //     return false;
    // }

    function shareFacebook(){
        const url = 'http://speakspire.com/speakers/18';//window.location.href;
        var img = profilePhoto; //Set Desired Image here
        var totalurl = encodeURIComponent(url+'?img='+img);
        
        window.open ('http://www.facebook.com/sharer.php?u='+totalurl,'','width=500, height=500, scrollbars=yes, resizable=no');
        
        }

    return (
        <div
            style={closed? {"display": "none"}: {"display":"flex"}}
            className="shareuser"
        >
            <Menu className = "navigation-dropdown">
                <div className="dropdown-header">
                    <div className="dropdown-content__image">
                        <img src={ShareIcon} alt=""/>
                    </div>
                    Share on:
                </div>
                <div className="dropdown-content">
                    <div className="dropdown-content__image">
                        <RenderInstagramIcon />
                    </div>
                    Instagram
                </div>
                <div className="dropdown-content">
                    <div className="dropdown-content__image">
                        <RenderLinkedInIcon />
                    </div>
                    LinkedIn
                </div>
                <div className="dropdown-content">
                    <div className="dropdown-content__image">
                        <RenderTwitterInIcon />
                    </div>
                    Twitter
                </div>
                <div
                    className="dropdown-content"
                    onClick={shareFacebook}
                >
                    <div className="dropdown-content__image">
                        <RenderFacebookIcon />
                    </div>
                    Facebook
                </div>
            </Menu>
        </div>
    )
}

