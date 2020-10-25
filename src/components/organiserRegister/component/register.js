import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Switch,
	Link,
	Route, // for later
} from 'react-router-dom';

import { STEPS, INITIAL_COMPANY_DETAILS_STATE, INITIAL_MEDIA_STATE } from './constants';

import OrganiserCard from '../../../utilities/organiserCard';
import { component as NavBar } from '../../../utilities/navbar';
import { component as SectionTab } from '../../speakerRegister/subcomponents/sectionTab';
import { component as SpeakerCard } from '../../../utilities/speakerCard';
import { component as PersonalDetail } from '../subcomponents/personalDetails';
import { component as Media } from '../subcomponents/media';
import cleanData from '../subcomponents/utils/cleanData';
import axios from '../../../utilities/axios';
import { message } from 'antd';

import './register.scss';
import defaultImage from '../assets/greycircle.svg';

export default function Register({ location }) {
	const [activeTab, setactiveTab] = useState(0);
	const [previewHidden, setPreviewHidden] = useState(false);
	const [personalDetails, setPersonalDetails] = useState(INITIAL_COMPANY_DETAILS_STATE);
	const history = useHistory();
	const [media, setMedia] = useState(INITIAL_MEDIA_STATE);

	useEffect(() => {
		const { pathname } = location;
		const currentTab = pathname.split('/')[2];
		if (!currentTab) {
			setactiveTab(0);
			return;
		}
		setactiveTab(Number(currentTab) - 1);
	}, [setactiveTab, location]);

	const makeActive = (clickedIndex) => {
		setactiveTab(clickedIndex);
	};

	const handleSubmit = () => {
		const finalState = {
			...personalDetails,
			...media,
		};

		// send post request

		axios
			.post('/organizers/add', cleanData(finalState))
			.then(() => {
				message.success('Organizer account sucesfully created');
				setTimeout(() => history.push('/organiser'), 1000);
			})
			.catch(() => message.error('There was an error creating your speaker account'));
	};

	return (
		<div className='organiser'>
			{/* the navigation bar component */}
			<NavBar />
			{/* the navigation bar component */}

			{/* the section for tapping which form to fill  */}
			<div className='organiser__activetab'>
				<div className='organiser__activetab__steps'>
					{STEPS.map((step, index) => (
						<Link key={Math.random()} className='link' to={`/organiser/${index + 1}`}>
							<SectionTab index={index} text={step} active={index === activeTab} changeTab={makeActive} />
						</Link>
					))}
				</div>
			</div>
			{/* the section for tapping which form to fill  */}

			{/* the section actually showing the mail content */}
			<div className='organiser__content'>
				<div>
					<div className={`organiser__content__preview ${previewHidden ? '--small' : '--large'}`}>
						<div className='organiser__content__preview__header'>
							<span>Preview</span>
							<i
								onClick={() => {
									setPreviewHidden(!previewHidden);
								}}
								className={previewHidden ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
						</div>
						{!previewHidden ? (
							<div className='organiser__content__preview__card'>
								<OrganiserCard
									profileImage={media.profilePhoto.src}
									coverImage={media.coverPhoto.src}
									companyName={personalDetails.companyName}
									specialty={media.speciality.label}
									services={media.services.length ? media.services : undefined}
								/>
							</div>
						) : (
							''
						)}
						<div className='organiser__content__preview__footer'>
							Your detials are being automatically saved. You can skip a question and come back to it later.
						</div>
					</div>
				</div>
				<div className='organiser__content__form'>
					<Switch>
						<Route
							path='/organiser/(1)?'
							exact
							render={(props) => <PersonalDetail {...props} stateChanger={setPersonalDetails} state={personalDetails} />}
						/>

						<Route
							path='/organiser/2'
							exact
							render={(props) => <Media {...props} stateChanger={setMedia} state={media} handleSubmit={handleSubmit} />}
						/>
					</Switch>
				</div>
			</div>
		</div>
	);
}

Register.propTypes = {
	location: PropTypes.instanceOf(Object).isRequired,
};
