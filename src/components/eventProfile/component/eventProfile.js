import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { component as NavBar } from '../../../utilities/navbar';

import ProfileCard from '../subcomponents/profileCard';
import ProfileContent from '../subcomponents/profileContent';
import { component as Footer } from '../../../utilities/footer';
// import a sample image
import tempHeaderImage from '../assets/temp header.jpg';
import axios from '../../../utilities/axios';
import { message } from 'antd';

import './eventprofile.scss';
export default function Speakerprofile(props) {
	const [userData, setUserData] = useState({});
	const history = useHistory();

	useEffect(() => {
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
		getDetails();
	}, [history, props.match.params.id]);

	return (
		<div class='eventprofile'>
			{/* the navigation bar of the site */}
			<NavBar />
			{/* the navigation bar of the site */}

			{/* the section for the image header */}
			<div className='eventprofile__header_image'>
				<img src={userData.banner} alt='' />
			</div>
			{/* the section for the image header */}

			{/* the section containing the profilecard */}
			<div className='eventprofile__profile_card'>
				<ProfileCard userData={userData} />
			</div>
			{/* the section containing the profilecard */}

			{/* the section containing the main content */}
			<div className='eventprofile__profile_content'>
				<ProfileContent userData={userData} />
			</div>
			{/* the section containing the main content */}

			{/* the footer */}
			<Footer />
			{/* the footer */}
		</div>
	);
}
