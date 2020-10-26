import React, { useState } from 'react';
import { Checkbox } from 'antd';
import MultiSelect from '@khanacademy/react-multi-select';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import OrganiserCard from '../../../../utilities/organiserCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import './filter.scss';
import '../../../../stylesheets/filter.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#4D75F4' }} spin />;

const INITIAL_STATE = {
	location: '',
	fee: '',
	topicArea: '',
	specialty: '',
	speakerCategory: '',
};

const multi_options = [
	{ label: 'Grapes', value: 'grapes' },
	{ label: 'Mango', value: 'mango' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Watermelon', value: 'watermelon' },
	{ label: 'Pear', value: 'pear' },
	{ label: 'Apple', value: 'apple' },
	{ label: 'Tangerine', value: 'tangerine' },
	{ label: 'Pineapple', value: 'pineapple' },
	{ label: 'Peach ', value: 'peach' },
];

const FILTER_TEXT = [
	{ placeholder: 'Location', state: 'location', options: multi_options },
	{ placeholder: 'Fee', state: 'fee', options: multi_options },
	{ placeholder: 'Topic Area', state: 'topicArea', options: multi_options },
	{ placeholder: 'Specialty', state: 'specialty', options: multi_options },
	{ placeholder: 'Speaker Category ', state: 'speakerCategory', options: multi_options },
];

const CHECKBOX_OPTIONS = [
	{ label: 'Online Engagement', value: 'Online Engagement' },
	{ label: 'Physical Engagement', value: 'Physical Engagement' },
	{ label: 'Weekdays', value: 'Weekdays' },
	{ label: 'Weekends', value: 'Weekends' },
	{ label: 'Open to travel', value: 'Open to travel' },
];

export default function Filter() {
	function onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	const organiserState = useSelector(({ organisers }) => organisers);
	const [limit, setLimit] = useState(4);
	const [loading, setLoading] = useState(false);

	const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
	const [speakerNumber, setSpeakerNumber] = useState([...Array(20).keys()]);

	const increaseLimit = () => {
		if (limit >= organiserState.data.length) return;
		setLoading(true);
		setTimeout(() => {
			setLimit(limit + 4);
			setLoading(false);
		}, 1000);
	};
	return (
		<div>
			<div className='filter --organiser'>

				<div className="filter__top">
					<div className='filter__header'>
						Find & hire great event organizers
					</div>

					<div className='filter__subheader'>
						We understand how much inspiration event organizers bring to your events. That’s why we have put them in the spotlight. So go ahead, find and hire that organizer that will make your event memorable. 
					</div>
				</div>

				<div className='filter__filter'>
					<div className='filter__filter__search'>
						<div className='inputgroup'>
							<input className='filter__filter__search__input' type='text' placeholder='Search events by name, role, company, etc.' />
						</div>
						<div className='filter__filter__search__button'>Search</div>
					</div>

					<div className='filter__filter__select'>
						<div className='filter__filter__select__icons'>
							<div className='filter__filter__select__icons__icon'>
								<div className='--text'>Filters</div>
							</div>

							<div className='filter__filter__select__icons__icon'>
								<img className='--icon' src={ResetFilterIcon} alt='filtericon' />
								<div className='--underline --small'>Reset Filters</div>
							</div>
						</div>

						<hr className='--divider' />

						<div className='filter__filter__select__items'>
							{FILTER_TEXT.map((filterInfo) => (
								<div className='--multiselect --white'>
									<MultiSelect
										options={filterInfo.options}
										selected={speakerFilterState[filterInfo.state]}
										onSelectedChanged={(selected) => setSpeakerFilterState({ ...speakerFilterState, [filterInfo.state]: selected })}
										overrideStrings={{
											selectSomeItems: <span class='placeholding_text'>{filterInfo.placeholder}</span>,
										}}
									/>
								</div>
							))}
						</div>

						<div className='filter__filter__select__checkboxes'>
							<Checkbox.Group options={CHECKBOX_OPTIONS} defaultValue={['Apple']} onChange={onChange} />
						</div>
					</div>
				</div>

				<div className='filter__results'>
					{organiserState.data.slice(0, limit).map((organiser) => {
						return (
							<div className='organisercard_wrapper'>
								<OrganiserCard
									id={organiser.id}
									coverImage={organiser.cover_photo}
									profileImage={organiser.profile_photo}
									companyName={organiser.name}
									specialty={organiser.specialty}
									services={JSON.parse(organiser.services)}
								/>
							</div>
						);
					})}
				</div>

				<div className='filter__more_results' onClick={increaseLimit}>
					{!(loading || organiserState.loading) ? (
						<>
							<span>More Organisers</span>
							<img src={LeftArrow} alt='left arrow' />
						</>
					) : (
						<Spin indicator={antIcon} />
					)}
				</div>
			</div>
		</div>
	);
}
