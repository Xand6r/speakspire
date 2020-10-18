import React, {useState} from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import CircleSelect from './circleSelect';

import {
    AVAILABILITY_OPTIONS, DELIVERY_MODE_OPTIONS,
    TRAVEL_OPTIONS
} from './constants'

import './preference.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss'

export default function Preference({
    stateChanger, state
}) {

    const changeSelectState = (name, value)=>{
        stateChanger({
            ...state,
            [name]: value
          });
    }

    const TRAVEL_DESTINATIONS = [
        "Global", "Nigeria", "Africa",
        "Asia", "Europe", "North America",
        "South America", "Australia"
    ];

    const [activeCircle, setActiveCircle] = useState([]);

    return (
        <div className="preference">

            <div className="personaldetails__heading">
                <div className="personaldetails__heading__header">
                    Preferences
                </div>
                
            </div>

            <div className="preference__formsection">

                <div className="preference__formsection__section ">
                    
                    <div className="preference__formsection__section__form --whitebg --no-mt">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Availability
                                <span>hese are days you’re available for engagements.</span>
                            </label>
                            <div className="--singleselect">
                            <Select
                                options={AVAILABILITY_OPTIONS}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(value) => changeSelectState('availability', value)}
                                value={state.availability}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="preference__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Mode of Delivery
                                <span>These are your preferred ways of delivery.</span>
                            </label>
                            <div className="--singleselect">
                            <Select
                                options={DELIVERY_MODE_OPTIONS}
                                isSearchable placeholder="Select"
                                className="--item"
                                onChange={(value) => changeSelectState('mode_of_delivery', value)}
                                value={state.mode_of_delivery}
                            />
                            </div>
                        </div>
                    </div>

                    <div className="preference__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Are you open to travel?
                            </label>
                            <div className="--singleselect">
                            <Select
                                options={TRAVEL_OPTIONS}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(value) => changeSelectState('open_for_travel', value)}
                                value={state.open_for_travel}
                            />
                            </div>
                        </div>
                    </div>

                    {/* only display if travel is set to yes */}
                    {
                        (state.open_for_travel.value === "yes")?(

                        <div className="preference__formsection__section__form --whitebg">
                            <div className="--input_wrapper --select">
                                <label className="double" htmlFor="position">
                                    Travel
                                    <span>
                                    Select travel destinations you are open to. You can select more than one.
                                    </span>
                                </label>
                                <div className="circleselect__items">
                                    {
                                        TRAVEL_DESTINATIONS.map( destination => (
                                            <div 
                                                className="circleSelect__item"
                                                onClick = {(e) => {
                                                    if(!activeCircle.includes(destination)){
                                                        const newState = [
                                                            ...activeCircle,
                                                            destination
                                                        ]
                                                        setActiveCircle(newState)
                                                        changeSelectState('travel_places', newState);
                                                    }
                                                    
                                                    else{
                                                        let notActive = activeCircle.filter((active)=>(
                                                                active !==destination
                                                            ))
                                                        setActiveCircle([...notActive])
                                                        changeSelectState('travel_places', [...notActive]);
                                                    }
                                                }}
                                                >
                                                <CircleSelect
                                                    text={destination}
                                                    active={activeCircle.includes(destination)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
    
                        ): ""
                    }

                </div>
            
            </div>

            <div className="preference__footer">

                <div className="--button_group">
                    <Link className="link" to="/register/3">
                        <div className="cancel">
                            Back
                        </div>
                    </Link>

                    <Link className="link" to="/register/5">
                        <div className="next">
                            Next
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Preference.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
