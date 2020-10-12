import React from 'react';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';

import locationIcon from '../../assets/location.svg'

import profilePicture from '../../assets/potrait.jpg';

import './profilecard.scss';

const SERVICES = [
    'Business', 'Startup Advisory',
    'Startup Advisory',
    'Growth and customer Service'
]
export default function Profilecard() {
    return (
        <div class="profilecard_organisers">
            <div className="profilecard_organisers__actions">
                <img src={shareIcon} alt="share"/>
                <img src={ellipsisIcon} alt="ellipsis"/>
            </div>

            <div className="profilecard_organisers__maincontent">
                <div className="profilecard_organisers__maincontent__left">

                    <div className={`profilepicture_wrapper`}>
                        <img src={profilePicture} alt=""/>
                    </div>

                    <div className="profiletext_wrapper">
                        <div className="--name">Speakspire Agency Limited</div>
                        <div className="--specialty">
                            Conferences
                        </div>
                        <div className="--footer">
                            <div className="--contact">
                                contact me
                            </div>
                        </div>
                    </div>

                </div>


                <div className="profilecard_organisers__maincontent__right">

                    <div className="profilecard_organisers__maincontent__right__item">
                        <img className="--icon" src={locationIcon} alt="" />
                        <div className="--text">Lagos, Nigeria</div>
                    </div>
                    <div className="profilecard_organisers__maincontent__right__item">
                        <div className="services">
                            {
                                SERVICES.map((service)=>(
                                    <div className="service">
                                        {service}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
