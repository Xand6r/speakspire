import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { DatePicker, Checkbox } from 'antd';
import Select from 'react-select';
import PropTypes from 'prop-types';
import closeTag from '../../assets/close.svg';
import moment from 'moment';

import {
    DEFAULT_SINGLE_OPTIONS, YEARS_OF_EXPERIENCE,
    NUMBER_OF_ENGAGEMENTS
} from './constants';

import {
    SPEAKER_EXPERIENCE_KEY
} from '../../component/constants';

import {
    cacheFormState
} from '../../../../utilities/dataPersist'

import './experience.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss'

import blueCircle from '../../assets/circlePlus.svg';
import calendarIcon from '../../../../assets/calendar.svg'
export default function Experience({
    stateChanger, state
}) {

    const changeSelectState = (name, value)=>{
        stateChanger({
            ...state,
            [name]: value
          });
    }

    useEffect(()=>{
        cacheFormState(SPEAKER_EXPERIENCE_KEY, state)
    },[state])
     
    const changeListData = (property, index, subproperty,  value) =>{
        const updatedState = {...state};
        updatedState[property][index][subproperty] = value;
        stateChanger(updatedState);
    }

    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    };

    const deleteFormItem = (index, key) => {
		const oldItem = state[key].filter((edu, eduIndex)=>(
			index !== eduIndex
		));
		stateChanger({
			...state,
			[key]: oldItem
		});
	}

    const monthFormat = 'MM/YY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    )

    return (
        <div className="experience">

            <div className="personaldetails__heading">
                <div className="personaldetails__heading__header">
                    Experience
                </div>
            </div>

            <div className="experience__formsection">

                <div className="experience__formsection__section --last">
                    <div className="experience__formsection__section__header">
                        <div className="--heading">Current Position</div>
                        <div className="--sub_heading">
                            This is the primary position to be displayed on your profile.
                        </div>
                    </div>
                    {
                        state.positions.map( (position, index) => (
                            <div className="experience__formsection__section__form">
                            {
									(index !== 0) &&
									<img
										src={closeTag}
										alt=""
										className="form_close"
										onClick={() => deleteFormItem(index, 'positions')}
									/>
								}
                                <div className="--input_wrapper">
                                    <label htmlFor="position">Position</label>
                                    <input
                                        name="position"
                                        type="text"
                                        placeholder="Eg. Marketing Manager"
                                        onChange={(e) => {
                                            changeListData('positions', index, 'position',  e.target.value)
                                        }}
                                        value={position.position}
                                    />
                                </div>

                                <div className="--input_wrapper">
                                    <label htmlFor="company">Company</label>
                                    <input
                                        name="company"
                                        type="text"
                                        placeholder="Eg. Speakspire"
                                        onChange={(e) => {
                                            changeListData('positions', index, 'company',  e.target.value)
                                        }}
                                        value={position.company}
                                    />
                                </div>

                                <div className="--input_wrapper">
                                    <label htmlFor="dates">From</label>
                                    <div className="--tilldate">
										<Checkbox 
											onChange={(e)=>{
												if(e.target.checked){
													changeListData('positions', index, 'to', moment().format(monthFormat))
												}else{
													changeListData('positions', index, 'to', '')
												}
											}}
										>
											Till Date
										</Checkbox>
									</div>
                                    <div className="--date_wrapper --half_date">
                                        <DatePicker
                                            format={monthFormat}
                                            picker="month"
                                            placeholder="mm/yy"
                                            suffixIcon={<DateSuffix />}
                                            onChange={(momentDate, dateString)=>{
                                                changeListData('positions', index, 'from', dateString)
                                            }}
                                            value={
                                                position.from?
												moment(position.from, monthFormat):''
                                            }
                                            disabledDate={d => !d || d.isAfter(moment())}
                                        />
                                        <span>to</span>
                                        <DatePicker
                                            format={monthFormat}
                                            picker="month"
                                            placeholder="mm/yy"
                                            suffixIcon={<DateSuffix />}
                                            onChange={(momentDate, dateString)=>{
                                                changeListData('positions', index, 'to', dateString)
                                            }}
                                            value={
                                                position.to?
												moment(position.to, monthFormat):''   
                                            }
                                            disabledDate={d => !d || d.isBefore(position.from) || d.isAfter(moment())}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        ))
                    }
                    <div 
                        className="experience__formsection__section__footer"
                        onClick={() => {
                            stateChanger({
                                ...state,
                                positions: [...state.positions, {
                                    position:'',
                                    company:'',
                                    from:'',
                                    to:'',
                                }]
                            })
                        }}
                    >
                        <img 
                            src={blueCircle}
                            alt=""
                        />
                        <span>
                            Add New Position
                        </span>
                    </div>
                </div>

                <div className="experience__formsection__section">
                    
                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Years of Professional Experience
                            </label>
                            <div className="--singleselect">
                            <Select
                                options={YEARS_OF_EXPERIENCE}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(value) => changeSelectState('experience_years', value)}
                                value={state.experience_years}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Number of Professional Speaking Engagements
                            </label>
                            <div className="--singleselect">
                            <Select
                                options={NUMBER_OF_ENGAGEMENTS}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(value) => changeSelectState('engagement_no', value)}
                                value={state.engagement_no}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label className="double" htmlFor="bio">
                                Unique Selling Proposition (USP)
                                <span>
                                    What makes you different from other speakers? (Max. 25 words)
                                </span>
                            </label>
                            <textarea
                                name="unique_selling_proposition"
                                type="text"
                                placeholder="Enter Your Short Bio"
                                value={state.unique_selling_proposition}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label className="double" htmlFor="fullbio">
                                Full Bio
                                <span>
                                    Tell us more about you, your skillset and experience
                                </span>
                            </label>
                            <textarea
                                name="fullbio"
                                type="text"
                                placeholder="Enter Your Full Bio"
                                value={state.fullbio}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                </div>
            
            </div>

            <div className="experience__footer">

                <div className="--button_group">
                    <Link className="link" to="/register/2">
                        <div className="cancel">
                            Back
                        </div>
                    </Link>

                    <Link className="link" to="/register/4">
                        <div className="next">
                            Next
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

Experience.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
