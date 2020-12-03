import React,{useState, useEffect} from 'react';

import moment from 'moment';
import {message, Checkbox} from 'antd';
import { DatePicker } from 'antd';
import calendarIcon from '../../../assets/calendar.svg';
import blueCircle from '../assets/blueCircle.svg';
import closeTag from '../assets/closeTag.svg';

import '../updates.scss';
import './speakerEducationUpdates.scss';

export default function Index({
    onClose, initialData
}) {
    const [state, setState] = useState([
        {
            institution: "",
            field_of_study: "",
            from: "",
            to: ""
        }
    ]);

    useEffect(() => {
        if(!initialData)return;
        setState(initialData);
    }, [initialData]);

    const deleteFormItem = (index) => {
		const oldItem = state.filter((s, eduIndex)=>(
			index !== eduIndex
		));
		setState(oldItem)
    }
    const savePositionDetails = () => {
        // sucesfully save details and then alert
        message.success("Profile Sucessfully updated!");
        onClose()
    }
    const changeListData = (index, property, value) => {
		const updatedState = [...state];
		updatedState[index][property] = value;
		setState(updatedState);
    };
    const monthFormat = 'MM/YY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );

    return (
        <div className="updates position">

            <div className="updates__form">
                <div className="updates__form__header">
                    Education
                </div>

                {
                    state.map((education, index) => (
                        <div
                            key={`${index}-education`}
                            className="updates__form__content --withmargin"
                        >
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
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Enter School Name"
                                    value={education.institution}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Field of Study
                                </label>
                                <input
                                    type="text"
                                    name="field_of_study"
                                    placeholder="Enter Field of Study"
                                    value={education.field_of_study}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    From
                                </label>
                                <div className="--date_wrapper --half_date">
                                        <DatePicker
                                            format={monthFormat}
                                            picker="month"
                                            placeholder="mm/yy"
                                            suffixIcon={<DateSuffix />}
                                            onChange={(momentDate, dateString)=>{
                                                changeListData(index, 'from', dateString)
                                            }}
                                            value={
                                                education.from?
												moment(education.from, monthFormat):''
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
                                                changeListData(index, 'to', dateString)
                                            }}
                                            value={
                                                education.to?
												moment(education.to, monthFormat):''   
                                            }
                                            disabledDate={d => !d || d.isBefore(education.from)}
                                        />
                                    </div>
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
                                position: "",
                                company: "",
                                from: "",
                                to: ""
                            }
                        ]);
                    }}
                >
                    <img src={blueCircle} alt='' />
                    <span>Add New Position</span>
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
                    onClick={savePositionDetails}
                >
                    Save
                </div>
            </div>

        </div>
    )
}
