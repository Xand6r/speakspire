import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { Upload, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import imageOverlay from '../assets/overlay.svg';

import { getID, getRole } from '../../../api/user';
import { component as NavBar } from '../../../utilities/navbar';
import { component as Footer } from '../../../utilities/footer';

import ProfileCard from '../subcomponents/profileCard';
import ProfileContent from '../subcomponents/profileContent';

import { uploadEventsCover } from '../../../utilities/generalUtils/uploadImage';
import axios from '../../../utilities/axios';

// import a sample image

import './eventprofile.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 46, color: '#F1F3F9' }} spin />;
export default function Speakerprofile(props) {
	const [uploadLoading, setUploadLoading] = useState(false);
	const [userData, setUserData] = useState({});
	const [imageLink, setImageLink] = useState('');

	const history = useHistory();
	const userId = useSelector(({ user }) => user.id);

	const id = userId;
	const role = getRole();
	// const isAdmin = userId === id

	const getDetails = async () => {
		try {
			const { data } = await axios.get(`/events/${props.match.params.id}`);
			setUserData(data.data);
		} catch (err) {
			message.error('there was an error fetching this event');
			setUserData({});
			setTimeout(() => history.push('/events'), 2000);
		}
	};
	useEffect(() => {
		getDetails();
	}, [history, props.match.params.id]);

	useEffect(() => {
		const { banner } = userData || {};
		if (banner) {
			setImageLink(banner);
		}
	}, [userData]);

	const [offset, setOffset] = useState(0);
	useEffect(() => {
		function handleScroll() {
			setOffset(window.pageYOffset);
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const isAdmin = true;

	return (
		<div className='eventprofile'>
			{/* the navigation bar of the site */}
			<div className='--sticky'>
				<NavBar />
			</div>
			{/* the navigation bar of the site */}

			{/* the section for the image header */}
			<div className='eventprofile__header_image'>
				<img
					src={imageLink}
					alt=''
					style={{
						transform: `translateY(${Math.abs(offset) * 0.25}px)`,
						transition: '200ms',
					}}
				/>
				{isAdmin && (
					<ImgCrop aspect='2.05'>
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
								uploadEventsCover(file, userId)
									.then((res) => res && setImageLink(res))
									.catch((err) => message.error('There was an error uploading image'))
									.finally(() => {
										setUploadLoading(false);
									});
								return false;
							}}>
							<div className='eventprofile__header_image__overlay'>
								{!uploadLoading ? <img src={imageOverlay} alt='' /> : <Spin indicator={antIcon} />}
							</div>
						</Upload>
					</ImgCrop>
				)}
			</div>
			{/* the section for the image header */}

			{/* the section containing the profilecard */}
			<div className='eventprofile__profile_card'>
				<ProfileCard isAdmin={isAdmin} refetch={getDetails} userData={userData} />
			</div>
			{/* the section containing the profilecard */}

			{/* the section containing the main content */}
			<div className='eventprofile__profile_content'>
				<ProfileContent isAdmin={isAdmin} refetch={getDetails} userData={userData} />
			</div>
			{/* the section containing the main content */}

			{/* the footer */}
			<Footer />
			{/* the footer */}
		</div>
	);
}
