import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import MultiSelect from "@khanacademy/react-multi-select";

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { component as SpeakerCard } from '../../../../utilities/speakerCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import '../../../../stylesheets/filter.scss';

const INITIAL_STATE = {
    location: "",
    fee:"",
    topicArea: "",
    specialty: "",
    speakerCategory: ""
}

const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

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
]


const CHECKBOX_OPTIONS = [
  { label: "Online Engagement", value: "Online Engagement" },
  { label: "Physical Engagement", value: "Physical Engagement" },
  { label: 'Weekdays', value: 'Weekdays' },
  { label: 'Weekends', value: 'Weekends' },
  { label: 'Open to travel', value: 'Open to travel' },
];

export default function Filter() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    };
    const speakerState = useSelector(({speakers} )=> speakers);

    const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
    return (
        <div>
            <div className="filter">

                <div className="filter__header">
                    Find the speaker of your dreams
                </div>

                <div className="filter__filter">
                    <div className="filter__filter__search">
                        <div className="inputgroup">
                            <input 
                                className="filter__filter__search__input" 
                                type="text"
                                placeholder="Search speakers by name, role, company, etc."
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
                    speakerState.data.map(speaker => {
                        const {
                            id,
                            name, experience:[{company, position}],
                            expertise: [{primary_specialty,secondary_specialty, primary_tags }]
                        } = speaker;
                        return (
                            <SpeakerCard
                                id={speaker.id}
                                key={speaker.id}
                                fullname={name}
                                company={company}
                                position={position}
                                skills={JSON.parse(primary_tags)}
                                image={speaker.profile_photo}
                                primary={primary_specialty}
                                secondary={secondary_specialty}
                                tag="premium"
                            />
                        );
                    })
                    }
                    
                </div>

                <div className="filter__more_results">
                    <span>More Speakers</span>
                    <img src={LeftArrow} alt="left arrow"/>
                </div>
            </div>
        </div>
    )
}
