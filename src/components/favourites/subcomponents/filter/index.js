import React, { useState } from 'react';

import { component as SpeakerCard } from '../../../../utilities/speakerCard';
import { component as EventCard } from '../../../../utilities/eventCard';
import OrganiserCard from '../../../../utilities/organiserCard';

import SpeakerIcon from '../../assets/speakertabicon.svg';
import OrgIcon from '../../assets/orgtabicon.svg';
import EventIcon from '../../assets/eventtabicon.svg';

import './filter.scss';
export default function Filter() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className='favouritesfilter'>
			<div className='favouritesfilter__tabswrapper'>
				<div className={`favouritesfilter__tabswrapper__tab ${activeTab === 0 && '--active'}`} onClick={() => setActiveTab(0)}>
					<img src={SpeakerIcon} alt='' className='tablogo' />
					Speakers
				</div>
				<div className={`favouritesfilter__tabswrapper__tab ${activeTab === 1 && '--active'}`} onClick={() => setActiveTab(1)}>
					<img src={EventIcon} alt='' className='tablogo' style={{ 'margin-top': '-5px' }} />
					Events
				</div>
				<div className={`favouritesfilter__tabswrapper__tab ${activeTab === 2 && '--active'}`} onClick={() => setActiveTab(2)}>
					<img src={OrgIcon} alt='' className='tablogo' />
					Organisers
				</div>
			</div>
			{activeTab === 0 ? (
				<div className='favouritesfilter__tabscontent'>
					<div className='favouritesfilter__tabscontent__content' id='speaker'>
						{[...Array(10).keys()].map((i) => (
							<SpeakerCard />
						))}
					</div>
				</div>
			) : (
				''
			)}
			{activeTab === 1 ? (
				<div className='favouritesfilter__tabscontent'>
					<div className='favouritesfilter__tabscontent__content' id='speaker'>
						{[...Array(10).keys()].map((i) => (
							<EventCard />
						))}
					</div>
				</div>
			) : (
				''
			)}
			{activeTab === 2 ? (
				<div className='favouritesfilter__tabscontent'>
					<div className='favouritesfilter__tabscontent__content' id='speaker'>
						{[...Array(10).keys()].map((i) => (
							<OrganiserCard />
						))}
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
