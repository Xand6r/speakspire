import React, {useState} from 'react';
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

const getLink = (allLinks, linkType) => {
	console.log(allLinks)
	try{
		return (JSON.parse(allLinks) || []).find(oneLink => oneLink.includes(linkType))
	}catch(err){
		return ""
	}
}


const More = ({text}) => <div className='more'>{text || 'More'}...</div>;

const SpeakingSkills = ({ primaryTopic, primarySkills, secondaryTopic, secondarySkills }) => (
	<>
		{/* primary skills bar */}
		<div className='profilecontent__left__speaking__tab_content'>
			<div className='tab_content_heading'>PRIMARY</div>
			<div className='tab_content_subheading'>{primaryTopic}</div>
			<div className='tab_content_content'>
				{primarySkills.map((skill, i) => (
					<div className='skillitem' key={i}>
						{skill}
					</div>
				))}
				{/* <More /> */}
			</div>
		</div>
		{/* secondary skills bar */}

		{/* primary skills bar */}
		<div className='profilecontent__left__speaking__tab_content'>
			<div className='tab_content_heading'>SECONDARY</div>
			<div className='tab_content_subheading'>{secondaryTopic}</div>
			<div className='tab_content_content'>
				{secondarySkills.map((skill, i) => (
					<div className='skillitem' key={i}>
						{skill}
					</div>
				))}
				{/* <More /> */}
			</div>
		</div>
	</>
);

const filterData = (array, params) => {
	return array.filter((data) => data.category === params);
};

