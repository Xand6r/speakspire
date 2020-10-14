import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import OrganiserCard from '../../../../utilities/organiserCard'
import HorizontalSpeaker from '../horizontalSpeaker'
import profileSample from '../../assets/potrait.jpg'
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';


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

const PARTNERS = [
    'GTBank', "Creffiti Consults Limited",
    "Speakspire Agency", 'GTBank', "Speakspire Agency",
    "Creffiti Consults Limited"
]

const SpeakingSkills = ({
    primaryTopic, primarySkills,
    secondaryTopic, secondarySkills
}) =>(
    <>
        {/* primary skills bar */}
    <div className="profilecontent_organiser__left__speaking__tab_content">
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
    <div className="profilecontent_organiser__left__speaking__tab_content">
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
    reason, primaryTopic, primarySkills,
    secondaryTopic, secondarySkills, bio
}) {
    return (
        <div className="profilecontent__organiser__wrapper">
            <div class="profilecontent_organiser">
                <div className="profilecontent_organiser__left">

                    <div className="profilecontent_organiser__left__reason">
                        <div className="--top_heading">
                            <span>About this Organisation</span>
                            <EditIcon />
                        </div>
                        <div className="--bottom_content">
                            {reason}
                        </div>
                    </div>


                    <div className="profilecontent_organiser__left__socialmedia">
                        <div className="social_content">
                            <span>Social Media</span>
                            {
                                SOCIAL_MEDIA_ICONS.map(icon => (
                                    <img src={icon} alt="social media"/>
                                ))
                            }
                        </div>
                        <EditIcon />
                    </div>
                </div>
                <div className="profilecontent_organiser__right">

                    <div className="profilecontent_organiser__right__experiences --tabs">
                        <Tabs
                            defaultActiveKey="1"
                            tabBarExtraContent={<EditIcon />}
                        >
                            {/* the tab to upload images */}
                            <TabPane tab="Clients" key="1">
                                <div className="experience_tab_content">
                                    <div className="experience_skills">
                                        {
                                            PARTNERS.map((partner)=>(
                                                <div className="experience_skill">
                                                    {partner}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="experience_more">
                                        <More />
                                    </div>
                                </div>
                            </TabPane>
                            {/* the tab to upload images */}

                            <TabPane tab="Partners" key="2">
                                <div className="experience_tab_content">
                                
                                    <div className="experience_skills">
                                        {
                                            PARTNERS.map((partner)=>(
                                                <div className="experience_skill">
                                                    {partner}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="experience_more">
                                        <More />
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    
                
                    <div className="profilecontent_organiser__right__media --tabs">
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
            <div className="profilecontent_organiser__bottom">
                <div className="--bottomtitle">
                    Similar Organizers
                </div>
                <div className="--bottom__events">
                    <OrganiserCard />
                    <OrganiserCard />
                    <OrganiserCard />
                    <OrganiserCard />
                </div>
            </div>
        </div>
    )
}

ProfileContent.propTypes = {
    reason: PropTypes.string,
    primaryTopic: PropTypes.string,
    bio: PropTypes.string,
    
}

ProfileContent.defaultProps ={
    reason: `I have served as a senior director in various capacities growing various companies and creating impact. I love sharing my experiences with unusual thinkers.

    Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data `,
    primaryTopic: 'Career Development',
    primarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory'],
    secondaryTopic: 'Technology',
    secondarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory', 'Growth and Customer Service'],
    bio:"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data"
}
