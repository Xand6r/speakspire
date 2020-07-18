import React from 'react';
import './footer.scss';
import LogoIcon from '../../assets/LogoIcon.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import linkedin from '../../assets/linkedin.svg';

const COMPANY_ITEMS=[
    'FAQ','About Us','Blog','Privacy','Terms','Career'
];
const SPEKAER_ITEMS=[
    'Corporate Speakers','Celebrity Speakers','Blog', 
    'Privacy', 'Terms', 'Career'
];
const EVENT_ITEMS=[
    'Corporate Events','Celebrity Events','Blog', 
    'Privacy', 'Terms', 'Career'
];
const TOPIC_ITEMS=[
    'Health', 'Motivation', 'Social Wellbeing', 'Personal Development',
    'Fitness', 'Technology'
]
const TOPIC_TWO=[
    'Finance', 'Education', 'Agriculture',
    'Leadership', 'Business', 'Lifestyle'
];
const TOPIC_THREE=[
    'Digital Media', 'Family', 'Relationship',
    'Politics', 'Design & Art', 'Fashion'
];
const SOCIAL_MEDIA = [
    instagram, linkedin, twitter, facebook
];

export default function footer() {
    return (
        <div>
            <div className="footer">
                <div className="footer__text">
                    <div className="footer__text__section">
                        <div className="--header">
                            Company
                        </div>
                        <div className="--items">
                            {
                                COMPANY_ITEMS.map((item, i)=>(
                                    <div key={i} className="--item">
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__text__section">
                        <div className="--header">
                            Speakers
                        </div>
                        <div className="--items">
                            {
                                SPEKAER_ITEMS.map((item, i)=>(
                                    <div key={i} className="--item">
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__text__section">
                        <div className="--header">
                            Events
                        </div>
                        <div className="--items">
                            {
                                EVENT_ITEMS.map((item, i)=>(
                                    <div key={i} className="--item">
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="topics">
                        <div className="footer__text__section">
                            <div className="--header">
                                Topics
                            </div>
                            <div className="--items">
                                {
                                    TOPIC_ITEMS.map((item,i)=>(
                                        <div key={i} className="--item">
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="footer__text__section">
                            <div className="--header">
                                
                            </div>
                            <div className="--items">
                                {
                                    TOPIC_TWO.map((item,i)=>(
                                        <div key={i} className="--item">
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="footer__text__section">
                            <div className="--header">
                                
                            </div>
                            <div className="--items">
                                {
                                    TOPIC_THREE.map((item, i)=>(
                                        <div key={i} className="--item">
                                            {item}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <div className="footer__icons">
                    <hr className="divider"/>
                    <div className="footer__icons__media">
                        <div className="--right-reserved">
                            <img src={LogoIcon} alt=""/>
                            <span>
                            ©2020 Speakspire. All Rights Reserved
                            </span>
                        </div>
                        <div className="--social-media">
                            {
                                SOCIAL_MEDIA.map((item, i)=>(
                                    <img src={item} alt="" key={i}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
