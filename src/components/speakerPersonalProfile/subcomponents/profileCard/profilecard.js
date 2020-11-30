import React, {useState, useEffect} from 'react';
import ContactMe from '../../../../utilities/contactMethods';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';
import profileIcon from '../../assets/playIcon.svg';
import playIcon from '../../assets/profileIcon.svg';
import blueMic from '../../assets/blueMic.svg';

import moneyIcon from '../../assets/money.svg';
import planeIcon from '../../assets/plane.svg';
import globeIcon from '../../assets/globe.svg';
import locationIcon from '../../assets/location.svg';

import './profilecard.scss';

const tag = 'premium';

export default function Profilecard({ userData }) {
	const [userContacts, setUserContacts] = useState({});

	const {
		profile_photo, name, highest_level_of_education, experience, expertise, languages,
		state, country, contact = []
	} = userData;
	const [hideContacts, setHideContacts] = useState(true);
	const splitLanguage = (data) => {
		return data
			.replace(/['"]+/g, ' ')
			.replace(/['/[]+/g, '')
			.replace(/['/\]]+/g, '');
	};

	window.addEventListener('click', e=>{
		setHideContacts(true);
	});

	useEffect(()=>{
		contact.forEach((oneContact) => {
			setUserContacts(oneContact);
		});
	},[contact])

	return (
		<div
			className='profilecard'
		>
			<div className={`profilecard__tag --${tag}`}>{tag}</div>
			<div className='profilecard__actions'>
				<img src={shareIcon} alt='share' />
				<img src={ellipsisIcon} alt='ellipsis' />
			</div>

			<div className='profilecard__maincontent'>
				<div className='profilecard__maincontent__left'>
					<div className={`profilepicture_wrapper --${tag}`}>
						<img src={profile_photo} alt='' />
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
							<img src={profileIcon} alt='' />
							<img src={playIcon} alt='' />
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
						<img className='--icon' src={moneyIcon} alt='' />
						<div className='--text'>N100,000 - N650,000</div>
					</div>

					<div className='profilecard__maincontent__right__item'>
						<img className='--icon' src={locationIcon} alt='' />
						<div className='--text'>{`${state}, ${country}`}</div>
					</div>

					<div className='profilecard__maincontent__right__item'>
						<img className='--icon' src={planeIcon} alt='' />
						<div className='--text'>Global</div>
					</div>

					<div className='profilecard__maincontent__right__item'>
						<img className='--icon' src={globeIcon} alt='' />
						<div className='--text'>{languages ? splitLanguage(languages) : null}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
