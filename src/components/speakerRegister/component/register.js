import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Switch,
	Link,
	Route, // for later
} from 'react-router-dom';
import { setToken, saveID, saveRole } from '../../../api/user';
import { setLoggedIn } from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';

import {
	STEPS,
	INITIAL_PERSONAL_DETAILS_STATE,
	INITIAL_EXPERTISE_STATE,
	INITIAL_EXPERIENCE_STATE,
	INITIAL_PREFERENCE_STATE,
	INITIAL_MEDIA_STATE,
	ERROR_MESSAGES,
	SPEAKER_EXPERIENCE_KEY,
	SPEAKER_MEDIA_KEY,
	SPEAKER_PERSONAL_DETAILS_KEY,
	SPEAKER_PREFERENCE_KEY,
	SPEAKER_EXPERTISE_KEY,
} from './constants';

import { getFormState, deleteFormState } from '../../../utilities/dataPersist';

import { component as NavBar } from '../../../utilities/navbar';
import { component as SectionTab } from '../subcomponents/sectionTab';
import { component as SpeakerCard } from '../../../utilities/speakerCard';
import { component as PersonalDetail } from '../subcomponents/personalDetails';
import { component as Expertise } from '../subcomponents/expertise';
import { component as Experience } from '../subcomponents/experience';
import { component as Preference } from '../subcomponents/preference';
import { component as Media } from '../subcomponents/media';

import {
	validatePersonaDetails,
	validateExpertiseState,
	validateExperienceState,
	validatePreferenceState,
	validateMedia,
} from '../../../utilities/generalUtils/validators/speakerValidation';

import './register.scss';
import defaultImage from '../assets/greycircle.svg';
import { message } from 'antd';
import cleanData from '../subcomponents/utils/cleanData';
import axios from '../../../utilities/axios';

const INITIAL_ERROR_STATES = [true, true, true, true, true]

