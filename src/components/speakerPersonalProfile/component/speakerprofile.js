import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { component as NavBar } from '../../../utilities/navbar';
import ProfileCard from '../subcomponents/profileCard';
import ProfileContent from '../subcomponents/profileContent';
import { component as Footer } from '../../../utilities/footer';
import { message } from 'antd';
import axios from '../../../utilities/axios';
import './speakerprofile.scss';
import { getID } from '../../../api/user';

export default function Speakerprofile() {
	const [userData, setUserData] = useState({});
	const history = useHistory();
	const id = useSelector(({user}) => user.id)

	useEffect(() => {
		const getDetails = async () => {
			try {
				const { data } = await axios.get(`/speakers/${id}`);
				setUserData(data.data);
			} catch (err) {
				console.log(err)
				message.error('there was an error fetching this user');
				setUserData({});
				setTimeout(() => history.push('/'), 1000);
			}
		};
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
					src={userData.cover_photo}
					alt=''
					style={{
						transform: `translateY(${Math.abs(offset) * 0.25}px)`,
						transition: '200ms'
					}}	
				/>
			</div>
			{/* the section for the image header */}

			{/* the section containing the profilecard */}
			<div className='speakerprofile__profile_card'>
				<ProfileCard userData={userData} />
			</div>
			{/* the section containing the profilecard */}

			{/* the section containing the main content */}
			<div className='speakerprofile__profile_content'>
				<ProfileContent userData={userData} />
			</div>
			{/* the section containing the main content */}
			{/* the footer */}
			<Footer />
			{/* the footer */}
		</div>
	);
}
