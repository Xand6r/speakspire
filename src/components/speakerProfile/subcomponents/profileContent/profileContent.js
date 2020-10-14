import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';



import HorizontalSpeaker from '../../subcomponents/horizontalSpeaker'
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

const SpeakingSkills = ({
    primaryTopic, primarySkills,
    secondaryTopic, secondarySkills
}) =>(
    <>
        {/* primary skills bar */}
    <div className="profilecontent__left__speaking__tab_content">
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
    <div className="profilecontent__left__speaking__tab_content">
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
        <div class="profilecontent">
            <div className="profilecontent__left">

                <div className="profilecontent__left__reason">
                    <div className="--top_heading">
                        <span>Why Choose Me?</span>
                        <EditIcon />
                    </div>
                    <div className="--bottom_content">
                        {reason}
                    </div>
                </div>

                {/* the section for the first tab */}
                <div className="profilecontent__left__speaking --tabs">
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={<EditIcon />}
                    >
                        {/* the tab to upload images */}
                        <TabPane tab="Topic Areas" key="1">
                            {/* topic areas content */}
                            <SpeakingSkills
                                primaryTopic = {primaryTopic}
                                primarySkills = {primarySkills}
                                secondaryTopic = {secondaryTopic}
                                secondarySkills = {secondarySkills}
                            />
                            {/* topic areas content */}
                        </TabPane>
                        {/* the tab to upload images */}

                        <TabPane tab="Past Talk" key="2">
                            {/* topic areas content */}
                            <SpeakingSkills
                                primaryTopic = {primaryTopic}
                                primarySkills = {primarySkills}
                                secondaryTopic = {secondaryTopic}
                                secondarySkills = {secondarySkills}
                            />
                            {/* topic areas content */}
                        </TabPane>

                        <TabPane tab="Publications" key="3">
                            {/* topic areas content */}
                            <SpeakingSkills
                                primaryTopic = {primaryTopic}
                                primarySkills = {primarySkills}
                                secondaryTopic = {secondaryTopic}
                                secondarySkills = {secondarySkills}
                            />
                            {/* topic areas content */}
                        </TabPane>
                    </Tabs>
                </div>
                {/* the section for the first tab */}

                <div className="profilecontent__left__socialmedia">
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

                {/* section for similar speakers */}
                <div className="profilecontent__left__similar">
                    <div className="similar_heading"> Similar Speakers</div>
                    <div className="similar_speakers">
                        <HorizontalSpeaker
                            category="premium"
                            profilePicture={profileSample}
                            fullname="Onyenaturuchi Alioha"
                            position="Chief Operating Officer"
                            company="Emeks Enterprises"
                            primary="public speaker"
                        />
                    </div>
                </div>
                {/* section for similar speakers */}
            </div>
            <div className="profilecontent__right">

                <div className="profilecontent__right__experiences --tabs">
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={<EditIcon />}
                    >
                        {/* the tab to upload images */}
                        <TabPane tab="Position" key="1">
                            <div className="experience_tab_content">
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        Chief Executive Officer
                                    </div>
                                    <div className="past_experience__company">
                                        Meks Nigeria Enterprises Limited 
                                    </div>
                                    <div className="past_experience__date">
                                        Jan 2017 - Present
                                    </div>
                                </div>
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        Chief Executive Officer
                                    </div>
                                    <div className="past_experience__company">
                                        Meks Nigeria Enterprises Limited 
                                    </div>
                                    <div className="past_experience__date">
                                        Jan 2017 - Present
                                    </div>
                                </div>
                                <div className="experience_more">
                                    <More />
                                </div>
                            </div>
                        </TabPane>
                        {/* the tab to upload images */}

                        <TabPane tab="Education" key="2">
                            <div className="experience_tab_content">
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        University of Nigeria, Nsukka
                                    </div>
                                    <div className="past_experience__company">
                                        Computer Engineering 
                                    </div>
                                    <div className="past_experience__date">
                                        June 2011 - August 2015
                                    </div>
                                </div>
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        University of Nigeria, Nsukka
                                    </div>
                                    <div className="past_experience__company">
                                        Computer Engineering 
                                    </div>
                                    <div className="past_experience__date">
                                        June 2011 - August 2015
                                    </div>
                                </div>
                                <div className="experience_more">
                                    <More />
                                </div>
                            </div>
                        </TabPane>

                        <TabPane tab="Certificates" key="3">
                            <div className="experience_tab_content">
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        HootSuite Advanced Social Media Strategy Certificate
                                    </div>
                                    <div className="past_experience__company">
                                        HootSuite Academy 
                                    </div>
                                    <div className="past_experience__date">
                                        May 2018 - November 2019
                                    </div>
                                </div>
                                <div className="past_experience">
                                    <div className="past_experience__position">
                                        HootSuite Advanced Social Media Strategy Certificate
                                    </div>
                                    <div className="past_experience__company">
                                        HootSuite Academy 
                                    </div>
                                    <div className="past_experience__date">
                                        May 2018 - November 2019
                                    </div>
                                </div>
                                <div className="experience_more">
                                    <More />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                
                <div className="profilecontent__right__bio">
                    <div className="--top_heading">
                        <span>Bio</span>
                        <EditIcon />
                    </div>
                    <div className="--bottom_content">
                        {bio}
                    </div>
                </div>
            
                <div className="profilecontent__right__media --tabs">
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
    )
}

ProfileContent.propTypes = {
    reason: PropTypes.string,
    primaryTopic: PropTypes.string,
    bio: PropTypes.string,
    
}

ProfileContent.defaultProps ={
    reason: "I have served as a senior director in various capacities growing various companies and creating impact. I love sharing my experiences with unusual thinkers. ",
    primaryTopic: 'Career Development',
    primarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory'],
    secondaryTopic: 'Technology',
    secondarySkills: ['Business', 'Startup Advisory','Growth and Customer Service','Startup Advisory', 'Growth and Customer Service'],
    bio:"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data"
}