export default function ProfileContent({ primaryTopic, primarySkills, secondaryTopic, secondarySkills, userData, isAdmin }) {

	const [positionsLimit, setPositionsLimit] = useState(2);
	const [educationsLimit, setEducationsLimit] = useState(2);
	const [certificatesLimit, setcertificatesLimit] = useState(2);
	const [pictureLimit, setPictureLimit] = useState(2);
	const [videoLimit, setVideoLimit] = useState(2);
	const [presentationLimit, setPresentationLimit] = useState(2);


	const { expertise, bio, experience, education, certification, media, usp, links } = userData;
	const speakers = useSelector(({ speakers }) => speakers.data);
	const speakersList = speakers || [];

	const SOCIAL_MEDIA_ICONS = [[instagram, getLink(links, 'instagram')], [linkedin, getLink(links, 'linkedin')], [twitter, getLink(links, 'twitter')], [facebook, getLink(links, 'facebook')], [web, getLink(links, 'www')]];


	const EditIcon = () => (
		isAdmin &&
		<div className='editicon'>
			<img src={bluePencilIcon} alt='' />
		</div>
	);

	return (
		<div className='profilecontent'>
			<div className='profilecontent__left'>
				<div className='profilecontent__left__reason'>
					<div className='--top_heading'>
						<span>Why Choose Me?</span>
						<EditIcon />
					</div>
					<div className='--bottom_content'>{usp}</div>
				</div>

				{/* the section for the first tab */}
				<div className='profilecontent__left__speaking --tabs'>
					<Tabs defaultActiveKey='1' tabBarExtraContent={<EditIcon />} >
						{/* the tab to upload images */}
						<TabPane tab='Topic Areas' key='1'>
							{/* topic areas content */}
							<SpeakingSkills
								primaryTopic={expertise && expertise[0]?.primary_topic}
								primarySkills={expertise ? JSON.parse(expertise[0]?.primary_tags || {}) : []}
								secondaryTopic={expertise && expertise[0]?.secondary_topic}
								secondarySkills={expertise ? JSON.parse(expertise[0]?.secondary_tags || {}) : []}
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
						{SOCIAL_MEDIA_ICONS.map(([icon, link], i) => (
							link &&
							<img src={icon} alt='social media' key={i} onClick={() => window.open(`http://${link}`,'_blank')} />
						))}
					</div>
					<EditIcon />
				</div>

				{/* section for similar speakers */}
				<div className='profilecontent__left__similar'>
					<div className='similar_heading'> Similar Speakers</div>
					<div className='similar_speakers'>
						{speakersList.slice(1, 2).map((speaker, i) => {
							const {
								name,
								experience: [{ company, position }],
								profile_photo,
								id,
								expertise: [{ primary_specialty, secondary_specialty, primary_tags }],
							} = speaker;
							return (
								<HorizontalSpeaker
									id={id}
									key={i}
									category='premium'
									profilePicture={profile_photo}
									fullname={name}
									position={position}
									company={company}
									primary={primary_specialty}
								/>
							);
						})}
					</div>
				</div>
				{/* section for similar speakers */}
			</div>
			<div className='profilecontent__right'>
				<div className='profilecontent__right__experiences --tabs'>
					<Tabs defaultActiveKey='1' tabBarExtraContent={<EditIcon />}>
						{/* the tab to upload images */}
						<TabPane tab='Position' key='1'>
							<div className='experience_tab_content'>
								{experience
									? experience.slice(0,positionsLimit).map(({ company, from, position, to }, index) => (
											<div className='past_experience' key={index}>
												<div className='past_experience__position'>{position}</div>
												<div className='past_experience__company'>{company}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}

								<div className='experience_more'>
									{
										experience && experience.length > positionsLimit && experience.length > 2 && 
										<div onClick = {() => setPositionsLimit(lim => lim +2)} > <More/> </div>
									}
									{
										experience && experience.length <= positionsLimit && experience.length > 2 && 
										<div onClick = {() => setPositionsLimit(lim => lim - 2)} > <More text="Less"/> </div>
									}
								</div>
							</div>
						</TabPane>
						{/* the tab to upload images */}

						<TabPane tab='Education' key='2'>
							<div className='experience_tab_content'>
								{education
									? education.slice(0, educationsLimit).map(({ institution, field_of_study, from, to }, i) => (
											<div className='past_experience' key={i}>
												<div className='past_experience__position'>{institution}</div>
												<div className='past_experience__company'>{field_of_study}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}

								<div className='experience_more'>
									{
										education && education.length > educationsLimit && education.length > 2 && 
										<div onClick = {() => setEducationsLimit(lim => lim +2)} > <More/> </div>
									}
									{
										education && education.length <= educationsLimit && education.length > 2 && 
										<div onClick = {() => setEducationsLimit(lim => lim - 2)} > <More text="Less"/> </div>
									}
								</div>
							</div>
						</TabPane>

						<TabPane tab='Certificates' key='3'>
							<div className='experience_tab_content'>
								{certification
									? certification.slice(0, certificatesLimit).map(({ from, to, institution, proof, name }, i) => (
										institution &&
											<div className='past_experience' key={i}>
												<div className='past_experience__position'>{name}</div>
												<div className='past_experience__company'>{institution}</div>
												<div className='past_experience__date'>{`${from} - ${to}`}</div>
											</div>
									  ))
									: null}
								<div className='experience_more'>
								{
										certification && certification.length > certificatesLimit && certification.length > 2 && 
										<div onClick = {() => setcertificatesLimit(lim => lim +2)} > <More/> </div>
									}
									{
										certification && certification.length <= certificatesLimit && certification.length > 2 && 
										<div onClick = {() => setcertificatesLimit(lim => lim - 2)} > <More text="Less"/> </div>
									}
								</div>
							</div>
						</TabPane>
					</Tabs>
				</div>

				<div className='profilecontent__right__bio'>
					<div className='--top_heading'>
						<span>Bio</span>
						<EditIcon />
					</div>
					<div className='--bottom_content'>{bio}</div>
				</div>

				<div className='profilecontent__right__media --tabs'>
					<Tabs defaultActiveKey='1' tabBarExtraContent={<EditIcon />}>
						{/* the tab to upload images */}
						<TabPane tab='Photos' key='1'>
							<div className='image_tab_content'>
								{
									media
									? filterData(media, 'photo').slice(0, pictureLimit).map(({ link }, index) => (
												<img src={link} alt=''  key={index}/>
									))
									: null
								}
							</div>

							<div className='moreimages'>
								{
									media && filterData(media, 'photo').length > pictureLimit && filterData(media, 'photo').length > 2 && 
									<div onClick = {() => setPictureLimit(lim => lim +2)} > <More/> </div>
								}
								{
									media && filterData(media, 'photo').length <= pictureLimit && filterData(media, 'photo').length > 2 && 
									<div onClick = {() => setPictureLimit(lim => lim - 2)} > <More text="Less"/> </div>
								}
							</div>
						</TabPane>
						{/* the tab to upload images */}

						<TabPane tab='Videos' key='2'>
							<div className='image_tab_content'>
								{
									media
									? filterData(media, 'video').map(({ link }, index) => (
										<video controls  key={index}>
											<source src={link} type="video/mp4"/>
											Your browser does not support the video tag.
										</video>
												
									))
									: null
								}
							</div>
							<div className='moreimages'>
								{
									media && filterData(media, 'video').length > videoLimit && filterData(media, 'video').length > 2 && 
									<div onClick = {() => setVideoLimit(lim => lim +2)} > <More/> </div>
								}
								{
									media && filterData(media, 'video').length <= videoLimit && filterData(media, 'video').length > 2 && 
									<div onClick = {() => setVideoLimit(lim => lim - 2)} > <More text="Less"/> </div>
								}
							</div>
						</TabPane>

						<TabPane tab='Presentation' key='3'>
							<div className='image_tab_content'>
								{
									media
									? filterData(media, 'presentation').map(({ link }, index) => (
												<img src={link} alt=''  key={index} />
									))
									: null
								}
							</div>
							<div className='moreimages'>
							{
									media && filterData(media, 'presentation').length > presentationLimit && filterData(media, 'presentation').length > 2 && 
									<div onClick = {() => setPresentationLimit(lim => lim +2)} > <More/> </div>
								}
								{
									media && filterData(media, 'presentation').length <= presentationLimit && filterData(media, 'presentation').length > 2 && 
									<div onClick = {() => setPresentationLimit(lim => lim - 2)} > <More text="Less"/> </div>
								}
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
