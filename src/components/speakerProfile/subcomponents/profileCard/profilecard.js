import React from 'react';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';
import profileIcon from '../../assets/playIcon.svg';
import playIcon from '../../assets/profileIcon.svg';
import blueMic from '../../assets/blueMic.svg'

import moneyIcon from '../../assets/money.svg';
import planeIcon from '../../assets/plane.svg';
import globeIcon from '../../assets/globe.svg';
import locationIcon from '../../assets/location.svg'

import profilePicture from '../../assets/potrait.jpg';

import './profilecard.scss';

const tag="premium"
export default function Profilecard() {
    return (
        <div class="profilecard">
            <div className={`profilecard__tag --${tag}`}>
                {tag}
            </div>
            <div className="profilecard__actions">
                <img src={shareIcon} alt="share"/>
                <img src={ellipsisIcon} alt="ellipsis"/>
            </div>

            <div className="profilecard__maincontent">
                <div className="profilecard__maincontent__left">

                    <div className={`profilepicture_wrapper --${tag}`}>
                        <img src={profilePicture} alt=""/>
                    </div>

                    <div className="profiletext_wrapper">
                        <div className="--name">Onyenaturuchi Alioha</div>
                        <div className="--qualifications">BSc, CFA, MSc</div>
                        <div className="--position">Chief Operating Officer</div>
                        <div className="--company">Emeks Enterprises</div>
                        <div className="--footer">
                            <div className="--contact">
                                contact me
                            </div>
                            <img src={profileIcon} alt=""/>
                            <img src={playIcon} alt=""/>
                        </div>
                    </div>

                </div>


                <div className="profilecard__maincontent__right">

                    <div className='profilecard__maincontent__right__primary'>
                        <img src={blueMic} alt="bluemic"/>
                        <div className="--text_content">
                            Public Speaker
                        </div>
                    </div>

                    <div className="profilecard__maincontent__right__item">
                        <img className="--icon" src={moneyIcon} alt="" />
                        <div className="--text">N100,000 - N650,000</div>
                    </div>

                    <div className="profilecard__maincontent__right__item">
                        <img className="--icon" src={locationIcon} alt="" />
                        <div className="--text">Lagos, Nigeria</div>
                    </div>

                    <div className="profilecard__maincontent__right__item">
                        <img className="--icon" src={planeIcon} alt="" />
                        <div className="--text">Global</div>
                    </div>

                    <div className="profilecard__maincontent__right__item">
                        <img className="--icon" src={globeIcon} alt="" />
                        <div className="--text">English, Chinese</div>
                    </div>


                </div>
            </div>
        </div>
    )
}