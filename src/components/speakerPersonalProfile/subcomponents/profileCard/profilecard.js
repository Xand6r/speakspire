import ImgCrop from 'antd-img-crop';
import { Spin, message, Upload, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';

import UpdateProfile from '../../../../utilities/updates/speakerProfileUpdates';
import { LoadingOutlined } from '@ant-design/icons';
import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';
import profileIcon from '../../assets/playIcon.svg';
import playIcon from '../../assets/profileIcon.svg';
import blueMic from '../../assets/blueMic.svg';
import imageOverlay from '../../assets/overlay.svg';
import moneyIcon from '../../assets/money.svg';
import planeIcon from '../../assets/plane.svg';
import globeIcon from '../../assets/globe.svg';
import locationIcon from '../../assets/location.svg';
import greyPencil from '../../assets/greyPencil.svg';
import { formatPrice, getPrice } from './utils';

import Popup from '../../../../utilities/popup/index';
import ContactMe from '../../../../utilities/contactMethods';
import ShareMe from '../../../../utilities/shareDropdown';
import uploadImage, { uploadSpeakerCover } from '../../../../utilities/generalUtils/uploadImage';
import { classifySpeaker } from '../../../../utilities/utils';

import './profilecard.scss';

const props = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};
const antIcon = <LoadingOutlined style={{ fontSize: 46, color: '#F1F3F9' }} spin />;

export default function Profilecard({ userData, isAdmin, refetch }) {
	const [userContacts, setUserContacts] = useState({});
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imageLink, setImageLink] = useState(null);
	const [hideShare, setHideShare] = useState(true);
	const [hideContacts, setHideContacts] = useState(true);

	const [popupClosed, setClosePopup] = useState(false);

	const {
		id,
		profile_photo,
		name,
		highest_level_of_education,
		experience,
		expertise,
		languages,
		phone,
		email,
		state,
		country,
		contact = [],
		preferences,
		price = '1000 - 300000$naira',
		years_of_experience = '0-2 years',
		number_of_engagements = '0-10 engagements',
	} = userData;

	const tag = classifySpeaker(number_of_engagements, years_of_experience, languages);
	console.log(tag);

	useEffect(() => {
		if (userData) {
			setImageLink(userData.profile_photo);
		}
	}, [userData]);
	const splitLanguage = (data) => {
		return data
			.replace(/['"]+/g, ' ')
			.replace(/['/[]+/g, '')
			.replace(/['/\]]+/g, '');
	};

	const arrayJsonParse = (jsonstring, array) => {
		try {
			const parsed = JSON.parse(jsonstring);
			return parsed;
		} catch (err) {
			return array ? [] : {};
		}
	};

	const travelLocation = preferences ? arrayJsonParse(preferences[0]?.travel)[0] : 'Nigeria';
	const physical = preferences && preferences[0]?.delivery_mode.includes('Physical');
	const virtual = preferences && preferences[0]?.delivery_mode.includes('Virtual');

	window.addEventListener('click', (e) => {
		setHideContacts(true);
		setHideShare(true);
	});

	const EditIcon = () =>
		isAdmin && (
			<div className='editicon'>
				<img src={greyPencil} alt='' />
			</div>
		);

	useEffect(() => {
		contact.forEach((oneContact) => {
			setUserContacts(oneContact);
		});
	}, [contact]);

	return (
		<>
			<Popup
				closed={popupClosed}
				Component={
					<UpdateProfile
						initialData={{ name, phone, email, price: getPrice(price), state, country }}
						onClose={() => setClosePopup(true)}
						onSuccess={refetch}
					/>
				}
				onClose={() => setClosePopup(true)}
			/>
			<div className='profilecard'>
				<div className={`profilecard__tag --${tag}`}>{tag}</div>
				<div className='profilecard__actions'>
					<div style={{ marginRight: '10px' }} onClick={() => setClosePopup(false)}>
						<EditIcon />
					</div>
					<div style={{ display: 'flex' }}>
						<img
							onClick={(e) => {
								e.stopPropagation();
								setHideShare(!hideShare);
							}}
							src={shareIcon}
							alt='share'
						/>
						<ShareMe
							closed={hideShare}
							onClose={(e) => {
								e.stopPropagation();
								setHideShare(true);
							}}
						/>
					</div>
				</div>

				<div className='profilecard__maincontent'>
					<div className='profilecard__maincontent__left'>
						<div className={`profilepicture_wrapper --${tag}`}>
							<img src={imageLink} alt='' />

							{isAdmin && (
								<ImgCrop shape='round'>
									<Upload
										{...props}
										beforeUpload={(file) => {
											const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
											if (!isJpgOrPng) {
												message.error('You can only upload JPG/PNG file!');
												return;
											}
											if (uploadLoading) {
												message.error('Still Uploading one image!');
											}
											setUploadLoading(true);
											uploadSpeakerCover(file, id)
												.then((res) => {
													setImageLink(res);
													refetch();
												})
												.catch((err) => message.error('There was an error uploading image'))
												.finally(() => {
													setUploadLoading(false);
												});
											return false;
										}}>
										<div className='profilepicture_wrapper__overlay'>
											{!uploadLoading ? <img src={imageOverlay} alt='' /> : <Spin indicator={antIcon} />}
										</div>
									</Upload>
								</ImgCrop>
							)}
						</div>

						<div className='profiletext_wrapper'>
							<div className='--name'>{(name || '').toLowerCase()}</div>
							<div className='--qualifications'>{highest_level_of_education}</div>
							<div className='--position'>{experience ? experience[0]?.position : null}</div>
							<div className='--company'>{experience ? experience[0]?.company : null}</div>
							<div className='--footer'>
								<div
									className='--contact'
									onClick={(e) => {
										e.stopPropagation();
										setHideContacts(!hideContacts);
									}}>
									contact me
								</div>
								{physical && (
									<Tooltip title='Available for physical events'>
										<img src={profileIcon} alt='' />
									</Tooltip>
								)}
								{virtual && (
									<Tooltip title='Available for virtual events'>
										<img src={playIcon} alt='' />
									</Tooltip>
								)}
								<ContactMe
									closed={hideContacts}
									contacts={userContacts}
									onClose={(e) => {
										e.stopPropagation();
										setHideContacts(true);
									}}
								/>
							</div>
						</div>
					</div>

					<div className='profilecard__maincontent__right'>
						<div className='profilecard__maincontent__right__primary'>
							<img src={blueMic} alt='bluemic' />
							<div className='--text_content'>{expertise ? expertise[0].primary_specialty : null}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon'>
								{' '}
								<img src={moneyIcon} alt='' />{' '}
							</div>
							<div className='--text'>{getPrice(price)}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon'>
								{' '}
								<img src={locationIcon} alt='' />{' '}
							</div>
							<div className='--text'>{`${state}, ${country}`}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon'>
								{' '}
								<img src={planeIcon} alt='' />{' '}
							</div>
							<div className='--text'>{travelLocation || 'N/A'}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon'>
								{' '}
								<img src={globeIcon} alt='' />{' '}
							</div>
							<div className='--text'>{languages ? splitLanguage(languages) : null}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
