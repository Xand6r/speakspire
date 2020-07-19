import React from 'react';
import Select from 'react-select'

import { component as SpeakerCard } from '../../../../utilities/speakerCard';
import FilterIcon from '../../../../assets/filterIcon.svg';
import ResetFilterIcon from '../../../../assets/resetFilterIcon.svg';
import SearchIcon from '../../../../assets/search.svg';
import LeftArrow from '../../../../assets/leftArrow.svg';

import './filter.scss'
import '../../../../stylesheets/filter.scss';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

const speakers = [
    1,2,3,4,5,6,7,8,9,10,11,12
]
export default function filter() {
    return (
        <div>
            <div className="filter --speakerspage">

                <div className="filter__header">
                    Find the speaker of your dreams
                </div>

                <div className="filter__subheader">
                    …at first you will call them speakers and coaches, but you 
                    will come to realize that they are more like friends who are 
                    passionate about helping and inspiring you and your 
                    audience to be better.
                </div>

                <div className="filter__filter">
                    <div className="filter__filter__search">
                        <div className="inputgroup">
                            <img src= {SearchIcon} alt=""/>
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
                                <img className="--icon" src={FilterIcon} alt="filtericon"/>
                                <div className="--text">Filters</div>
                            </div>

                            <div className="filter__filter__select__icons__icon">
                                <img className="--icon" src={ResetFilterIcon} alt="filtericon"/>
                                <div className="--text --underline">Reset Filters</div>
                            </div>

                        </div>
                             
                            <hr className="--divider"/>

                        <div className="filter__filter__select__items">
                            <Select options={options} isSearchable placeholder="Location" className="--item" />
                            <Select options={options} isSearchable placeholder="Fee" className="--item" />
                            <Select options={options} isSearchable placeholder="Topic" className="--item" />
                            <Select options={options} isSearchable placeholder="Speaker category" className="--item" />
                            <Select options={options} isSearchable placeholder="Mode of delivery" className="--item" />
                        </div>

                    </div>

                </div>

                <div className="filter__results">
                    {
                        speakers.map(speaker => (
                            <SpeakerCard key={speaker} />
                        ))
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
