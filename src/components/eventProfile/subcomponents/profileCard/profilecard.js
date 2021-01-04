import React, { useState } from 'react';
import moment from 'moment';

import { jsonParse } from '../../../../utilities/utils';
import Popup from '../../../../utilities/popup/index';
import UpdateProfile from '../../../../utilities/updates/eventProfileUpdate';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';
import globeIcon from '../../assets/globe.svg';
import locationIcon from '../../assets/location.svg';
import calendar from '../../assets/calendar.svg';
import linkchain from '../../assets/linkchain.svg';
import organiserplaceholder from '../../assets/organiserplaceholder.svg';
import greyPencil from '../../assets/greyPencil.svg';

import './profilecard.scss';

const tag = 'premium';
export default function Profilecard({ userData, isAdmin, refetch }) {
	const { name, organizer, schedule = [{}], language, id, theme } = userData;
	const [popupClosed, setClosePopup] = useState(true);

	// parse the time into the required format
	const [{ date = '', time = '', physicalLink, onlineLink }] = schedule;
	const startDate = date.split('-').slice(0, 3).join('-');
	const startTime = time.split('-')[0];
	const parsedDate = moment(startDate, 'DD-MM-YY').format('ddd, MMM DD, YYYY');
	// parse the time into the required format

	const EditIcon = () =>
		isAdmin && (
			<div className='editicon'>
				<img src={greyPencil} alt='' />
			</div>
		);

	return (
		<>
			<Popup
				closed={popupClosed}
				Component={
					<UpdateProfile
						initialData={{
							schedule,
							name,
							theme,
							language: jsonParse(language),
						}}
						onClose={() => setClosePopup(true)}
						onSuccess={refetch}
						eventId={id}
					/>
				}
				onClose={() => setClosePopup(true)}
			/>
			<div className='events_profilecard'>
				<div className='events_profilecard__actions'>
					<img src={shareIcon} alt='share' />
					<div onClick={() => setClosePopup(false)}>
						<EditIcon />
					</div>
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
							<div className='--themecontent'>{theme}</div>
						</div>
					</div>

					<div className='events_profilecard__maincontent__right'>
						<div className='events_profilecard__maincontent__right__item'>
							<img className='--icon' src={calendar} alt='' />
							<div className='--text'>
								{parsedDate} {startTime}
							</div>
						</div>

						{physicalLink ? (
							<div className='events_profilecard__maincontent__right__item'>
								<img className='--icon' src={locationIcon} alt='' />
								<div className='--text'>{JSON.parse(physicalLink)}</div>
							</div>
						) : (
							''
						)}
						{onlineLink ? (
							<div className='events_profilecard__maincontent__right__item'>
								<img className='--icon' src={linkchain} alt='' />
								<div className='--text'>{jsonParse(onlineLink).join(', ')}.</div>
							</div>
						) : (
							''
						)}

						<div className='events_profilecard__maincontent__right__item'>
							<img className='--icon' src={globeIcon} alt='' />
							<div className='--text'>{jsonParse(language).join(', ')}</div>
						</div>

						<div className='events_profilecard__maincontent__right__item --top'>
							<div className='--speakercall_action'>Register</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
