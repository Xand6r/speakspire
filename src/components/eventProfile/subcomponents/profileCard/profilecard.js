import React from 'react';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';
import profileIcon from '../../assets/playIcon.svg';
import playIcon from '../../assets/profileIcon.svg';
import blueSpeaker from '../../assets/blueSpeaker.svg';

import globeIcon from '../../assets/globe.svg';
import locationIcon from '../../assets/location.svg';

import calendar from '../../assets/calendar.svg';
import linkchain from '../../assets/linkchain.svg';
import organiserplaceholder from '../../assets/organiserplaceholder.svg';

import './profilecard.scss';

const tag = 'premium';
export default function Profilecard({ userData }) {
	const { name, organizer, schedule, language } = userData;
	return (
		<div class='events_profilecard'>
			<div className='events_profilecard__actions'>
				<img src={shareIcon} alt='share' />
				<img src={ellipsisIcon} alt='ellipsis' />
			</div>

			<div className='events_profilecard__maincontent'>
				<div className='events_profilecard__maincontent__left'>
					<div className='--event_brief'>
						<img src={organiserplaceholder} alt='' />
						<span>{organizer}</span>
					</div>

					<div className='--event_description'>{name}</div>

					<div className='--event_theme'>
						<div className='--themeheading'>Theme</div>
						<div className='--themecontent'>The Role of Media in Growing the Economy</div>
					</div>
				</div>

				<div className='events_profilecard__maincontent__right'>
					<div className='events_profilecard__maincontent__right__item'>
						<img className='--icon' src={calendar} alt='' />
						<div className='--text'>Tue, Jan 20, 2020 10:00PM</div>
					</div>

					<div className='events_profilecard__maincontent__right__item'>
						<img className='--icon' src={locationIcon} alt='' />
						<div className='--text'>{schedule ? schedule[0].onlineLink : null}</div>
					</div>

					<div className='events_profilecard__maincontent__right__item'>
						<img className='--icon' src={linkchain} alt='' />
						<div className='--text'>zoom.us/conference</div>
					</div>

					<div className='events_profilecard__maincontent__right__item'>
						<img className='--icon' src={globeIcon} alt='' />
						<div className='--text'>{language}</div>
					</div>

					<div className='events_profilecard__maincontent__right__item --top'>
						<div className='--speakercall'>
							<img src={blueSpeaker} alt='bluespeaker' />
							<span>Call for Speakers</span>
						</div>
						<div className='--speakercall_action'>View Details</div>
					</div>
				</div>
			</div>
		</div>
	);
}
