import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {setUserData as setUserDataRedux} from '../../../redux/userSlice';


import axios from '../../../utilities/axios';
import imageOverlay from '../assets/overlay.svg';
import ProfileCard from '../subcomponents/profileCard';
import ProfileContent from '../subcomponents/profileContent';
import { component as NavBar } from '../../../utilities/navbar';
import { component as Footer } from '../../../utilities/footer';
import uploadImage, {uploadSpeakerImage} from '../../../utilities/generalUtils/uploadImage';

import './speakerprofile.scss';
const antIcon = <LoadingOutlined style={{fontSize: 46, color: '#F1F3F9'}} spin />;

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

export default function Speakerprofile(props) {
	const [userData, setUserData] = useState({});
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imageLink, setImageLink] = useState("");
	const history = useHistory();
	const dispatch = useDispatch()

	const userId = useSelector(({user}) => user.id)
	const id = props.match.params.id || userId;

	const isAdmin = userId === id
	const getDetails = async () => {
		try {
			const { data } = await axios.get(`/speakers/${id}`);
			setUserData(data.data);
			dispatch(setUserDataRedux(data.data))
		} catch (err) {
			console.log(err)
			message.error('there was an error fetching this user');
			setUserData({});
			setTimeout(() => history.push('/'), 1000);
		}
	};
	useEffect(() => {
		if(id){
			getDetails();
			console.log(id)
		}
	}, [history, id]);

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
		<div className='speakerprofile'>
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
									uploadSpeakerImage(file, userId)
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
				<ProfileCard refetch={getDetails} userData={userData} isAdmin={isAdmin} />
			</div>
			{/* the section containing the profilecard */}

			{/* the section containing the main content */}
			<div className='speakerprofile__profile_content'>
				<ProfileContent refetch={getDetails} userData={userData} isAdmin={isAdmin} />
			</div>
			{/* the section containing the main content */}
			{/* the footer */}
			<Footer />
			{/* the footer */}
		</div>
	);
}
