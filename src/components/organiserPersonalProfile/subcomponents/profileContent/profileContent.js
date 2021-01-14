import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Spin, Tabs, message, Upload } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import axios from '../../../../utilities/axios';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';
import Popup from '../../../../utilities/popup/index';
import UpdateBio from '../../../../utilities/updates/organiserBioUpdates';
import UpdateMedia from '../../../../utilities/updates/organierMediaUpdate';
import UpdateClients from '../../../../utilities/updates/organiserClientUpdate';
import UpdatePartners from '../../../../utilities/updates/organiserPartnerUpdate';
import OrganiserCard from '../../../../utilities/organiserCard';

import UploadImage from '../../assets/upload.svg'
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';
import Delete from '../../assets/delete.svg'

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
const More = ({text}) => <div className='more'>{text || 'More'}...</div>;
const imageLoadingIcon = <LoadingOutlined style={{fontSize: 20, color: '#4D75F4'}} spin />;
const whiteLoadingIcon = <LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />;
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
	const [pictureLimit, setPictureLimit] = useState(2);
	const [videoLimit, setVideoLimit] = useState(2);
	const [presentationLimit, setPresentationLimit] = useState(2);
	const [mediaState, setMediaState] = useState([]);
	const [mediaLoading, setMediaLoading] = useState(false);


	const organiserState = useSelector(({ organisers }) => organisers);
	const userID = useSelector(({user}) => user.id);
	
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
		clients: <UpdateClients
			initialData={{clients}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>,
		partners: <UpdatePartners
			initialData={{partners}}
			onClose={() => setClosePopup(true)}
			onSuccess={refetch}
		/>
	}
	const showMediaEditItems = (tab) => {
		return activeMediaTab.edit && `${activeMediaTab.activeTab}` === `${tab}`
	}
	const removeMedia = (link) => {
		setMediaState(
			mediaState.filter(ms => ms.link!==link)
		)
	}
	const AddMedia = (link, category) => {
		setMediaState([
			...mediaState,
			{
				link,
				category
			}
		]);
	}
	const EditIcon = () => (
		isAdmin &&
		<div className='editicon'>
			<img src={bluePencilIcon} alt='' />
		</div>
	);
	useEffect(() => {
		setMediaState(media);
	}, [media])

	const openEditPopup = (key) => {
		setEditField(key);
		setClosePopup(false);
	}

	const imageUploadProps = {
		name: 'file',
		onChange(info) {

		},
		beforeUpload: (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => 	AddMedia(res, "photo"))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,

	};
	const videoProps = {
		name: 'file',
		onChange(info) {

		},
		beforeUpload: (file) => {
			const sizeInMb = file.size/1000000;
			if(sizeInMb > 50){
				message.error("Please upload a video file of less than 50MB");
				return;
			}
			const isMp4OrMkv = file.type === 'video/mp4' || file.type === 'video/x-matroska';
			if (!isMp4OrMkv) {
				message.error('You can only upload an MP4/MKV file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => 	AddMedia(res, "video"))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,
	};
	
	const docsProps = {
		name: 'file',
		onChange(info) {

		},
		beforeUpload: (file) => {
            const sizeInMb = file.size/1000000;
			if(sizeInMb > 50){
				message.error("Please upload a video file of less than 50MB");
				return;
            }
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				message.error('You can only upload a PDF file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => AddMedia(res, "presentation"))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,
	};

	const saveMedia = () =>{
		// logic about uploading images

		setLoading(true)
        axios.patch(`/organizers/${userID}/media`,{
			media: mediaState
        }).then((res) => {
            message.success("Details updated sucesfully!");
        }).catch((err) => {
            message.error("There was an error updating user!", err.response.data.message);
        }).finally(()=>{
			setActiveMediaTab({
				...activeMediaTab,
				edit: false
			});
			setLoading(false);
        })
	}

	const cancelMedia = () =>{
		setMediaState(media);
		setActiveMediaTab({
		...activeMediaTab,
		edit: false
		})
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
							<Tabs
								defaultActiveKey='1'
								tabBarExtraContent={
									<div onClick={() => {
										setActiveMediaTab({
											...activeMediaTab,
											edit: !activeMediaTab.edit
										})
									}}>
										<EditIcon />
									</div>
								}
								onChange={(active) => setActiveMediaTab({
									edit: false,
									activeTab: active
								})}
							>
								{/* the tab to upload images */}
								<TabPane tab='Photos' key='1'>
									<div className='image_tab_content' >
										{mediaState
										? filterData(mediaState, 'photo').slice(0, pictureLimit).map(({ link }, index) => (
											<div  key={index} className="media_wrapper">
												<img className="show_media" src={link} alt='' />
												{
													showMediaEditItems(1) &&
													<img
														className="delete_media"
														src={Delete} alt=''
														onClick={() => removeMedia(link)}
													/>
												}
											</div>
										))
										: null}
									</div>
									<div className='moreimages'>
										{
											mediaState && filterData(mediaState, 'photo').length > pictureLimit && filterData(mediaState, 'photo').length > 2 && 
											<div onClick = {() => setPictureLimit(lim => lim +2)} > <More/> </div>
										}
										{
											mediaState && (filterData(mediaState, 'photo').length <= pictureLimit || pictureLimit > 2 ) && filterData(mediaState, 'photo').length > 2 && 
											<div onClick = {() => setPictureLimit(lim => lim - 2)} > <More text="Less"/> </div>
										}
									</div>
									{
									showMediaEditItems(1) &&
									<div className="adminfooter">
										<ImgCrop aspect='1.49' >
											<Upload {...imageUploadProps}>
												<div className="addmedia">
													{
													(mediaLoading)?
													<Spin indicator={imageLoadingIcon} /> :
														<>
															<img src={UploadImage} alt=""/>Add Photo
														</>
													}
												</div>
											</Upload>
										</ImgCrop>
										<div className="actiongroup">
											<div
												className="cancel"
												onClick={cancelMedia}
											>
												cancel
											</div>
											<div
												className="save"
												onClick={saveMedia}
											>
											{
												loading? <Spin indicator={whiteLoadingIcon} />
												: "Save"
											}
											</div>
										</div>
									</div>
								
								}
								</TabPane>
								{/* the tab to upload images */}

								<TabPane tab='Videos' key='2'>
									<div className='image_tab_content'>
										{
											mediaState
											? filterData(mediaState, 'video').slice(0, videoLimit).map(({ link }, index) => (
												<div  key={index} className="media_wrapper">
													<video className="show_media" controls  key={index}>
														<source src={link} type="video/mp4"/>
														Your browser does not support the video tag.
													</video>
													{
														showMediaEditItems(2) &&
														<img
															className="delete_media"
															src={Delete} alt=''
															onClick={() => removeMedia(link)}
														/>
													}
												</div>	
											))
											: null
										}
									</div>
									<div className='moreimages'>
										{
											mediaState && filterData(mediaState, 'video').length > videoLimit && filterData(mediaState, 'video').length > 2 && 
											<div onClick = {() => setVideoLimit(lim => lim +2)} > <More/> </div>
										}
										{
											mediaState && filterData(mediaState, 'video').length <= videoLimit && filterData(mediaState, 'video').length > 2 && 
											<div onClick = {() => setVideoLimit(lim => lim - 2)} > <More text="Less"/> </div>
										}
									</div>
									{
										showMediaEditItems(2) &&
										<div className="adminfooter">
											<Upload {...videoProps}>
												<div className="addmedia">
													{
													(mediaLoading)?
													<Spin indicator={imageLoadingIcon} /> :
														<>
															<img src={UploadImage} alt=""/>Add Video
														</>
													}
												</div>
												</Upload>
											<div className="actiongroup">
												<div
													className="cancel"
													onClick={cancelMedia}
												>
													cancel
												</div>
												<div
													className="save"
													onClick={saveMedia}
												>
													save
												</div>
											</div>
										</div>
									}
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
											state={organiser.state}
											country={organiser.country}
											about={organiser.bio}
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
