import React, { useState } from 'react';
import { Checkbox } from 'antd';
import MultiSelect from '@khanacademy/react-multi-select';
import { useSelector } from 'react-redux';
import { component as SpeakerCard } from '../../../../utilities/speakerCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { classifySpeaker } from '../../../../utilities/utils';
import { INITIAL_STATE, FILTER_TEXT, CHECKBOX_OPTIONS } from './constants';

import { jsonParse } from '../../../../utilities/utils';
import './filter.scss';
import '../../../../stylesheets/filter.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#4D75F4' }} spin />;

export default function Filter() {
	function onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	const arrayJsonParse = (jsonstring, array) => {
		try {
			const parsed = JSON.parse(jsonstring);
			return parsed;
		} catch (err) {
			return array ? [] : {};
		}
	};
	const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
	const [limit, setLimit] = useState(12);
	const [loading, setLoading] = useState(false);
	const speakerState = useSelector(({ speakers }) => speakers);

	const increaseLimit = () => {
		if (limit >= speakerState.data.length) return;
		setLoading(true);
		setTimeout(() => {
			setLimit(limit + 4);
			setLoading(false);
		}, 1000);
	};

	return (
		<div>
			<div className='filter --speakerspage'>
				<div className='filter__top'>
					<div className='filter__header'>Find the speaker of your dreams</div>

					<div className='filter__subheader'>
						…at first you will call them speakers and coaches, but you will come to realize that they are more like friends who are passionate about
						helping and inspiring you and your audience to be better.
					</div>
				</div>

				<div className='filter__filter'>
					<div className='filter__filter__search'>
						<div className='inputgroup'>
							<input className='filter__filter__search__input' type='text' placeholder='Search speakers by name, role, company, etc.' />
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
					{speakerState.data.slice(0, limit).map((speaker) => {
						const {
							id,
							name,
							experience,
							expertise: [{ primary_specialty, secondary_specialty, primary_tags, primary_topic }],
							bio,
							languages,
							preferences,
							state,
							country,
							years_of_experience = '0-2 years',
							number_of_engagements = '0-10 engagements',
							languages: userLanguages,
						} = speaker;
						const tag = classifySpeaker(number_of_engagements, years_of_experience, userLanguages);
						const travelLocation = preferences ? arrayJsonParse(preferences[0]?.travel)[0] : 'Nigeria';
						const physical = preferences && preferences[0]?.delivery_mode.includes('Physical');
						const virtual = preferences && preferences[0]?.delivery_mode.includes('Virtual');
						const [{ company, position }] = experience.length ? experience : [{ company: null, position: null }];
						return (
							<SpeakerCard
								id={speaker.id}
								key={speaker.id}
								fullname={name}
								company={company}
								position={position}
								skills={jsonParse(primary_tags)}
								image={speaker.profile_photo}
								primary={primary_specialty}
								secondary={primary_topic}
								tag={tag}
								bio={bio}
								travelLocation={travelLocation}
								physical={physical}
								virtual={virtual}
								state={state}
								country={country}
								languages={languages}
							/>
						);
					})}
				</div>

				<div className='filter__more_results' onClick={increaseLimit}>
					{speakerState.loading || loading ? (
						<Spin indicator={antIcon} />
					) : (
						<>
							<span>More Speakers</span>
							<img src={LeftArrow} alt='left arrow' />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
