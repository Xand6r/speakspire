import ImgCrop from 'antd-img-crop';
import {Spin, message, Upload} from 'antd';
import React, {useState, useEffect} from 'react';

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

import Popup from '../../../../utilities/popup/index';
import ContactMe from '../../../../utilities/contactMethods';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

import './profilecard.scss';

const tag = 'premium';

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
const antIcon = <LoadingOutlined style={{fontSize: 46, color: '#F1F3F9'}} spin />;


export default function Profilecard({ userData, isAdmin }) {
	const [userContacts, setUserContacts] = useState({});
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imageLink, setImageLink] = useState(null);

	const [popupClosed, setClosePopup] = useState(true);

	const {
		profile_photo, name, highest_level_of_education, experience, expertise, languages,
		state, country, contact = [], preferences, price = "1000 - 300000$naira"
	} = userData;
	const [hideContacts, setHideContacts] = useState(true);
	const splitLanguage = (data) => {
		return data
			.replace(/['"]+/g, ' ')
			.replace(/['/[]+/g, '')
			.replace(/['/\]]+/g, '');
	};
	const travelLocation = preferences?JSON.parse(preferences[0].travel)[0]: "Nigeria";
	const physical = preferences && preferences[0].delivery_mode.includes('Physical');
	const virtual = preferences && preferences[0].delivery_mode.includes('Virtual');
	const formatPrice = (priceString) =>{
		return Number(priceString.replace(' ','')).toLocaleString()
	}
	const getPrice = () => {
		try{
			const priceRange = price.split('$')[0].split(" - ");
			const formattedPriceRange = `${formatPrice(priceRange[0])} NGN - ${formatPrice(priceRange[1])} NGN`
			return formattedPriceRange;
		}catch(err){
			return "100,000 NGN - 650,000 NGN"
		}
	}
	window.addEventListener('click', e=>{
		setHideContacts(true);
	});

	const EditIcon = () => (
		isAdmin &&
		<div className='editicon'>
			<img src={greyPencil} alt='' />
		</div>
	);

	useEffect(()=>{
		contact.forEach((oneContact) => {
			setUserContacts(oneContact);
		});
	},[contact])

	

	return (
		<>
			<Popup
				closed={popupClosed}
				Component={UpdateProfile}
				onClose={
					() => setClosePopup(true)
				}
			/>
			<div
				className='profilecard'
			>
				<div className={`profilecard__tag --${tag}`}>{tag}</div>
				<div className='profilecard__actions'>
					<img src={shareIcon} alt='share' />
					<div onClick={() => setClosePopup(false)}>
						<EditIcon />
					</div>
				</div>

				<div className='profilecard__maincontent'>
					<div className='profilecard__maincontent__left'>
						<div className={`profilepicture_wrapper --${tag}`}>
							<img src={profile_photo} alt='' />

							{
								isAdmin &&
								<ImgCrop shape='round'>
										<Upload
											{...props}
											beforeUpload={(file) => {
												const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
												if (!isJpgOrPng) {
													message.error('You can only upload JPG/PNG file!');
													return;
												}
												if(uploadLoading){
													message.error('Still Uploading one image!');

												}
												setUploadLoading(true);
												uploadImage(file)
													.then((res) => setImageLink(res))
													.catch((err) => message.error("There was an error uploading image"))
													.then(() => {
														// make request to upload image to server
													})
													.finally(() =>{
														setUploadLoading(false)
													})
												return false;
											}}
										>
										<div className="profilepicture_wrapper__overlay">
											{
												!uploadLoading ?
												<img
													src={imageOverlay} 
													alt=""
												/> :
												<Spin indicator={antIcon} />
											}
										</div>
									</Upload>
								</ImgCrop>
							}
						</div>

						<div className='profiletext_wrapper'>
							<div className='--name'>{name}</div>
							<div className='--qualifications'>{highest_level_of_education}</div>
							<div className='--position'>{experience ? experience[0].position : null}</div>
							<div className='--company'>{experience ? experience[0].company : null}</div>
							<div className='--footer'>
								<div
									className='--contact'
									onClick={
										(e) => {
											e.stopPropagation()
											setHideContacts(!hideContacts);
										}
									}
								>
									contact me
								</div>
								{physical && <img src={profileIcon} alt='' />}
								{virtual && <img src={playIcon} alt='' />}
								<ContactMe
									closed={hideContacts}
									contacts={userContacts}
									onClose={(e) => {
										e.stopPropagation()
										setHideContacts(true)
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
							<div className='--icon' > <img src={moneyIcon} alt='' /> </div>
							<div className='--text'>{getPrice()}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon' > <img src={locationIcon} alt='' /> </div>
							<div className='--text'>{`${state}, ${country}`}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon' > <img src={planeIcon} alt='' /> </div>
							<div className='--text'>{travelLocation}</div>
						</div>

						<div className='profilecard__maincontent__right__item'>
							<div className='--icon' > <img src={globeIcon} alt='' /> </div>
							<div className='--text'>{languages ? splitLanguage(languages) : null}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
