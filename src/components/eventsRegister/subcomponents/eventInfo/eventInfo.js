import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';


import './eventInfo.scss';

import '../../../../stylesheets/tag.scss';
import 'react-tagsinput/react-tagsinput.css';

import { SPEAKER_SPECIALITY } from '../../component/constants';



export default function Personaldetails({
    stateChanger, state
}) {
    const [tagInputState, setTagInputState] = useState("");
    const changeTagInputState = (value) =>{
        if (value.length < 20){
            setTagInputState(value)
        }
    };
    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    }

    const saveEventInfo = (event)=>{
        console.log(state);
    }

    const changeSelectState = (name, value)=>{
        stateChanger({
            ...state,
            [name]: value
          });
    }


    return (
        <div className="eventinfo">

            <div className="eventinfo__heading">
                <div className="eventinfo__heading__header">
                    Event Info
                </div>

            </div>

            <div className="eventinfo__formsection ">
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Event Name</label>
                    <input
                        maxLength="25"
                        type="text"
                        id="eventName"
                        name="eventName"
                        onChange={handleFormChange}
                        value={state.eventName}
                        placeholder="Enter event name"
                        required
                    />

                </div>
                {/* wrapepr for the name */}
                
                {/* wrapepr for the name */}
                <div className="--wrapper">
                    <label htmlFor="fullname">Event Organizer</label>
                    <input
                        maxLength="29"
                        type="text"
                        id="eventOrganizer"
                        name="eventOrganizer"
                        onChange={handleFormChange}
                        value={state.eventOrganizer}
                        placeholder="Enter organizer name"
                        required
                    />
                </div>
                {/* wrapepr for the name */}

                {/* wrapper for teh event desription */}
                <div className="--wrapper">
                    <label className="double" htmlFor="fullbio">
                        Event Description
                    </label>
                    <textarea
                        name="eventDescription"
                        type="text"
                        placeholder="Tell us more about your event"
                        value={state.eventDescription}
                        onChange={(e)=>{
                            changeSelectState('eventDescription', e.target.value)
                        }}
                    />
                </div>
                {/* wrapper for teh event desription */}

                {/* wrapper for the event tags */}
                <div className="--wrapper">
                    <label className="double">
                        Event Tags
                        <span>
                            Make your event easier to find. Add tags that are relevant to your topic area. Separate tags with commas.                        </span>
                    </label>
                    <div className="--input_wrapper --tags --grey">
                        <TagsInput
                            value={state.services}
                            addKeys={[9, 13, 188 ]}
                            onChange={(tag)=>{
                                changeSelectState('services', tag)
                            }}
                            inputValue={tagInputState}
                            onChangeInput={changeTagInputState}
                            inputProps={{
                                placeholder:`${(!state.services.length)?"Service 1, Service 2":""}`
                            }}
                        />
                    </div>
                </div>
                {/* wrapper for the event tags */}

                {/* wrapper for the selects */}
                <div className="--wrapper">
                    
                    <label className="double" htmlFor="position">
                        Event Type
                    </label>
                    <div className="--singleselect">
                        <Select
                            options={SPEAKER_SPECIALITY}
                            isSearchable
                            placeholder="Select"
                            className="--item"
                            onChange={(value) => changeSelectState('eventType', value)}
                            value={state.eventType}
                        />
                    </div>

                </div>

                <div className="--wrapper">
                    
                    <label className="double" htmlFor="position">
                        Topic Area
                    </label>
                    <div className="--singleselect">
                        <Select
                            options={SPEAKER_SPECIALITY}
                            isSearchable
                            placeholder="Select"
                            className="--item"
                            onChange={(value) => changeSelectState('topicArea', value)}
                            value={state.topicArea}
                        />
                    </div>

                </div>

                <div className="--wrapper">
                    
                    <label className="double" htmlFor="position">
                        Language
                    </label>
                    <div className="--singleselect">
                        <Select
                            options={SPEAKER_SPECIALITY}
                            isSearchable
                            placeholder="Select"
                            className="--item"
                            onChange={(value) => changeSelectState('Language', value)}
                            value={state.Language}
                        />
                    </div>

                </div>
                {/* wrapper for the selects */}

            </div>

            <div className="eventinfo__footer">
                {/* <div className="--notification">
                    <img src={notificationIcon} alt=""/>
                    <div className="--text">
                        By creating an account you agree to the 
                        <span> Terms and Conditions</span> and our <span>Privacy Policy</span>
                    </div>
                </div> */}
                <div className="--button_group">
                    <Link className="link" to="/">
                        <div className="cancel">
                            Cancel
                        </div>
                    </Link>

                    <Link onClick={saveEventInfo} className="link" to="/registerevent/2">
                        <div className="next">
                            Save & Continue
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Personaldetails.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}