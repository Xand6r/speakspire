import React, { useState } from 'react';
import { Checkbox } from 'antd';
import MultiSelect from "@khanacademy/react-multi-select";
import { useSelector } from 'react-redux';
import { component as SpeakerCard } from '../../../../utilities/speakerCard';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


import {
    INITIAL_STATE, FILTER_TEXT, CHECKBOX_OPTIONS
} from './constants';

import './filter.scss'
import '../../../../stylesheets/filter.scss';



const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

const speakers = [
    1,2,3,4,5,6,7,8,9,10,11,12
]
export default function Filter() {
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
    }
    const [speakerFilterState, setSpeakerFilterState] = useState(INITIAL_STATE);
    const [speakerNumber, setSpeakerNumber] = useState(12);
    const [filterLoading, setFilterLoading] = useState(false)
    const speakerState = useSelector(({speakers} )=> speakers);

    return (
        <div>
            <div className="filter --speakerspage">

                <div className="filter__top">
                    <div className="filter__header">
                        Find the speaker of your dreams
                    </div>

                    <div className="filter__subheader">
                        …at first you will call them speakers and coaches, but you 
                        will come to realize that they are more like friends who are 
                        passionate about helping and inspiring you and your 
                        audience to be better.
                    </div>
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
                    {
                        (speakerState.loading || filterLoading)?(
                            <Spin indicator={antIcon} />
                        ):(
                            <>
                                <span>More Speakers</span>
                                <img src={LeftArrow} alt="left arrow"/>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
