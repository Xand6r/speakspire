import React, { useState } from 'react';
import { DatePicker, TimePicker, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import './schedule.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss';

import { EVENT_LOCATION, EVENT_FREQUENCY, EVENT_INTERVAL } from '../../component/constants';

import locationIcon from '../../assets/locationmarker.svg';
import linkIcon from '../../assets/link.svg';
import binIcon from '../../assets/bin.svg';
import blueplusIcon from '../../assets/blueplus.svg';
import calendarIcon from '../../assets/calendaricon.svg';
import timedownIcon from '../../assets/timedown.svg';
import blueTickIcon from '../../assets/bluetick.svg';
import pencilIcon from '../../assets/pencil.svg';

const DAY_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const monthFormat = 'DD-MM-YY';
const DateSuffix = () => <img height='14px' src={calendarIcon} alt='calendar' />;
const TimeSuffix = () => <img src={timedownIcon} alt='calendar' style={{ marginTop: '5px' }} />;
function onChange(e) {
	console.log(`checked = ${e.target.checked}`);
}
export default function Schedule({
    stateChanger, state
}) {
    console.log(state)

    const changeSelectState = (name, value)=>{
        stateChanger({
            ...state,
            [name]: value
        });
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

    return (
        <div className="schedule">
            
            <div className="schedule__heading">
                <div className="schedule__heading__header">
                    Schedule
                </div>
            </div>

            <div className="schedule__formsection">

            {/* #################### section for location ######################### */}

                <div className="schedule__formsection__section">
                    
                    <label className="double" htmlFor="position">
                        Location
                    </label>
                    <div className="--singleselect">
                        <Select
                            options={EVENT_LOCATION}
                            isSearchable
                            placeholder="Select"
                            className="--item"
                            onChange={(value) => changeSelectState('location', value)}
                            value={state.location}
                        />
                        {
                            (['Physical','Physical and Virtual'].includes(state.location.label))
                            &&
                            (
                            <div className="--optionalinput --inputandicon">
                                <img class="icon" src={locationIcon} alt=""/>
                                <input
                                    maxLength="30"
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    onChange={(e) => changeSelectState('physicalLink', e.target.value)}
                                    value={state.physicalLink}
                                    placeholder="Enter event location"
                                    required
                                />
                            </div>
                            )
                        }
                        {
                            (['Virtual','Physical and Virtual'].includes(state.location.label))
                            &&
                            (
                                state.onlineLink.map((link, i)=>(
                                    <>
                                    <div className="--optionalinput --inputandicon">
                                        <img class="icon" src={linkIcon} alt=""/>
                                        <input
                                            maxLength="30"
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            onChange={
                                                (e) => addOnlineLink(i, e.target.value)
                                            }
                                            value={state.onlineLink[i]}
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
                    </div>

                </div>

            {/* #################### section for location ######################### */}


            {/*  #################### section for event frequency ################# */}
                <div className="schedule__formsection__section">
                    
                    <label className="double" htmlFor="position">
                        Event Frenquency
                    </label>
                    <div className="--singleselect --iconinput">

                        <Select
                            options={EVENT_FREQUENCY}
                            isSearchable
                            placeholder="Enter event location"
                            className="--item"
                            onChange={(value) => changeSelectState('frequency', value)}
                            value={state.frequency}
                        />
                    </div>

                </div>
                {
                    (['Single-day Event'].includes(state.frequency.label))
                    &&
                    (
                        <>
                            {/* ##################### single event option  #####################*/}
                            <div className="schedule__formsection__section">
                                <label htmlFor="birthdate">Date</label>
                                <DatePicker
                                    format={monthFormat}
                                    placeholder="dd-mm-yy"
                                    suffixIcon={<DateSuffix />}
                                    onChange={(momentDate, dateString)=>{
                                        stateChanger({
                                            ...state,
                                            dateFrom: [momentDate, dateString],
                                            dateTo : [momentDate, dateString]
                                        });

                                    }}
                                    value={state.dateFrom[0]}
                                />
                            </div>

                            <div className="schedule__formsection__section">
                                <label htmlFor="birthdate">Time</label>
                                <div className="--double_wrapper --half_date">
                                    <TimePicker
                                        format={'HH:mm'}
                                        placeholder="08:00AM"
                                        suffixIcon={<TimeSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            stateChanger({
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
                                            stateChanger({
                                            ...state,
                                                timeTo: [momentDate, dateString],
                                            });
                                        }}
                                        value={state.timeTo[0]}
                                    />
                                </div>
                            </div>
                            {/* ##################### single event option #####################*/}
                        </>
                    )
                }

                {
                    (['Multi-day Event'].includes(state.frequency.label))
                    &&
                    (
                        <>                        
                            {/* ##################### multi event option ###################### */}
                            {/* wrapper for the date of tehe event */}
                            <div className="schedule__formsection__section">
                                <label htmlFor="birthdate">Date</label>
                                <div className="--date_wrapper --half_date">

                                    <DatePicker
                                        format={monthFormat}
                                        placeholder="dd-mm-yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            stateChanger({
                                            ...state,
                                                dateFrom: [momentDate, dateString],
                                            });

                                        }}
                                        value={state.dateFrom[0]}
                                    />

                                    <span>to</span>

                                    <DatePicker
                                        format={monthFormat}
                                        placeholder="dd-mm-yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            stateChanger({
                                            ...state,
                                                dateTo: [momentDate, dateString],
                                            });

                                        }}
                                        value={state.dateTo[0]}
                                    />

                                </div>
                            </div>
                            {/* wrapper for the date of tehe event */}

                            <div className="schedule__formsection__section">
                                <label htmlFor="birthdate">Time</label>
                                <div className="--checkboxes">
                                    <Checkbox checked onChange={onChange}>
                                        Use the same time and location for all days
                                    </Checkbox>
                                    {/* <Checkbox onChange={onChange}>
                                        Edit the time or location for each day
                                    </Checkbox> */}
							</div>
							<div className='--date_wrapper --half_date'>
								<TimePicker
									format={'HH:mm'}
									placeholder='08:00AM'
									suffixIcon={<TimeSuffix />}
									onChange={(momentDate, dateString) => {
										stateChanger({
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
										stateChanger({
											...state,
											timeTo: [momentDate, dateString],
										});
									}}
									value={state.timeTo[0]}
								/>
							</div>
							{true || (
								<div className='edittime'>
									{/* <div className="edittime__tab active"> */}
									<div className='edittime__tab'>
										<span>Day 1</span>
										<div className='edittime__tab__extra'>
											<img src={pencilIcon} alt='' />
										</div>
									</div>

									<div className='edittime__content'>
										<label className='time'> Time</label>
										<div className='--date_wrapper --half_date'>
											<TimePicker
												format={'HH:mm'}
												placeholder='08:00AM'
												suffixIcon={<TimeSuffix />}
												//onChange={(momentDate, dateString)=>{
												//    changeListData('education', index, 'from',  [momentDate, dateString])

												//}}
												//value={education.from[0]}
											/>
											<span className='to'>to</span>
											<TimePicker
												format={'HH:mm'}
												picker='month'
												placeholder='08:00AM'
												suffixIcon={<TimeSuffix />}
												//onChange={(momentDate, dateString)=>{
												//    changeListData('education', index, 'to',  [momentDate, dateString])

												// }}
												//value={education.to[0]}
											/>
										</div>

										<div className='schedule__formsection__section sub'>
											<label className='double' htmlFor='position'>
												Location
											</label>
											<div className='--singleselect --iconinput'>
												<Select
													options={EVENT_FREQUENCY}
													isSearchable
													placeholder='Enter event location'
													className='--item'
													//onChange={(value) => changeSelectState('speciality', value)}
													//value={state.speciality}
												/>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* ##################### multi event option ###################### */}
					</>
				)}
				{['Recurring Event'].includes(state.frequency.label) && (
					<>
						{/* ############# recurring event ########## */}
						<div className='schedule__formsection__section'>
							<label className='double' htmlFor='position'>
								Interval
							</label>
							<div className='--singleselect --iconinput'>
								<Select
									options={EVENT_INTERVAL}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('interval', value)}
									value={state.interval}
								/>
							</div>
						</div>
						{['Weekly', 'Monthly'].includes(state.interval.label) && (
							<>
								<div className='schedule__formsection__section'>
									<label className='double' htmlFor='position'>
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
								<div className='schedule__formsection__section'>
									<label htmlFor='birthdate'>From</label>
									<div className='--date_wrapper --half_date'>
										<DatePicker
											format={monthFormat}
											placeholder='dd-mm-yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												stateChanger({
													...state,
													dateFrom: [momentDate, dateString],
												});
											}}
											value={state.dateFrom[0]}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											placeholder='dd-mm-yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												stateChanger({
													...state,
													dateTo: [momentDate, dateString],
												});
											}}
											value={state.dateTo[0]}
										/>
									</div>
								</div>
								<div className='schedule__formsection__section'>
									<label htmlFor='birthdate'>Time</label>
									<div className='--checkboxes'>
										<Checkbox checked onChange={onChange}>
											Use the same time and location for all days
										</Checkbox>
										{/* <Checkbox onChange={onChange}>
                                                Edit the time or location for each day
                                            </Checkbox> */}
									</div>
									<div className='--date_wrapper --half_date'>
										<TimePicker
											format={'HH:mm'}
											placeholder='08:00AM'
											suffixIcon={<TimeSuffix />}
											onChange={(momentDate, dateString) => {
												stateChanger({
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
												stateChanger({
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
				{/*  #################### section for event frequency ################# */}
			</div>

			<div className='schedule__footer'>
				<div className='--button_group'>
					<Link className='link' to='/organiser/1'>
						<div className='cancel'>Back</div>
					</Link>

					<Link
						className='link'
						to='/registerevent/3'
						onClick={() => {
							console.log(state);
						}}>
						<div className='next'>Save & Continue</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

Schedule.propTypes = {
	stateChanger: PropTypes.func.isRequired,
	state: PropTypes.instanceOf(Object).isRequired,
};
