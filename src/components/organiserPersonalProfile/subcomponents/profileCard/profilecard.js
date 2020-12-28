import ImgCrop from 'antd-img-crop';
import {Spin, message, Upload} from 'antd';
import React, {useState, useEffect} from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import './profilecard.scss';
import UpdateProfile from '../../../../utilities/updates/organiserProfileUpdates';
import Popup from '../../../../utilities/popup/index';
import splitData from '../utils/splitData';

import shareIcon from '../../assets/share.svg';
import imageOverlay from '../../assets/overlay.svg';
import locationIcon from '../../assets/location.svg';
import ContactMe from '../../../../utilities/contactMethods';
import greyPencil from '../../assets/greyPencil.svg';

import {uploadOrganiserProfile} from '../../../../utilities/generalUtils/uploadImage';

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
export default function Profilecard({ userData , isAdmin, refetch}) {
	const { id, state, name, specialty, address, country, services, email, phone } = userData;
	const [popupClosed, setClosePopup] = useState(true);
	const [imageLink, setImageLink] = useState(null);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [hideContacts, setHideContacts] = useState(true);

	const EditIcon = () => (
		isAdmin &&
		<div className='editicon'>
			<img src={greyPencil} alt='' />
		</div>
	);

	useEffect(() => {
		if(userData){
			setImageLink(userData.profile_photo)
		}
	}, [userData]);

	window.addEventListener('click', e=>{
		setHideContacts(true);
	});

	return (
		<>
			<Popup
					closed={popupClosed}
					Component={
						<UpdateProfile
							initialData={{name, phone, email, specialty, state, country}}
							onClose={() => setClosePopup(true)}
							onSuccess={refetch}
						/>
					}
					onClose={
						() => setClosePopup(true)
					}
				/>
			<div className='profilecard_organisers'>
				<div className='profilecard_organisers__actions'>
					<img src={shareIcon} alt='share' />
					<div onClick={() => setClosePopup(false)} >
						<EditIcon />
					</div>
				</div>

				<div className='profilecard_organisers__maincontent'>
					<div className='profilecard_organisers__maincontent__left'>
						<div className={`profilepicture_wrapper`}>
							<img src={imageLink} alt='' />

							{
									isAdmin &&
									<ImgCrop aspect='1'>
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
													uploadOrganiserProfile(file, id)
														.then((res) => {
															setImageLink(res);
															refetch();
															}
														)
														.catch((err) => message.error("There was an error uploading image"))
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
							<div className='--specialty'>{specialty}</div>
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
								<ContactMe
									closed={hideContacts}
									contacts={{
										email,
										phone
									}}
									onClose={(e) => {
										e.stopPropagation()
										setHideContacts(true)
									}}
								/>
							</div>
						</div>
					</div>

					<div className='profilecard_organisers__maincontent__right'>
						<div className='profilecard_organisers__maincontent__right__item'>
							<img className='--icon' src={locationIcon} alt='' />
							<div className='--text'>
								{address}, {country}
							</div>
						</div>
						<div className='profilecard_organisers__maincontent__right__item'>
							<div className='services'>
								{splitData(services).map((service, i) => (
									<div className='service' key={i}>
										{service}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
