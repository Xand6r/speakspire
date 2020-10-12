import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import {aboutEvent} from './constants';

import profileSample from '../../assets/instagram.svg'
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';

import {component as EventCard} from '../../../../utilities/eventCard';
import {component as SkillTab} from '../../../../utilities/skillTab';

import './profileContent.scss';
import bluePencilIcon from '../../assets/pencil.svg'

const { TabPane } = Tabs;
const SOCIAL_MEDIA_ICONS = [instagram,linkedin,twitter,facebook,web]

const EditIcon = () => (
    <div className="editicon">
        <img
            src={bluePencilIcon}
            alt=""
        />
    </div>
)

const More = () => (
    <div className="more">More...</div>
)

const SpeakingSkills = ({
    primaryTopic, primarySkills,
    secondaryTopic, secondarySkills
}) =>(
    <>
        {/* primary skills bar */}
    <div className="event_profilecontent__left__speaking__tab_content">
        <div className="tab_content_heading">PRIMARY</div>
        <div className="tab_content_subheading">{primaryTopic}</div>
        <div className="tab_content_content">
            {
                primarySkills.map(skill => (
                    <div className="skillitem">{skill}</div>
                ))
            }
        </div>
    </div>
    {/* secondary skills bar */}

    {/* primary skills bar */}
    <div className="event_profilecontent__left__speaking__tab_content">
        <div className="tab_content_heading">SECONDARY</div>
        <div className="tab_content_subheading">{secondaryTopic}</div>
        <div className="tab_content_content">
            {
                secondarySkills.map(skill => (
                    <div className="skillitem">{skill}</div>
                ))
            }
            <More />
        </div>
    </div>
    </>
);

export default function ProfileContent({
    about, primaryTopic, primarySkills,
    secondaryTopic, secondarySkills, bio
}) {
    return (
        <div class="event_profilecontent_wrapper">
            <div class="event_profilecontent">
                <div className="event_profilecontent__left">

                    <div className="event_profilecontent__left__reason">
                        <div className="--top_heading">
                            <span>About This Event</span>
                            <EditIcon />
                        </div>
                        <div className="--bottom_content">
                            {about}
                        </div>
                    </div>

                </div>
                <div className="event_profilecontent__right">
                    
                    <div className="event_profilecontent__right__bio">
                        <div className="--top_heading">
                            <span>Event Details</span>
                            <EditIcon />
                        </div>
                        <div className="--bottom_content">
                            <div className="--details_content">
                                <span> Conference </span>
                                <span> Single Day Event </span>
                            </div>
                            <div className="--details_details">
                                <div className="--details_details__item">
                                    <span> Topic Area </span>
                                    <div className="topicarea">
                                        Digital Media
                                    </div>
                                </div>
                                <div className="--details_details__item">
                                    <span> Event Tags </span>
                                    <div className="eventtags">
                                        {
                                            ['Business', "Leadership", "Management","Startup Advisory","Aquisitions"].map((skill)=>(
                                                <div className="eventtag">
                                                    {skill}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="event_profilecontent__right__media --tabs">
                        <Tabs
                            defaultActiveKey="1"
                            tabBarExtraContent={<EditIcon />}
                        >
                            {/* the tab to upload images */}
                            <TabPane tab="Photos" key="1">
                                <div className="image_tab_content">
                                    <img 
                                        src={profileSample}
                                        alt=""
                                    />
                                    <img
                                        src={profileSample}
                                        alt=""
                                    />
                                </div>
                                <div className="moreimages">
                                    <More />
                                </div>
                            </TabPane>
                            {/* the tab to upload images */}

                            <TabPane tab="Videos" key="2">
                                <div className="image_tab_content">
                                        <img 
                                            src={profileSample}
                                            alt=""
                                        />
                                        <img
                                            src={profileSample}
                                            alt=""
                                        />
                                    </div>
                                <div className="moreimages">
                                    <More />
                                </div>
                            </TabPane>

                            <TabPane tab="Presentation" key="3">
                            <div className="image_tab_content">
                                    <img 
                                        src={profileSample}
                                        alt=""
                                    />
                                    <img
                                        src={profileSample}
                                        alt=""
                                    />
                                </div>
                                <div className="moreimages">
                                    <More />
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
            <div className="event_profilecontent__bottom">
                <div className="--bottomtitle">
                    More Events from this Organizer 
                </div>
                <div className="--bottom__events">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>
            </div>
        <div/>
        </div>
    )
}

ProfileContent.propTypes = {
    about: PropTypes.string,
    primaryTopic: PropTypes.string,
    bio: PropTypes.string,
    
}

ProfileContent.defaultProps ={
    about: aboutEvent,
    primaryTopic: 'Career Development',
    primarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory'],
    secondaryTopic: 'Technology',
    secondarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory', 'Growth and Customer Service'],
    bio:"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data"
}