export default function Register({ location }) {
	const dispatch = useDispatch();
	const [activeTab, setactiveTab] = useState(0);
	const [previewHidden, setPreviewHidden] = useState(false);
	const [errorStates, setErrorStates] = useState(INITIAL_ERROR_STATES)
	const [personalDetails, setPersonalDetails] = useState(getFormState(SPEAKER_PERSONAL_DETAILS_KEY) || INITIAL_PERSONAL_DETAILS_STATE);
	const [expertise, setExpertise] = useState(getFormState(SPEAKER_EXPERTISE_KEY) || INITIAL_EXPERTISE_STATE);
	const [experience, setExperience] = useState(getFormState(SPEAKER_EXPERIENCE_KEY) || INITIAL_EXPERIENCE_STATE);
	const [preference, setPreference] = useState(getFormState(SPEAKER_PREFERENCE_KEY) || INITIAL_PREFERENCE_STATE);
	const [media, setMedia] = useState(getFormState(SPEAKER_MEDIA_KEY) || INITIAL_MEDIA_STATE);

	useEffect(() => {
		const { pathname } = location;
		const currentTab = pathname.split('/')[2];
		if (!currentTab) {
			setactiveTab(0);
			return;
		}
		setactiveTab(Number(currentTab) - 1);
	}, [setactiveTab, location]);

	useEffect(() => {
		const NO_ERRORS = [...errorStates];
		NO_ERRORS[0] = true;
		setErrorStates(NO_ERRORS);
	}, [personalDetails]);

	useEffect(() => {
		const NO_ERRORS = [...errorStates];
		NO_ERRORS[1] = true;
		setErrorStates(NO_ERRORS);
	}, [expertise]);

	useEffect(() => {
		const NO_ERRORS = [...errorStates];
		NO_ERRORS[2] = true;
		setErrorStates(NO_ERRORS);
	}, [experience]);

	useEffect(() => {
		const NO_ERRORS = [...errorStates];
		NO_ERRORS[3] = true;
		setErrorStates(NO_ERRORS);
	}, [preference]);

	useEffect(() => {
		const NO_ERRORS = [...errorStates];
		NO_ERRORS[4] = true;
		setErrorStates(NO_ERRORS);
	}, [media]);


	const makeActive = (clickedIndex) => {
		setactiveTab(clickedIndex);
	};

	const mapState = {
		'Personal Details': validatePersonaDetails(personalDetails),
		Expertise: validateExpertiseState(expertise),
		Experience: validateExperienceState(experience),
		Preferences: validatePreferenceState(preference),
		Media: validateMedia(media),
	};

	const handleSubmit = () => {
		const finalState = {
			...personalDetails,
			...expertise,
			...experience,
			...preference,
			...media,
		};
		const allFilled = Object.values(mapState).every((a) => a);
		if (!allFilled) {
			message.error(ERROR_MESSAGES.INCOMPLETE_PARAMETERS);
			const errorMap = Object.values(mapState).map(a=>Boolean(a));
			console.log(errorMap)
			setErrorStates(errorMap);
			return Promise.resolve();
		}
		// send post request
		return axios
			.post('/speakers/add', cleanData(finalState))
			.then((res) => {
				const { data, role, id } = res.data;
				setToken(data);
				saveID(id);
				saveRole(role);
				dispatch(setLoggedIn({role, id}));
				message.success('speaker account sucesfully created');
				// clear the state upon submit
				deleteFormState([SPEAKER_EXPERIENCE_KEY, SPEAKER_EXPERTISE_KEY, SPEAKER_MEDIA_KEY, SPEAKER_PERSONAL_DETAILS_KEY, SPEAKER_PREFERENCE_KEY]);
				setTimeout(() => (window.location.href = '/profile'), 1000);
			})
			.catch((err) => {
				const { email } = err.response?.data?.message || {email: "Unknown error"};
				if (email) {
					message.error(email);
					return;
				} else {
					message.error(err.response.data.message);
				}
			});
	};

	return (
		<div className='register'>
			{/* the navigation bar component */}
			<NavBar />
			{/* the navigation bar component */}

			{/* the section for tapping which form to fill  */}
			<div className='register__activetab'>
				{STEPS.map((step, index) => (
					<Link key={Math.random()} className='link' to={`/register/${index + 1}`}>
						<SectionTab
							index={index}
							text={step}
							active={index === activeTab}
							changeTab={makeActive}
							filled={mapState[step]}
							error={!errorStates[index]}
						/>
					</Link>
				))}
			</div>
			{/* the section for tapping which form to fill  */}

			{/* the section actually showing the mail content */}
			<div className='register__content'>
				<div>
					<div className={`register__content__preview ${previewHidden ? '--small' : '--large'}`}>
						<div className='register__content__preview__header'>
							<span>Preview</span>
							<i
								onClick={() => {
									setPreviewHidden(!previewHidden);
								}}
								className={previewHidden ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
						</div>
						{!previewHidden ? (
							<div className='register__content__preview__card'>
								<SpeakerCard
									fullname={personalDetails.fullname}
									company={experience.positions[0].company}
									position={experience.positions[0].position}
									skills={
										expertise.primary_topic_tags.filter((tag) => !INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag)).length > 0
											? expertise.primary_topic_tags.filter((tag) => !INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag))
											: undefined
									}
									image={media.profile_photo.src || undefined}
									primary={expertise.primary_specialty.value}
									secondary={expertise.secondary_specialty.value}
								/>
							</div>
						) : (
							''
						)}
						<div className='register__content__preview__footer'>
							Your details are being automatically saved. You can skip a question and come back to it later.
						</div>
					</div>
				</div>
				<div className='register__content__form'>
					<Switch>
						<Route
							path='/register/(1)?'
							exact
							render={(props) => <PersonalDetail {...props} stateChanger={setPersonalDetails} state={personalDetails} />}
						/>
						<Route path='/register/2' exact render={(props) => <Expertise {...props} stateChanger={setExpertise} state={expertise} />} />
						<Route path='/register/3' exact render={(props) => <Experience {...props} stateChanger={setExperience} state={experience} />} />
						<Route path='/register/4' exact render={(props) => <Preference {...props} stateChanger={setPreference} state={preference} />} />
						<Route
							path='/register/5'
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
