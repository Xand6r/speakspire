import React,{useState, useEffect} from 'react';

import moment from 'moment';
import {message, Checkbox} from 'antd';
import { DatePicker } from 'antd';
import calendarIcon from '../../../assets/calendar.svg';
import blueCircle from '../assets/blueCircle.svg';
import closeTag from '../assets/closeTag.svg';

import '../updates.scss';
import './speakerPositionUpdates.scss';

export default function Index({
    onClose, initialData
}) {
    const [state, setState] = useState([
        {
            position: "",
            company: "",
            from: "",
            to: ""
        }
    ]);

    useEffect(() => {
        if(!initialData) return;
        setState(initialData);
        
    }, [initialData])
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
                    Position
                </div>

                {
                    state.map((position, index) => (
                        <div
                            key={`${index}-position`}
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
                                    Position
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="Enter Position"
                                    value={position.position}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Enter Company"
                                    value={position.company}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Company
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
                                                changeListData(index, 'to', dateString)
                                            }}
                                            value={
                                                position.to?
												moment(position.to, monthFormat):''   
                                            }
                                            disabledDate={d => !d || d.isBefore(position.from) || d.isAfter(moment())}
                                        />
                                    </div>
                                    <div className="--tilldate">
										<Checkbox 
											onChange={(e)=>{
												if(e.target.checked){
													changeListData(index, 'to', moment().format(monthFormat))
												}else{
													changeListData(index, 'to', '')
												}
											}}
										>
											Till Date
										</Checkbox>
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