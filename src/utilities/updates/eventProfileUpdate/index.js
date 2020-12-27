import React,{useState, useEffect} from 'react';
import moment from 'moment';
import { DatePicker, TimePicker, Checkbox } from 'antd';
import { message, Spin } from 'antd';
import Select from 'react-select';
import MultiSelect from '@khanacademy/react-multi-select';
import { LoadingOutlined } from '@ant-design/icons';


import locationIcon from '../../../components/eventsRegister/assets/locationmarker.svg';
import linkIcon from '../../../components/eventsRegister/assets/link.svg';
import binIcon from '../../../components/eventsRegister/assets/bin.svg';
import blueplusIcon from '../../../components/eventsRegister/assets/blueplus.svg';
import calendarIcon from '../../../components/eventsRegister/assets/calendaricon.svg';
import timedownIcon from '../../../components/eventsRegister/assets/timedown.svg';
import blueTickIcon from '../../../components/eventsRegister/assets/bluetick.svg';
import pencilIcon from '../../../components/eventsRegister/assets/pencil.svg';

import axios from '../../axios';
import {validateData, cleanData} from './validators';
import {INITIAL_STATE} from './constants';
import { SPEAKER_SPECIALITY, TOPIC_AREAS, LANGUAGE_OPTIONS } from '../../../components/speakerRegister/subcomponents/expertise/constants';
import { EVENT_LOCATION, EVENT_FREQUENCY, EVENT_INTERVAL } from '../../../components/eventsRegister/component/constants';


import '../updates.scss';
import './eventProfileUpdate.scss';
import { jsonParse } from '../../utils';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
const DateSuffix = () => <img height='14px' src={calendarIcon} alt='calendar' />;
const TimeSuffix = () => <img src={timedownIcon} alt='calendar' style={{ marginTop: '5px' }} />;
const DAY_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const monthFormat = 'DD-MM-YY';

