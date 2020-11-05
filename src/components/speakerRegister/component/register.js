import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
	Switch,
	Link,
	Route, // for later
} from 'react-router-dom';

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
	SPEAKER_EXPERTISE_KEY
} from './constants';

import {
	getFormState, deleteFormState
} from '../../../utilities/dataPersist'

import {component as NavBar} from '../../../utilities/navbar';
import {component as SectionTab} from '../subcomponents/sectionTab';
import {component as SpeakerCard} from '../../../utilities/speakerCard';
import {component as PersonalDetail} from '../subcomponents/personalDetails';
import {component as Expertise} from '../subcomponents/expertise';
import {component as Experience} from '../subcomponents/experience';
import {component as Preference} from '../subcomponents/preference';
import {component as Media} from '../subcomponents/media';

import {
	validatePersonaDetails,
	validateExpertiseState,
	validateExperienceState,
	validatePreferenceState,
	validateMedia,
} from '../../../utilities/generalUtils/validators/speakerValidation';

import './register.scss';
import defaultImage from '../assets/greycircle.svg';
import {message} from 'antd';
import cleanData from '../subcomponents/utils/cleanData';
import axios from '../../../utilities/axios';

export default function Register({location}) {
	const [activeTab, setactiveTab] = useState(0);
	const [previewHidden, setPreviewHidden] = useState(false);
	const [personalDetails, setPersonalDetails] = useState(
		getFormState(SPEAKER_PERSONAL_DETAILS_KEY) || INITIAL_PERSONAL_DETAILS_STATE
	);
	const [expertise, setExpertise] = useState(
		getFormState(SPEAKER_EXPERTISE_KEY) || INITIAL_EXPERTISE_STATE
	);
	const [experience, setExperience] = useState(
		getFormState(SPEAKER_EXPERIENCE_KEY) || INITIAL_EXPERIENCE_STATE
	);
	const [preference, setPreference] = useState(
		getFormState(SPEAKER_PREFERENCE_KEY) || INITIAL_PREFERENCE_STATE)
	;
	const [media, setMedia] = useState(
		getFormState(SPEAKER_MEDIA_KEY) || INITIAL_MEDIA_STATE
	);

	const history = useHistory();

	useEffect(() => {
		const {pathname} = location;
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
			return;
		}
		// send post request
		axios
			.post('/speakers/add', cleanData(finalState))
			.then((res) => {
				message.success("speaker account sucesfully created");
				// clear the state upon submit
				deleteFormState([
					SPEAKER_EXPERIENCE_KEY, SPEAKER_EXPERTISE_KEY,
					SPEAKER_MEDIA_KEY, SPEAKER_PERSONAL_DETAILS_KEY,
					SPEAKER_PREFERENCE_KEY]
				)
				setTimeout(()=>history.push('/login'), 1000)
			})
			.catch((err) => message.error('The email adress used already exists'));
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
								className={previewHidden ? 'fa fa-eye' : 'fa fa-eye-slash'}
							></i>
						</div>
						{!previewHidden ? (
							<div className='register__content__preview__card'>
								<SpeakerCard
									fullname={personalDetails.fullname}
									company={experience.positions[0].company}
									position={experience.positions[0].position}
									skills={
										expertise.primary_topic_tags.filter(
											(tag) => !INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag)
										).length > 0
											? expertise.primary_topic_tags.filter(
													(tag) => !INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag)
											  )
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
							Your detials are being automatically saved. You can skip a question and come back to it later.
						</div>
					</div>
				</div>
				<div className='register__content__form'>
					<Switch>
						<Route
							path='/register/(1)?'
							exact
							render={(props) => (
								<PersonalDetail {...props} stateChanger={setPersonalDetails} state={personalDetails} />
							)}
						/>
						<Route
							path='/register/2'
							exact
							render={(props) => <Expertise {...props} stateChanger={setExpertise} state={expertise} />}
						/>
						<Route
							path='/register/3'
							exact
							render={(props) => <Experience {...props} stateChanger={setExperience} state={experience} />}
						/>
						<Route
							path='/register/4'
							exact
							render={(props) => <Preference {...props} stateChanger={setPreference} state={preference} />}
						/>
						<Route
							path='/register/5'
							exact
							render={(props) => (
								<Media {...props} stateChanger={setMedia} state={media} handleSubmit={handleSubmit} />
							)}
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
