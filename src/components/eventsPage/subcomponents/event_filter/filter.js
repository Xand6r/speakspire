import React, { useState } from 'react';
import { Checkbox } from 'antd';
import MultiSelect from "@khanacademy/react-multi-select";

import { component as EventCard } from '../../../../utilities/eventCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import './filter.scss'
import '../../../../stylesheets/filter.scss';


const INITIAL_STATE = {
    location: "",
    fee:"",
    topicArea: "",
    specialty: "",
    speakerCategory: ""
}

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

const FILTER_TEXT = [
    {"placeholder":"Location", state:"location", options: multi_options},
    {"placeholder":"Fee", state:"fee", options: multi_options},
    {"placeholder":"Topic Area", state:"topicArea", options: multi_options},
    {"placeholder":"Specialty", state:"specialty", options: multi_options},
    {"placeholder":"Speaker Category ", state:"speakerCategory", options: multi_options},
];

const CHECKBOX_OPTIONS = [
    { label: "Online Engagement", value: "Online Engagement" },
    { label: "Physical Engagement", value: "Physical Engagement" },
    { label: 'Weekdays', value: 'Weekdays' },
    { label: 'Weekends', value: 'Weekends' },
    { label: 'Open to travel', value: 'Open to travel' },
];

const events = [
    1,2,3,4,5,6,7,8,9,10,11,12
]
export default function Filter() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
    return (
        <div>
            <div className="filter --eventspage">

                <div className="filter__header">
                    Showcase your event and find speakers
                </div>

                <div className="filter__subheader">
                    Events are only as good as the speakers at the event. 
                     Finding the right speakers for your event couldn’t be any easier. 
                     Simply upload your event, recieve requests from our speakers and choose your preferred speakers.
                </div>

                <div className="filter__filter">
                    <div className="filter__filter__search">
                        <div className="inputgroup">
                            <input 
                                className="filter__filter__search__input" 
                                type="text"
                                placeholder="Search events by name, role, company, etc."
                            />

                        </div>
                        <div className="filter__filter__search__button">
                            Search
                        </div>
                    </div>

                    <div className="filter__filter__select">
                        <div className="filter__filter__select__icons">

                            <div className="filter__filter__select__icons__icon">
                                <div className="--text">Filters</div>
                            </div>

                            <div className="filter__filter__select__icons__icon">
                                <img className="--icon" src={ResetFilterIcon} alt="filtericon"/>
                                <div className="--underline --small">Reset Filters</div>
                            </div>

                        </div>
                             
                            <hr className="--divider"/>

                        <div className="filter__filter__select__items">
                            {
                                FILTER_TEXT.map(filterInfo => (
                                    <div className="--multiselect --white">
                                        <MultiSelect
                                            options={filterInfo.options}
                                            selected={speakerFilterState[filterInfo.state]}
                                            onSelectedChanged={selected => setSpeakerFilterState({...speakerFilterState, [filterInfo.state]:selected})}
                                            overrideStrings={{
                                                selectSomeItems: <span class="placeholding_text">{filterInfo.placeholder}</span>,
                                            }}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        
                        <div className="filter__filter__select__checkboxes">
                        <Checkbox.Group options={CHECKBOX_OPTIONS} defaultValue={['Apple']} onChange={onChange} />
                        </div>
                    </div>

                </div>

                <div className="filter__results">
                    {
                        events.map(speaker => (
                            <EventCard />

                        ))
                    }
                </div>

                <div className="filter__more_results">
                    <span>More Events</span>
                    <img src={LeftArrow} alt="left arrow"/>
                </div>
            </div>
        </div>
    )
}