export default function Index({ onClose, initialData, onSuccess, eventId }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const {
        schedule, name, theme, language
    } = initialData;

    const changeSelectState = (name, value) => {
        setState({
            ...state,
            [name]:value
        })
    }

    const deleteLink = (index) => {
        const links = [...state.onlineLink]
        const filteredLinks = links.filter((link,i)=>(
            i !== index
        ))
        changeSelectState('onlineLink', filteredLinks)
    }
    const addOnlineLink = (index, value) => {
        const links = [...state.onlineLink]
        links[index] = value
        changeSelectState('onlineLink', links)
    }

    const saveState = () => {
        console.log(state);
		const valid = validateData(state);
		if (valid) {
			// set lading state
			setLoading(true);
			// make patch request
			axios
				.patch(`speakers/expertise`, {
					expertise: cleanData(state),
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

    useEffect(() => {
        if (!initialData) return;
        const [{
            date,
            frequency,
            interval_day_of_week,
            intervals,
            onlineLink,
            physicalLink,
            time,
        }] = schedule;
        // set the location type
        let locationType = null;
        let dateFrom = [];
        let dateTo = [];
        let timeFrom = [];
        let timeTo = [];
    
        if(onlineLink && physicalLink){
            locationType = 'Physical and Virtual'
        }else if(onlineLink && !physicalLink){
            locationType = 'Virtual'
        }else{
            locationType = 'Physical'
        }
        // set teh physical and online links
        // set the final state
        if(date){
            const parsedDateFrom = date.split('-').slice(0,3).join('-');
            const parsedDateTo = date.split('-').slice(3).join('-');

            dateFrom = [moment(parsedDateFrom, monthFormat), parsedDateFrom];
            dateTo = [moment(parsedDateTo, monthFormat), parsedDateTo];
        }

        if(time){
            const splitTime = time.split('-');
            timeFrom = [moment(splitTime[0], 'HH:mm'), splitTime[0]]
            timeTo = [moment(splitTime[1], 'HH:mm'), splitTime[1]]
        }
    
        setState({
            ...state,
            name,
            theme,
            language,
            location: locationType,
            onlineLink: jsonParse(onlineLink),
            physicalLink,
            frequency,
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
            interval: intervals,
            interval_day_of_week
        })

    }, [initialData])

    return (
        <div className="updates event_profile">
            <div className='updates__form'>
                <div className='updates__form__header'>
                    Edit Event
                </div>

                <div className='updates__form__header__preform'>
					Event Details
				</div>
                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                        <label htmlFor='fullname'>Event Name</label>
                        <input
                            type="text"
                            value={state.name}
                            name="name"
                            onChange={
                                ({target:{name, value}})=>{
                                    changeSelectState(name, value)
                                }
                            }
                            placeholder="Enter event name"
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor='fullname'>Event Theme</label>
                        <input
                            type="text"
                            value={state.theme}
                            name="theme"
                            onChange={
                                ({target:{name, value}})=>{
                                    changeSelectState(name, value)
                                }
                            }
                            placeholder="Enter event theme"
                        />
                    </div>

                    <div className="updates__form__content__item">
                        <label htmlFor='fullname'>Language</label>
                        <div className='--multiselect --white'>
                            <MultiSelect
                                options={LANGUAGE_OPTIONS}
                                selected={state.language}
                                onSelectedChanged={(selected) => changeSelectState('language', selected)}
                                overrideStrings={{
                                    selectSomeItems: <span className='placeholding_text'>Select</span>,
                                }}
                            />
                        </div>
                    </div>

                </div>


            </div>
            
            {/* long and tedious logic to update the location snd schedule */}
            <div className="updates__form">
                <div className='updates__form__header__preform'>
                    Event Schedule
				</div>

                <div className="updates__form__content">
                    <div className='updates__form__content__item --smallmargin'>
                        <label htmlFor='fullname'>Location</label>
                        <div className='--singleselect'>
                            <Select
                                options={EVENT_LOCATION}
                                isSearchable
                                placeholder='Select'
                                className='--item'
                                onChange={(value) => changeSelectState('location', value.value)}
                                value={
                                    {
                                        value: state.location,
                                        label: state.location
                                    }
                                    
                                }
                            />
                        </div>
                    </div>
                    
                    {
                        (['Physical','Physical and Virtual'].includes(state.location))
                        &&
                        (
                        <div className="updates__form__content__item --smallmargin --inputandicon">
                            <img class="icon" src={locationIcon} alt=""/>
                            <input
                                maxLength="30"
                                type="text"
                                id="physicalLink"
                                name="physicalLink"
                                onChange={(e) => changeSelectState('physicalLink', e.target.value)}
                                value={state.physicalLink}
                                placeholder="Enter event link"
                                required
                            />
                        </div>
                        )
                    }
                    {
                        (['Virtual','Physical and Virtual'].includes(state.location))
                        &&
                        (
                            state.onlineLink.map((link, i)=>(
                                <>
                                <div className="updates__form__content__item --smallmargin --inputandicon">
                                    <img class="icon" src={linkIcon} alt=""/>
                                    <input
                                        maxLength="30"
                                        type="text"
                                        id="eventLink"
                                        name="eventLink"
                                        onChange={
                                            (e) => addOnlineLink(i, e.target.value)
                                        }
                                        value={link}
                                        placeholder="Enter event link"
                                        required
                                    />
                                    {
                                        (i !== 0)
                                        &&
                                        <img
                                            class="bin"
                                            src={binIcon}
                                            alt=""
                                            onClick={
                                                () => deleteLink(i)
                                            }
                                        />
                                    }
                                </div>
                                {
                                    (i === state.onlineLink.length - 1)
                                    &&
                                    (
                                        <div
                                            className="--addnew"
                                            onClick={
                                                () => changeSelectState('onlineLink',[...state.onlineLink, ''] )
                                            }
                                        >
                                            <img src={blueplusIcon} alt=""/>
                                            <span>Add New Link </span>
                                        </div>
                                    )
                                }
                                </>
                            ))
                        
                        )
                    }

                    <div className='updates__form__content__item --largemargintop'>
                        <label htmlFor='fullname'>Event Frequency</label>
                        <div className='--singleselect'>
                            <Select
                                options={EVENT_FREQUENCY}
                                isSearchable
                                placeholder='Select'
                                className='--item'
                                onChange={(value) => changeSelectState('frequency', value.value)}
                                value={
                                    {
                                        value: state.frequency,
                                        label: state.frequency
                                    }
                                    
                                }
                            />
                        </div>
                    </div>

                    {
                        (['Single-day Event'].includes(state.frequency))
                        &&
                        (
                            <>
                                {/* ##################### single event option  #####################*/}
                                <div className="updates__form__content__item">
                                    <label htmlFor="birthdate">Date</label>
                                    <DatePicker
                                        format={monthFormat}
                                        placeholder="dd-mm-yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            setState({
                                                ...state,
                                                dateFrom: [momentDate, dateString],
                                                dateTo : [momentDate, dateString]
                                            });

                                        }}
                                        disabledDate={d => !d || d.isBefore(moment())}
                                        value={state.dateFrom[0]}
                                    />
                                </div>

                                <div className="updates__form__content__item">
                                    <label htmlFor="birthdate">Time</label>
                                    <div className="--double_wrapper --half_date">
                                        <TimePicker
                                            format={'HH:mm'}
                                            placeholder="08:00AM"
                                            suffixIcon={<TimeSuffix />}
                                            onChange={(momentDate, dateString)=>{
                                                setState({
                                                ...state,
                                                    timeFrom: [momentDate, dateString],
                                                });
                                            }}
                                            value={state.timeFrom[0]}
                                        />
                                        <span>to</span>
                                        <TimePicker
                                            format={'HH:mm'}
                                            picker="month"
                                            placeholder="08:00AM"
                                            suffixIcon={<TimeSuffix />}
                                            onChange={(momentDate, dateString)=>{
                                                setState({
                                                ...state,
                                                    timeTo: [momentDate, dateString],
                                                });
                                            }}
                                            disabledDate={d =>!d || d.isBefore(state.timeFrom[0]) }
                                            value={state.timeTo[0]}
                                        />
                                    </div>
                                </div>
                                {/* ##################### single event option #####################*/}
                            </>
                        )
                    }

                    {
                    (['Multi-day Event'].includes(state.frequency))
                    &&
                    (
                        <>                        
                            {/* ##################### multi event option ###################### */}
                            {/* wrapper for the date of tehe event */}
                            <div className="updates__form__content__item">
                                <label htmlFor="birthdate">Date</label>
                                <div className="--date_wrapper --half_date">

                                    <DatePicker
                                        format={monthFormat}
                                        placeholder="dd-mm-yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            setState({
                                            ...state,
                                                dateFrom: [momentDate, dateString],
                                            });

                                        }}
                                        disabledDate={d => !d || d.isBefore(moment())}
                                        value={state.dateFrom[0]}
                                    />

                                    <span>to</span>

                                    <DatePicker
                                        format={monthFormat}
                                        placeholder="dd-mm-yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            setState({
                                            ...state,
                                                dateTo: [momentDate, dateString],
                                            });

                                        }}
                                        disabledDate={d => !d || d.isBefore(state.dateFrom[0])}
                                        value={state.dateTo[0]}
                                    />

                                </div>
                            </div>

                            {/* wrapper for the date of tehe event */}
                            <div className="updates__form__content__item">
                                <label htmlFor="birthdate">Time</label>
                                <div className='--date_wrapper --half_date'>
                                    <TimePicker
                                        format={'HH:mm'}
                                        placeholder='08:00AM'
                                        suffixIcon={<TimeSuffix />}
                                        onChange={(momentDate, dateString) => {
                                            setState({
                                                ...state,
                                                timeFrom: [momentDate, dateString],
                                            });
                                        }}
                                        value={state.timeFrom[0]}
                                    />
                                    <span>to</span>
                                    <TimePicker
                                        format={'HH:mm'}
                                        picker='month'
                                        placeholder='08:00AM'
                                        suffixIcon={<TimeSuffix />}
                                        onChange={(momentDate, dateString) => {
                                            setState({
                                                ...state,
                                                timeTo: [momentDate, dateString],
                                            });
                                        }}
                                        value={state.timeTo[0]}
                                    />
                                </div>
                            </div>
						{/* ##################### multi event option ###################### */}
					</>
                    )}

                    {['Recurring Event'].includes(state.frequency) && (
					<>
						{/* ############# recurring event ########## */}
						<div className='updates__form__content__item'>
							<label htmlFor='position'>
								Interval
							</label>
							<div className='--singleselect --iconinput'>
								<Select
									options={EVENT_INTERVAL}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('interval', value.value)}
									value={{
                                        label: state.interval,
                                        value: state.interval
                                    }}
								/>
							</div>
						</div>
						{['Weekly', 'Monthly'].includes(state.interval) && (
							<>
								<div className='updates__form__content__item'>
									<label htmlFor='position'>
										Day of the Week
									</label>
									<div className='day_of_week'>
										{DAY_OF_WEEK.map((day, i) => (
											<div
												key={i}
												className={`day ${day.toLowerCase() === state.interval_day_of_week.toLowerCase() ? 'active' : ''}`}
												onClick={() => {
													changeSelectState('interval_day_of_week', day);
												}}>
												{day}
											</div>
										))}
									</div>
								</div>
								<div className='updates__form__content__item'>
									<label htmlFor='birthdate'>From</label>
									<div className='--date_wrapper --half_date'>
										<DatePicker
											format={monthFormat}
											placeholder='dd-mm-yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												setState({
													...state,
													dateFrom: [momentDate, dateString],
												});
											}}
											value={state.dateFrom[0]}
                                            disabledDate={d => !d || d.isAfter(moment())}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											placeholder='dd-mm-yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												setState({
													...state,
													dateTo: [momentDate, dateString],
												});
											}}
											value={state.dateTo[0]}
                                            disabledDate={d => !d || d.isBefore(state.dateFrom[0])}
										/>
									</div>
								</div>
								<div className='updates__form__content__item'>
									<label htmlFor='birthdate'>Time</label>
									<div className='--date_wrapper --half_date'>
										<TimePicker
											format={'HH:mm'}
											placeholder='08:00AM'
											suffixIcon={<TimeSuffix />}
											onChange={(momentDate, dateString) => {
												setState({
													...state,
													timeFrom: [momentDate, dateString],
												});
											}}
											value={state.timeFrom[0]}
										/>
										<span>to</span>
										<TimePicker
											format={'HH:mm'}
											picker='month'
											placeholder='08:00AM'
											suffixIcon={<TimeSuffix />}
											onChange={(momentDate, dateString) => {
												setState({
													...state,
													timeTo: [momentDate, dateString],
												});
											}}
											value={state.timeTo[0]}
										/>
									</div>
								</div>
							</>
						)}

						{/* ############## weekly event ########################### */}
						{/* recurring event */}
					</>
				)}


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
    )
}
