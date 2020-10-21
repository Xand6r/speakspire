import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import HorizontalSpeaker from '../../subcomponents/horizontalSpeaker';
import profileSample from '../../assets/potrait.jpg';
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';

import './profileContent.scss';
import bluePencilIcon from '../../assets/pencil.svg';

const { TabPane } = Tabs;
const SOCIAL_MEDIA_ICONS = [instagram, linkedin, twitter, facebook, web];

const More = () => <div className='more'>More...</div>;

const SpeakingSkills = ({ primaryTopic, primarySkills, secondaryTopic, secondarySkills }) => (
	<>
		{/* primary skills bar */}
		<div className='profilecontent__left__speaking__tab_content'>
			<div className='tab_content_heading'>PRIMARY</div>
			<div className='tab_content_subheading'>{primaryTopic}</div>
			<div className='tab_content_content'>
				{primarySkills.map((skill) => (
					<div className='skillitem'>{skill}</div>
				))}
			</div>
		</div>
		{/* secondary skills bar */}

		{/* primary skills bar */}
		<div className='profilecontent__left__speaking__tab_content'>
			<div className='tab_content_heading'>SECONDARY</div>
			<div className='tab_content_subheading'>{secondaryTopic}</div>
			<div className='tab_content_content'>
				{secondarySkills.map((skill) => (
					<div className='skillitem'>{skill}</div>
				))}
				<More />
			</div>
		</div>
	</>
);

const filterData = (array, params) => {
	return array.filter((data) => data.category === params);
};

export default function ProfileContent({ reason, primaryTopic, primarySkills, secondaryTopic, secondarySkills, userData }) {
	
	const {
		expertise,
		bio, experience, education, certification, media, usp,
	} = userData;
	
	const speakers = useSelector(({speakers}) => speakers.data);
	const speakersList = speakers || [];
	return (
		<div class='profilecontent'>
			<div className='profilecontent__left'>
				<div className='profilecontent__left__reason'>
					<div className='--top_heading'>
						<span>Why Choose Me?</span>
					</div>
					<div className='--bottom_content'>{usp}</div>
				</div>

				{/* the section for the first tab */}
				<div className='profilecontent__left__speaking --tabs'>
					<Tabs defaultActiveKey='1'>
						{/* the tab to upload images */}
						<TabPane tab='Topic Areas' key='1'>
							{/* topic areas content */}
							<SpeakingSkills
								primaryTopic={expertise && expertise[0]?.primary_topic}
								primarySkills={expertise?JSON.parse(expertise[0]?.primary_tags || {}) : []}
								secondaryTopic={expertise &&expertise[0]?.secondary_topic}
								secondarySkills={expertise?JSON.parse(expertise[0]?.secondary_tags || {}): []}
							/>
							{/* topic areas content */}
						</TabPane>
						{/* the tab to upload images */}

						<TabPane tab='Past Talk' key='2'>
							{/* topic areas content */}
							<SpeakingSkills
								primaryTopic={primaryTopic}
								primarySkills={primarySkills}
								secondaryTopic={secondaryTopic}
								secondarySkills={secondarySkills}
							/>
							{/* topic areas content */}
						</TabPane>

						<TabPane tab='Publications' key='3'>
							{/* topic areas content */}
							<SpeakingSkills
								primaryTopic={primaryTopic}
								primarySkills={primarySkills}
								secondaryTopic={secondaryTopic}
								secondarySkills={secondarySkills}
							/>
							{/* topic areas content */}
						</TabPane>
					</Tabs>
				</div>
				{/* the section for the first tab */}

				<div className='profilecontent__left__socialmedia'>
					<div className='social_content'>
						<span>Social Media</span>
						{SOCIAL_MEDIA_ICONS.map((icon) => (
							<img src={icon} alt='social media' />
						))}
					</div>
				</div>

				{/* section for similar speakers */}
				<div className='profilecontent__left__similar'>
					<div className='similar_heading'> Similar Speakers</div>
					<div className='similar_speakers'>
						{
							speakersList.slice(1,2).map(speaker=>{
								const {
									name, experience:[{company, position}],profile_photo, id,
									expertise: [{primary_specialty,secondary_specialty, primary_tags }]
								} = speaker;
								return(
									<HorizontalSpeaker
										id={id}
										category='premium'
										profilePicture={profile_photo}
										fullname={name}
										position={position}
										company={company}
										primary={primary_specialty}
									/>
								)
							})
						}
					</div>
				</div>
				{/* section for similar speakers */}
			</div>
			<div className='profilecontent__right'>
				<div className='profilecontent__right__experiences --tabs'>
					<Tabs defaultActiveKey='1'>
						{/* the tab to upload images */}
						<TabPane tab='Position' key='1'>
							<div className='experience_tab_content'>
								{experience
									? experience.map(({ company, from, position, to }, index) => (
											<div className='past_experience' key={index}>
												<div className='past_experience__position'>{position}</div>
												<div className='past_experience__company'>{company}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}

								<div className='experience_more'>
									<More />
								</div>
							</div>
						</TabPane>
						{/* the tab to upload images */}

						<TabPane tab='Education' key='2'>
							<div className='experience_tab_content'>
								{education
									? education.map(({ institution, field_of_study, from, to }, index) => (
											<div className='past_experience'>
												<div className='past_experience__position'>{institution}</div>
												<div className='past_experience__company'>{field_of_study}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}

								<div className='experience_more'>
									<More />
								</div>
							</div>
						</TabPane>

						<TabPane tab='Certificates' key='3'>
							<div className='experience_tab_content'>
								{certification
									? certification.map(({ from, to, institution, proof, name }, index) => (
											<div className='past_experience'>
												<div className='past_experience__position'>{name}</div>
												<div className='past_experience__company'>{institution}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}
								<div className='experience_more'>
									<More />
								</div>
							</div>
						</TabPane>
					</Tabs>
				</div>

				<div className='profilecontent__right__bio'>
					<div className='--top_heading'>
						<span>Bio</span>
					</div>
					<div className='--bottom_content'>{bio}</div>
				</div>

				<div className='profilecontent__right__media --tabs'>
					<Tabs defaultActiveKey='1'>
						{/* the tab to upload images */}
						<TabPane tab='Photos' key='1'>
							{media
								? filterData(media, 'photo').map(({ link }, index) => (
										<div className='image_tab_content' key={index}>
											<img src={link} alt='' />
										</div>
								  ))
								: null}

							<div className='moreimages'>
								<More />
							</div>
						</TabPane>
						{/* the tab to upload images */}

						<TabPane tab='Videos' key='2'>
							{media
								? filterData(media, 'video').map(({ link }, index) => (
										<div className='image_tab_content' key={index}>
											<img src={link} alt='' />
										</div>
								  ))
								: null}
							<div className='moreimages'>
								<More />
							</div>
						</TabPane>

						<TabPane tab='Presentation' key='3'>
							{media
								? filterData(media, 'presentation').map(({ link }, index) => (
										<div className='image_tab_content' key={index}>
											<img src={link} alt='' />
										</div>
								  ))
								: null}
							<div className='moreimages'>
								<More />
							</div>
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

ProfileContent.propTypes = {
	reason: PropTypes.string,
	primaryTopic: PropTypes.string,
	bio: PropTypes.string,
};

ProfileContent.defaultProps = {
	reason:
		'I have served as a senior director in various capacities growing various companies and creating impact. I love sharing my experiences with unusual thinkers. ',
	primaryTopic: 'Career Development',
	primarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory'],
	secondaryTopic: 'Technology',
	secondarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory', 'Growth and Customer Service'],
	bio:
		"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data",
};
