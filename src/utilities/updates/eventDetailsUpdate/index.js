import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { jsonParse } from '../../utils';
import { SPEAKER_SPECIALITY, TOPIC_AREAS } from '../../../components/speakerRegister/subcomponents/expertise/constants';
import { EVENT_TYPE } from '../../../components/eventsRegister/component/constants';

import axios from '../../axios';
import { INITIAL_STATE } from './constants';
import { validateData } from './validator';

import '../updates.scss';
import './eventDetailsUpdate.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../stylesheets/tag.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

export default function Index({ onClose, initialData, onSuccess, eventId }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
	const userId = useSelector(({user}) => user.id)

    const stateChanger = (name, value) => {
        setState({
            ...state,
            [name]:value
        })
    }

    useEffect(() => {
        const {type, topicArea,  tags} = initialData;
        setState({
            ...state,
            eventType: type,
            topicArea,
            topicTags: jsonParse(tags)
        });
        // set initial state
    }, [initialData]);


	useEffect(() => {
		const { type, topicArea, tags } = initialData;
		setState({
			...state,
			eventType: type,
			topicArea,
			topicTags: jsonParse(tags),
		});
	}, [initialData]);

	const saveState = () => {
		console.log(state);
		const valid = validateData(state);
		if (valid) {
			const eventID = window.location.href.split('/events/')[1];
			// set lading state
			setLoading(true);
			// make patch request
			axios
				.patch(`events/${eventID}/details`, {
					type: state.eventType,
					topic_area: state.topicArea,
					tags: JSON.stringify(state.topicTags),
					organizer_id: userId,
				})
				.then(() => {
					message.success('Details updated sucesfully!');
					onClose();
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					message.error('There was an error updating Event!', err.response.data.message);
					onClose();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			message.error('Please fill in all details before submitting!');
			return;
		}
	};

	return (
		<div className='updates event_details'>
			<div className='updates__form'>
				<div className='updates__form__header'>Event Details</div>

				<div className='updates__form__content'>
					<div className='updates__form__content__item'>
						<label htmlFor='fullname'>Event Type</label>
						<div className='--singleselect'>
							<Select
								options={EVENT_TYPE}
								isSearchable
								placeholder='Select'
								className='--item'
								onChange={(eventType) => {
									setState({
										...state,
										eventType: eventType.value,
									});
								}}
								value={
									state.eventType
										? {
												value: state.eventType,
												label: state.eventType,
										  }
										: ''
								}
							/>
						</div>
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='fullname'>Topic Area</label>
						<div className='--singleselect'>
							<Select
								options={TOPIC_AREAS}
								isSearchable
								placeholder='Select'
								className='--item'
								onChange={(topicArea) => {
									setState({
										...state,
										topicArea: topicArea.value,
									});
								}}
								value={
									state.topicArea
										? {
												value: state.topicArea,
												label: state.topicArea,
										  }
										: ''
								}
							/>
						</div>
					</div>

					<div className='updates__form__content__item'>
						<label className='double' htmlFor='fullname'>
							Event Tags
							<span>Make your event easier to find. Add tags that are relevant to your topic area. Separate tags with commas.</span>
						</label>
						<div className='--input_wrapper --tags'>
							<TagsInput
								value={state.topicTags}
								addKeys={[9, 13, 188]}
								onChange={(tag) => {
									setState({
										...state,
										topicTags: tag,
									});
								}}
								inputProps={{
									placeholder: 'Tag 1, Tag 2',
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='updates__action'>
				<div className='cancel' onClick={onClose}>
					Cancel
				</div>

				<div className='save' onClick={saveState}>
					{loading ? <Spin indicator={antIcon} /> : 'Save'}
				</div>
			</div>
		</div>
	);
}
