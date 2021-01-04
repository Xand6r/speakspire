import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import { Tabs, message, Upload, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import axios from '../../../../utilities/axios';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';
import Popup from '../../../../utilities/popup/index';
import UpdateEventDetails from '../../../../utilities/updates/eventDetailsUpdate';
import UpdateEventDescription from '../../../../utilities/updates/eventDescriptionUpdate';
import UpdateEventSpeaker from '../../../../utilities/updates/eventSpeakerUpdate';
import Delete from '../../../speakerPersonalProfile/assets/delete.svg';
import UploadImage from '../../../speakerPersonalProfile/assets/upload.svg';

import { component as EventCard } from '../../../../utilities/eventCard';
import { aboutEvent } from './constants';
import bluePencilIcon from '../../assets/pencil.svg';

import SpeakerCall from './speakerCall';

import './profileContent.scss';

const { TabPane } = Tabs;

const More = () => <div className='more'>More...</div>;

const splitData = (data) => {
	return data ? JSON.parse(data.split(',')) : [];
};

const filterData = (array, params) => {
	return array.filter((data) => data.category === params);
};

let parseNewDateFormat = (dateString) => {
	// datestring is of the form dd-mm-yy
	const splitDate = dateString.split('-');
	return moment(`20${splitDate[2]}, ${splitDate[1]}, ${splitDate[0]}`).format('Do MMM Y');
};

function parseTime(time) {
	let timeInt = time.split(':')[0];
	let minutes = time.split(':')[1];

	// you could then add or subtract time here as needed

	if (time > '12:00') {
		return `${timeInt - 12}:${minutes} PM`;
	} else {
		return `${timeInt}:${minutes} AM`;
	}
}

const whiteLoadingIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
const imageLoadingIcon = <LoadingOutlined style={{ fontSize: 20, color: '#4D75F4' }} spin />;
export default function ProfileContent({ isAdmin, refetch, userData }) {
	const { description, tags, topic_area, type, schedule, media, speakers=[], id } = userData;
	const eventState = useSelector(({events} )=> events);
	const userId = useSelector(({user}) => user.id);



	const [loading, setLoading] = useState(false);
	const [editField, setEditField] = useState(false);
	const [popupClosed, setClosePopup] = useState(true);
	const [mediaState, setMediaState] = useState([]);
	const [pictureLimit, setPictureLimit] = useState(2);
	const [videoLimit, setVideoLimit] = useState(2);
	const [presentationLimit, setPresentationLimit] = useState(2);
	const [mediaLoading, setMediaLoading] = useState(false);
	const [activeMediaTab, setActiveMediaTab] = useState({
		activeTab: 1,
		edit: false,
	});

	const saveMedia = () => {
		// logic about uploading images

		setLoading(true)
        axios.patch(`events/${id}/media`,{
			"organizer_id": `${userId}`,
			media: mediaState
        }).then((res) => {
            message.success("Details updated sucesfully!");
        }).catch((err) => {
            message.error("There was an error updating your event media!", err.response.data.message);
        }).finally(()=>{
			setActiveMediaTab({
				...activeMediaTab,
				edit: false
			});
	};

	const showMediaEditItems = (tab) => {
		return activeMediaTab.edit && `${activeMediaTab.activeTab}` === `${tab}`;
	};

	const AddMedia = (link, category) => {
		setMediaState([
			...mediaState,
			{
				link,
				category,
			},
		]);
	};

	const removeMedia = (link) => {
		setMediaState(mediaState.filter((ms) => ms.link !== link));
	};

	const cancelMedia = () => {
		setMediaState(media);
		setActiveMediaTab({
			...activeMediaTab,
			edit: false,
		});
	};

	useEffect(() => {
		setMediaState(media);
	}, [media]);

	const EditIcon = () =>
		isAdmin && (
			<div className='editicon'>
				<img src={bluePencilIcon} alt='' />
			</div>
		);

	const openEditPopup = (key) => {
		setEditField(key);
		setClosePopup(false);
	};

	const imageUploadProps = {
		name: 'file',
		onChange(info) {},
		beforeUpload: (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => AddMedia(res, 'photo'))
				.catch((err) => message.error('There was an error uploading this image, please try again later'))
				.finally(() => setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,
	};

	const videoProps = {
		name: 'file',
		onChange(info) {},
		beforeUpload: (file) => {
			const sizeInMb = file.size / 1000000;
			if (sizeInMb > 50) {
				message.error('Please upload a video file of less than 50MB');
				return;
			}
			const isMp4OrMkv = file.type === 'video/mp4' || file.type === 'video/x-matroska';
			if (!isMp4OrMkv) {
				message.error('You can only upload an MP4/MKV file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => AddMedia(res, 'video'))
				.catch((err) => message.error('There was an error uploading this image, please try again later'))
				.finally(() => setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,
	};

	const docsProps = {
		name: 'file',
		onChange(info) {},
		beforeUpload: (file) => {
			const sizeInMb = file.size / 1000000;
			if (sizeInMb > 50) {
				message.error('Please upload a video file of less than 50MB');
				return;
			}
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				message.error('You can only upload a PDF file!');
				return;
			}
			setMediaLoading(true);
			uploadImage(file)
				.then((res) => AddMedia(res, 'presentation'))
				.catch((err) => message.error('There was an error uploading this image, please try again later'))
				.finally(() => setMediaLoading(false));
			return false;
		},
		disabled: mediaLoading,
	};

	const componentUpdateMap = {
		details: (
			<UpdateEventDetails
				initialData={{
					type,
					topicArea: topic_area,
					tags,
				}}
				onClose={() => setClosePopup(true)}
				onSuccess={refetch}
				eventId={id}
			/>
		),
		about: (
			<UpdateEventDescription
				initialData={{
					description,
				}}
				onClose={() => setClosePopup(true)}
				onSuccess={refetch}
				eventId={id}
			/>
		),
		speakers: (
			<UpdateEventSpeaker
				initialData={{
					speakers,
				}}
				onClose={() => setClosePopup(true)}
				onSuccess={refetch}
				eventId={id}
			/>
		),
	};

	return (
		<>
			<Popup closed={popupClosed} Component={componentUpdateMap[editField]} onClose={() => setClosePopup(true)} />
			<div className='event_profilecontent_wrapper'>
				<div className='event_profilecontent'>
					<div className='event_profilecontent__left'>
						<div className='event_profilecontent__left__reason'>
							<div className='--top_heading'>
								<span>About This Event</span>
								<div onClick={() => openEditPopup('about')}>
									<EditIcon />
								</div>
							</div>
							<div className='--bottom_content'>{description}</div>
						</div>
					</div>

					<div className='event_profilecontent__right'>
						<div className='event_profilecontent__right__bio'>
							<div className='--top_heading'>
								<span>Event Details</span>
								<div onClick={() => openEditPopup('details')}>
									<EditIcon />
								</div>
							</div>
							<div className='--bottom_content'>
								<div className='--details_content'>
									<span> {type} </span>
									<span> {schedule ? schedule[0].frequency : null} </span>
								</div>

								<div className='--details_details'>
									<div className='--details_details__item'>
										<span> Topic Area </span>
										<div className='topicarea'>{topic_area}</div>
									</div>
									<div className='--details_details__item'>
										<span> Event Tags </span>
										<div className='eventtags'>
											{splitData(tags).map((tag, i) => (
												<div className='eventtag' key={i}>
													{tag}
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='event_profilecontent__right__speakers'>
							<div className='--top_heading'>
								<span>Call for Speakers</span>
								<div onClick={() => openEditPopup('speakers')}>
									<EditIcon />
								</div>
							</div>
							<div className='--bottom_content'>
								{speakers.map((oneSpeaker) => (
									<SpeakerCall oneSpeaker={oneSpeaker} />
								))}
							</div>
						</div>

						<div className='event_profilecontent__right__media --tabs'>
							<Tabs
								defaultActiveKey='1'
								onChange={(active) =>
									setActiveMediaTab({
										edit: false,
										activeTab: active,
									})
								}
								tabBarExtraContent={
									<div
										onClick={() => {
											setActiveMediaTab({
												...activeMediaTab,
												edit: !activeMediaTab.edit,
											});
										}}>
										<EditIcon />
									</div>
								}>
								{/* the tab to upload images */}
								<TabPane tab='Photos' key='1'>
									<div className='image_tab_content'>
										{mediaState
											? filterData(mediaState, 'photo')
													.slice(0, pictureLimit)
													.map(({ link }, index) => (
														<div key={index} className='media_wrapper'>
															<img className='show_media' src={link} alt='' />
															{showMediaEditItems(1) && <img className='delete_media' src={Delete} alt='' onClick={() => removeMedia(link)} />}
														</div>
													))
											: null}
									</div>
									<div className='moreimages'>
										{mediaState && filterData(mediaState, 'photo').length > pictureLimit && filterData(mediaState, 'photo').length > 2 && (
											<div onClick={() => setPictureLimit((lim) => lim + 2)}>
												{' '}
												<More />{' '}
											</div>
										)}
										{mediaState &&
											(filterData(mediaState, 'photo').length <= pictureLimit || pictureLimit > 2) &&
											filterData(mediaState, 'photo').length > 2 && (
												<div onClick={() => setPictureLimit((lim) => lim - 2)}>
													{' '}
													<More text='Less' />{' '}
												</div>
											)}
									</div>
									{showMediaEditItems(1) && (
										<div className='adminfooter'>
											<ImgCrop aspect='1.49'>
												<Upload {...imageUploadProps}>
													<div className='addmedia'>
														{mediaLoading ? (
															<Spin indicator={imageLoadingIcon} />
														) : (
															<>
																<img src={UploadImage} alt='' />
																Add Photo
															</>
														)}
													</div>
												</Upload>
											</ImgCrop>
											<div className='actiongroup'>
												<div className='cancel' onClick={cancelMedia}>
													cancel
												</div>
												<div className='save' onClick={saveMedia}>
													{loading ? <Spin indicator={whiteLoadingIcon} /> : 'Save'}
												</div>
											</div>
										</div>
									)}
								</TabPane>
								{/* the tab to upload images */}

								<TabPane tab='Videos' key='2'>
									<div className='image_tab_content'>
										{mediaState
											? filterData(mediaState, 'video')
													.slice(0, videoLimit)
													.map(({ link }, index) => (
														<div key={index} className='media_wrapper'>
															<video className='show_media' controls key={index}>
																<source src={link} type='video/mp4' />
																Your browser does not support the video tag.
															</video>
															{showMediaEditItems(2) && <img className='delete_media' src={Delete} alt='' onClick={() => removeMedia(link)} />}
														</div>
													))
											: null}
									</div>
									<div className='moreimages'>
										{mediaState && filterData(mediaState, 'video').length > videoLimit && filterData(mediaState, 'video').length > 2 && (
											<div onClick={() => setVideoLimit((lim) => lim + 2)}>
												{' '}
												<More />{' '}
											</div>
										)}
										{mediaState &&
											(filterData(mediaState, 'video').length <= videoLimit || videoLimit > 2) &&
											filterData(mediaState, 'video').length > 2 && (
												<div onClick={() => setVideoLimit((lim) => lim - 2)}>
													{' '}
													<More text='Less' />{' '}
												</div>
											)}
									</div>
									{showMediaEditItems(2) && (
										<div className='adminfooter'>
											<Upload {...videoProps}>
												<div className='addmedia'>
													{mediaLoading ? (
														<Spin indicator={imageLoadingIcon} />
													) : (
														<>
															<img src={UploadImage} alt='' />
															Add Video
														</>
													)}
												</div>
											</Upload>
											<div className='actiongroup'>
												<div className='cancel' onClick={cancelMedia}>
													cancel
												</div>
												<div className='save' onClick={saveMedia}>
													save
												</div>
											</div>
										</div>
									)}
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
										{mediaState &&
											filterData(mediaState, 'presentation').length > presentationLimit &&
											filterData(mediaState, 'presentation').length > 2 && (
												<div onClick={() => setPresentationLimit((lim) => lim + 2)}>
													{' '}
													<More />{' '}
												</div>
											)}
										{mediaState &&
											(filterData(mediaState, 'presentation').length <= presentationLimit || presentationLimit > 2) &&
											filterData(mediaState, 'presentation').length > 2 && (
												<div onClick={() => setPresentationLimit((lim) => lim - 2)}>
													{' '}
													<More text='Less' />{' '}
												</div>
											)}
									</div>
									{showMediaEditItems(3) && (
										<div className='adminfooter'>
											<Upload {...docsProps}>
												<div className='addmedia'>
													{mediaLoading ? (
														<Spin indicator={imageLoadingIcon} />
													) : (
														<>
															<img src={UploadImage} alt='' />
															Add Presentation
														</>
													)}
												</div>
											</Upload>
											<div className='actiongroup'>
												<div className='cancel' onClick={cancelMedia}>
													cancel
												</div>
												<div className='save' onClick={saveMedia}>
													save
												</div>
											</div>
										</div>
									)}
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
				<div className='event_profilecontent__bottom'>
					<div className='--bottomtitle'>More Events from this Organizer</div>
					<div className='--bottom__events'>
						{eventState.data.slice(0, 3).map((event) => {
							let tags = [];
							try {
								tags = JSON.parse(event.tags);
							} catch (err) {
								tags = [];
							}
							const fs = 'Do-MMM-YYY';
							const dateFrom = parseNewDateFormat(event.schedule[0].date.slice(0, 8));
							const dateTo = parseNewDateFormat(event.schedule[0].date.slice(9));
							const timeFrom = parseTime(event.schedule[0].time.split('-')[0]);
							const timeTo = parseTime(event.schedule[0].time.split('-')[1]);
							let dateInterval = '';
							if (event.schedule[0].frequency === 'Single-day Event') {
								dateInterval = `${dateFrom} ${timeFrom} WAT`;
							} else {
								dateInterval = `${dateFrom} - ${dateTo} ${timeFrom} WAT`;
							}
							return (
								<EventCard
									id={event.id}
									eventName={event.name}
									eventTitle={event.organizer}
									profileimage={event.banner}
									skillsList={tags}
									pcs={'pcs'}
									dateInterval={dateInterval}
								/>
							);
						})}
					</div>
				</div>
				<div />
			</div>
		</>
	);
}

ProfileContent.propTypes = {
	about: PropTypes.string,
	primaryTopic: PropTypes.string,
	bio: PropTypes.string,
};

ProfileContent.defaultProps = {
	about: aboutEvent,
	primaryTopic: 'Career Development',
	primarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory'],
	secondaryTopic: 'Technology',
	secondarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory', 'Growth and Customer Service'],
	bio:
		"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data",
};
