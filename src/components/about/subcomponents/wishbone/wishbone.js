import React from 'react';
import './wishbone.scss';

import WishBoneImage from '../../assets/wishbone.svg'

export default function Wishbone() {
    return (
        <div class="wishbone">
            <img
                className="wishbone__image"
                src={WishBoneImage}
                alt=""
            />
            <div className="wishbone__slogan">
                Live. Care. Inspire.
            </div>
            <div className="wishbone__text">
                Every product; every service we create is done with one goal in mind: to create a solution that inspires people and helps them live a better life. Right in the middle of that, the care we put in is evident. 
            </div>
        </div>
    )
}
