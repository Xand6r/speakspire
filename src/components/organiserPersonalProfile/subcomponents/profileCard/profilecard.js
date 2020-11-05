import React from 'react';

import ellipsisIcon from '../../assets/ellipsis.svg';
import shareIcon from '../../assets/share.svg';

import locationIcon from '../../assets/location.svg';

import './profilecard.scss';
import splitData from '../utils/splitData';

export default function Profilecard({ userData }) {
	const { profile_photo, name, specialty, address, country, services } = userData;

	return (
		<div className='profilecard_organisers'>
			<div className='profilecard_organisers__actions'>
				<img src={shareIcon} alt='share' />
				<img src={ellipsisIcon} alt='ellipsis' />
			</div>

			<div className='profilecard_organisers__maincontent'>
				<div className='profilecard_organisers__maincontent__left'>
					<div className={`profilepicture_wrapper`}>
						<img src={profile_photo} alt='' />
					</div>

					<div className='profiletext_wrapper'>
						<div className='--name'>{name}</div>
						<div className='--specialty'>{specialty}</div>
						<div className='--footer'>
							<div className='--contact'>contact me</div>
						</div>
					</div>
				</div>

				<div className='profilecard_organisers__maincontent__right'>
					<div className='profilecard_organisers__maincontent__right__item'>
						<img className='--icon' src={locationIcon} alt='' />
						<div className='--text'>
							{address}, {country}
						</div>
					</div>
					<div className='profilecard_organisers__maincontent__right__item'>
						<div className='services'>
							{splitData(services).map((service, i) => (
								<div className='service' key={i}>
									{service}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
