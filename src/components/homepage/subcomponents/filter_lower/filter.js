import React, { useState } from 'react';
import { Checkbox } from 'antd';
import MultiSelect from '@khanacademy/react-multi-select';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

import { component as EventCard } from '../../../../utilities/eventCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import '../../../../stylesheets/filter.scss';
import './filter_lower.scss'
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
];

let parseNewDateFormat = (dateString) => {
	// datestring is of the form dd-mm-yy
	const splitDate = dateString.split('-');
	return moment(`20${splitDate[2]}, ${splitDate[1]}, ${splitDate[0]}`).format('Do MMM Y');
};

function parseTime(time) {
	let timeInt = time.split(':')[0];
	let minutes = time.split(':')[1];

	// you could then add or subtract time here as needed

	if (time > '12:00') {
		return `${timeInt - 12}:${minutes} PM`;
	} else {
		return `${timeInt}:${minutes} AM`;
	}
}

export default function Filter() {
	function onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	const eventState = useSelector(({ events }) => events);
	const [limit, setLimit] = useState(3);
	const [loading, setLoading] = useState(false);

	const increaseLimit = () => {
		if (limit >= eventState.data.length) return;
		setLoading(true);
		setTimeout(() => {
			setLimit(limit + 3);
			setLoading(false);
		}, 1000);
	};

	const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
	return (
		<div>
			<div className='filter home__lowerfilter'>
				<div className='filter__header'>Showcase and find events</div>

				<div className='filter__filter'>
					<div className='filter__filter__search'>
						<div className='inputgroup'>
							<input className='filter__filter__search__input' type='text' placeholder='Search events by name, date, tags, organizer, etc.' />
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
							{FILTER_TEXT.map((filterInfo, i) => (
								<div className='--multiselect --white' key={i}>
									<MultiSelect
										options={filterInfo.options}
										selected={speakerFilterState[filterInfo.state]}
										onSelectedChanged={(selected) => setSpeakerFilterState({ ...speakerFilterState, [filterInfo.state]: selected })}
										overrideStrings={{
											selectSomeItems: <span className='placeholding_text'>{filterInfo.placeholder}</span>,
										}}
									/>
								</div>
							))}
						</div>

						<div className='filter__filter__select__checkboxes'>
							<Checkbox.Group name='alex' options={CHECKBOX_OPTIONS} defaultValue={['Apple']} onChange={onChange} />
						</div>
					</div>
				</div>

				<div className='filter__results'>
					{eventState.data.slice(0, limit).map((event, i) => {
						let tags = [];
						try {
							tags = JSON.parse(event.tags);
						} catch (err) {
							tags = [];
						}
						const fs = 'Do-MMM-YYY';
						const dateFrom = parseNewDateFormat(event.schedule[0].date.slice(0, 8));
						const dateTo = parseNewDateFormat(event.schedule[0].date.slice(9));
						const timeFrom = parseTime(event.schedule[0].time.split('-')[0]);
						const timeTo = parseTime(event.schedule[0].time.split('-')[1]);
						let dateInterval = '';
						if (event.schedule[0].frequency === 'Single-day Event') {
							dateInterval = `${dateFrom} ${timeFrom} WAT`;
						} else {
							dateInterval = `${dateFrom} - ${dateTo} ${timeFrom} WAT`;
						}
						return (
							<EventCard
								id={event.id}
								key={i}
								eventName={event.name}
								eventTitle={event.organizer}
								profileimage={event.banner}
								skillsList={tags}
								pcs={'pcs'}
								dateInterval={dateInterval}
							/>
						);
					})}
				</div>

				<div className='filter__more_results' onClick={increaseLimit}>
					{!(loading || eventState.loading) ? (
						<>
							<span>More Events</span>
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
