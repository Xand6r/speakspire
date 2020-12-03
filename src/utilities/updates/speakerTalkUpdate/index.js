import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {message} from 'antd';
import { DatePicker } from 'antd';
import calendarIcon from '../../../assets/calendar.svg';
import blueCircle from '../assets/blueCircle.svg';
import closeTag from '../assets/closeTag.svg';

import '../updates.scss';
import './speakerTalksUpdate.scss';

export default function Index({
    onClose, initialData
}) {

    const [state, setState] = useState([
        {
            eventName: "",
            talkTopic: "",
            location: "",
            talkYear: ""
        }
    ]);

    const deleteFormItem = (index) => {
		const oldItem = state.filter((s, eduIndex)=>(
			index !== eduIndex
		));
		setState(oldItem)
	}
    const saveTalkDetails = () => {
        // sucesfully save details and then alert
        message.success("Profile Sucessfully updated!");
        onClose()
    }
    const stateChanger = (key, value) =>{
        setState({
            ...state,
            [key]:value
        })
    }

    const changeListData = (index, property, value) => {
		const updatedState = [...state];
		updatedState[index][property] = value;
		setState(updatedState);
    };

    useEffect(() =>{
        // set the state locally
    }, [initialData])

    const monthFormat = 'YYYY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );
    return (
        <div className="updates talks">
            
            <div className="updates__form">
                <div className="updates__form__header">
                    Edit Topic Areas
                </div>
                {
                    state.map((talk, index) => (
                        <div 
                            key={`${index}-talktopic`}
                            className="updates__form__content --withmargin">
                            {
                                (index !== 0) &&
                                <img
                                    src={closeTag}
                                    alt=""
                                    className="form_close"
                                    onClick={() => deleteFormItem(index)}
                                />
                            } 
                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Event Name
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    placeholder="Enter event name"
                                    value={talk.eventName}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Talk Topic
                                </label>
                                <input
                                    placeholder="Enter topic"
                                    type="text"
                                    name="talkTopic"
                                    value={state.talkTopic}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Location
                                </label>
                                <input
                                    placeholder="Location"
                                    type="text"
                                    name="location"
                                    value={talk.location}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Year
                                </label>
                                <DatePicker
                                    placeholder="yyyy"
                                    suffixIcon={<DateSuffix />}
                                    onChange={(momentDate, dateString)=>{
                                        changeListData(index, 'talkYear', dateString);

                                    }}
                                    picker="year"
                                    value={talk.talkYear? moment(talk.talkYear) : ''}
                                    disabledDate={d => !d || d.isAfter(moment())}
                                />
                            </div>

                        </div>
                    ))
                }
                <div
                    className="updates__form__footer"
                    onClick={() => {
                        setState([
                            ...state,
                            {
                                eventName: "",
                                talkTopic: "",
                                location: "",
                                talkYear: ""
                            }
                        ]);
                    }}
                >
                    <img src={blueCircle} alt='' />
                    <span>Add New Education</span>
                </div>
            </div>

            <div className="updates__action">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    Cancel
                </div>

                <div
                    className="save"
                    onClick={saveTalkDetails}
                >
                    Save
                </div>
            </div>
        </div>
    )
}
