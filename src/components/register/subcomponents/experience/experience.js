import React, {useState} from 'react';
import { DatePicker } from 'antd';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import MultiSelect from "@khanacademy/react-multi-select";
import PropTypes from 'prop-types';

import './experience.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss'

import blueCircle from '../../assets/circlePlus.svg';
import calendarIcon from '../../../../assets/calendar.svg'
export default function Experience({
    stateChanger, state
}) {
    const multi_options = [
        { label: "Grapes", value: "grapes" },
        { label: "Mango", value: "mango" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Watermelon", value: "watermelon" },
        { label: "Pear", value: "pear" },
        { label: "Apple", value: "apple" },
        { label: "Tangerine", value: "tangerine" },
        { label: "Pineapple", value: "pineapple" },
        { label: "Peach ", value: "peach" },
    ];
     
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const [inputState, setInputState] = useState("");
    const changeInputState = (value) =>{
        if (value.length < 20){
            setInputState(value)
        }
    };
    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    };
    const changeDate = (momentDate, dateString ,name) =>{
        stateChanger({
            ...state,
            [name]: [momentDate, dateString ]
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
                    <div className="experience__formsection__section__form">
                        <div className="--input_wrapper">
                            <label htmlFor="position">Position</label>
                            <input
                                name="position"
                                type="text"
                                placeholder="Eg. Marketing Manager"
                                onChange={handleFormChange}
                                value={state.position}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="company">company</label>
                            <input
                                name="company"
                                type="text"
                                placeholder="Eg. Speakspire"
                                onChange={handleFormChange}
                                value={state.company}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="dates">From</label>
                            <div className="--date_wrapper --half_date">
                                <DatePicker
                                    format={monthFormat}
                                    picker="month"
                                    placeholder="mm/yy"
                                    suffixIcon={<DateSuffix />}
                                    onChange={(momentDate, dateString)=>{
                                        changeDate(momentDate, dateString, 'exp_dateFrom');
                                    }}
                                    value={state.exp_dateFrom[0]}
                                />
                                <span>to</span>
                                <DatePicker
                                    format={monthFormat}
                                    picker="month"
                                    placeholder="mm/yy"
                                    suffixIcon={<DateSuffix />}
                                    onChange={(momentDate, dateString)=>{
                                        changeDate(momentDate, dateString, 'exp_dateTo');
                                    }}
                                    value={state.exp_dateTo[0]}
                                />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="experience__formsection__section__footer"
                    >
                        <img 
                            src={blueCircle}
                            alt=""
                        />
                        <span>
                            Add New Education
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
                            <Select options={options} isSearchable placeholder="Select" className="--item" />
                            </div>
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Number of Professional Speaking Engagements
                            </label>
                            <div className="--singleselect">
                            <Select options={options} isSearchable placeholder="Select" className="--item" />
                            </div>
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label class="double" htmlFor="bio">
                                Unique Selling Proposition (USP)
                                <span>
                                    What makes you different from other speakers? (Max. 25 words)
                                </span>
                            </label>
                            <textarea
                                name="shortbio"
                                type="text"
                                placeholder="Enter Your Unique Selling Proposition"
                                value={state.shortbio}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="experience__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label class="double" htmlFor="fullbio">
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
                    <div className="cancel">
                        Cancel
                    </div>
                    <div className="next">
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

Experience.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
