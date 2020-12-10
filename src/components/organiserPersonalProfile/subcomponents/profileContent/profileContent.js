import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';

import Popup from '../../../../utilities/popup/index';
import UpdateBio from '../../../../utilities/updates/organiserBioUpdates';
import UpdateMedia from '../../../../utilities/updates/organierMediaUpdate';



import OrganiserCard from '../../../../utilities/organiserCard';
import HorizontalSpeaker from '../horizontalSpeaker';
import profileSample from '../../assets/potrait.jpg';
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';

import './profileContent.scss';
import bluePencilIcon from '../../assets/pencil.svg';
import splitData from '../utils/splitData';

const { TabPane } = Tabs;

const filterData = (array, params) => {
	return array.filter((data) => data.category === params);
};
const getLink = (allLinks, linkType) => {
	try{
		return (JSON.parse(allLinks) || []).find(oneLink => oneLink.includes(linkType))
	}catch(err){
		return ""
	}
}
const More = () => <div className='more'>More...</div>;

export default function ProfileContent({ userData, refetch, isAdmin }) {
	const { bio, clients, partners, media, links } = userData;
	const [loading, setLoading] = useState(false);
	const [popupClosed, setClosePopup] = useState(true);
	const [editField, setEditField] = useState(false);
	const [activeMediaTab, setActiveMediaTab] = useState({
		activeTab: 1,
		edit: false
	});
	const [activeClientTab, setActiveClientTab] = useState(1);

	const organiserState = useSelector(({ organisers }) => organisers);
	const SOCIAL_MEDIA_ICONS = [[instagram, getLink(links, 'instagram')], [linkedin, getLink(links, 'linkedin')], [twitter, getLink(links, 'twitter')], [facebook, getLink(links, 'facebook')], [web, getLink(links, 'www')]];

	const topicTalkEditTabs = ["","clients", "partners"];
	const componentUpdateMap = {
		about: <UpdateBio
			initialData={{bio}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>,
		socials: <UpdateMedia
			initialData={{links}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>,
		clients: <UpdateMedia
			initialData={{links}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>,
		partners: <UpdateMedia
			initialData={{links}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>
	}

	const EditIcon = () => (
		isAdmin &&
		<div className='editicon'>
			<img src={bluePencilIcon} alt='' />
		</div>
	);

	const openEditPopup = (key) => {
		setEditField(key);
		setClosePopup(false);
	}

	return (
		<>
			<Popup
				closed={popupClosed}
				Component={
					componentUpdateMap[editField]
				}
				onClose={
					() => setClosePopup(true)
				}
			/>
			<div className='profilecontent__organiser__wrapper'>
				<div className='profilecontent_organiser'>
					<div className='profilecontent_organiser__left'>
						<div className='profilecontent_organiser__left__reason'>
							<div className='--top_heading'>
								<span>About this Organisation</span>
								<div onClick = {() => openEditPopup('about')}>
									<EditIcon />
								</div>
							</div>
							<div className='--bottom_content'>{bio}</div>
						</div>

						<div className='profilecontent_organiser__left__socialmedia'>
							<div className='social_content'>
								<span>Social Media</span>
								{SOCIAL_MEDIA_ICONS.map(([icon, link], i) => (
									link &&
									<img src={icon} alt='social media' key={i} onClick={() => window.open(`http://${link}`,'_blank')} />
								))}
							</div>
							<div onClick = {() => openEditPopup('socials')}>
								<EditIcon />
							</div>
						</div>
					</div>
					<div className='profilecontent_organiser__right'>
						<div className='profilecontent_organiser__right__experiences --tabs'>
							<Tabs
								defaultActiveKey='1'
								tabBarExtraContent={
									<div onClick={
									() =>{
										openEditPopup(topicTalkEditTabs[activeClientTab])
									}
								}>
									<EditIcon />
								</div>
								}
								onChange={(active) => setActiveClientTab(active)}
								
							>
								{/* the tab to upload images */}
								<TabPane tab='Clients' key='1'>
									<div className='experience_tab_content'>
										<div className='experience_skills'>
											{splitData(clients).map((partner, i) => (
												<div className='experience_skill' key={i}>
													{partner}
												</div>
											))}
										</div>
									</div>
								</TabPane>
								{/* the tab to upload images */}

								<TabPane tab='Partners' key='2'>
									<div className='experience_tab_content'>
										<div className='experience_skills'>
											{splitData(partners).map((partner, i) => (
												<div className='experience_skill' key={i}>
													{partner}
												</div>
											))}
										</div>
									</div>
								</TabPane>
							</Tabs>
						</div>

						<div className='profilecontent_organiser__right__media --tabs'>
							<Tabs defaultActiveKey='1' tabBarExtraContent={<EditIcon />}>
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
													<video src={link} alt='' />
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
				<div className='profilecontent_organiser__bottom'>
					<div className='--bottomtitle'>Similar Organizers</div>
					<div className='--bottom__events'>
						{organiserState.data
							.slice(0, 4)
							.filter((o) => o.bio !== bio)
							.map((organiser, i) => {
								return (
									<div className='organisercard_wrapper' key={i}>
										<OrganiserCard
											id={organiser.id}
											coverImage={organiser.cover_photo}
											profileImage={organiser.profile_photo}
											companyName={organiser.name}
											specialty={organiser.specialty}
											services={JSON.parse(organiser.services)}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			
		</>
	);
}

ProfileContent.propTypes = {
	reason: PropTypes.string,
	primaryTopic: PropTypes.string,
	bio: PropTypes.string,
};

ProfileContent.defaultProps = {
	reason: `I have served as a senior director in various capacities growing various companies and creating impact. I love sharing my experiences with unusual thinkers.

    Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data `,
	primaryTopic: 'Career Development',
	primarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory'],
	secondaryTopic: 'Technology',
	secondarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory', 'Growth and Customer Service'],
	bio:
		"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data",
};
