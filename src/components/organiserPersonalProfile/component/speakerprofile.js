import {Spin} from 'antd';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Upload, message } from 'antd';

import imageOverlay from '../assets/overlay.svg';
import { component as NavBar } from '../../../utilities/navbar';
import ProfileCard from '../subcomponents/profileCard';
import ProfileContent from '../subcomponents/profileContent';
import { component as Footer } from '../../../utilities/footer';
// import a sample image
import axios from '../../../utilities/axios';
import { getRole } from '../../../api/user';
import {uploadOrganiserImage} from '../../../utilities/generalUtils/uploadImage';



import './speakerprofile.scss';

const antIcon = <LoadingOutlined style={{fontSize: 46, color: '#F1F3F9'}} spin />;
export default function Speakerprofile(props) {
	const [userData, setUserData] = useState({});
	const [imageLink, setImageLink] = useState("");
	const [uploadLoading, setUploadLoading] = useState(false);
	const userId = useSelector(({user}) => user.id)
	const id = props.match.params.id || userId;

	const isAdmin = userId === id
	const history = useHistory();
	const role = getRole();

	const getDetails = async () => {
		try {
			const { data } = await axios.get(`/organizers/${id}`);
			setUserData(data.data);
		} catch (err) {
			message.error('there was an error fetching this user');
			setUserData({});
			setTimeout(() => history.push('/'), 1000);
		}
	};

	useEffect(() => {
		if(id && role !== 'speaker'){
			getDetails();
		}
	}, [history, id, role]);

	const [offset, setOffset] = useState(0)
	useEffect(() => {
	  function handleScroll() {
		setOffset(window.pageYOffset)
	  }
	  window.addEventListener("scroll", handleScroll)
	  return () => {
		window.removeEventListener("scroll", handleScroll)
	  }
	}, [])

	useEffect(() => {
		if(userData){
			setImageLink(userData.cover_photo)
		}
	}, [userData])

	return (
		<div id="organiser" className='speakerprofile'>
			{/* the navigation bar of the site */}
            <div className="--sticky">
				<NavBar />
			</div>
			{/* the navigation bar of the site */}

			{/* the section for the image header */}
			<div className='speakerprofile__header_image'>
				<img
					src={imageLink}
					alt=''
					style={{
						transform: `translateY(${Math.abs(offset) * 0.25}px)`,
						transition: '200ms'
					}}
				/>
				{
					isAdmin &&
					<ImgCrop aspect='3.49'>
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
									uploadOrganiserImage(file, userId)
										.then((res) => setImageLink(res))
										.catch((err) => message.error("There was an error uploading image"))
										.finally(() =>{
											setUploadLoading(false)
										})
									return false;
								}}
							>
							<div className="speakerprofile__header_image__overlay">
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
			{/* the section for the image header */}

			{/* the section containing the profilecard */}
			<div className='speakerprofile__profile_card'>
				<ProfileCard userData={userData}  isAdmin={isAdmin}  refetch={getDetails}/>
			</div>
			{/* the section containing the profilecard */}

			{/* the section containing the main content */}
			<div className='speakerprofile__profile_content'>
				<ProfileContent userData={userData}  isAdmin={isAdmin}  refetch={getDetails}/>
			</div>
			{/* the section containing the main content */}
			{/* the footer */}
			<Footer />
			{/* the footer */}
		</div>
	);
}
