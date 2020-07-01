import React from 'react';
import Select from 'react-select'

import FilterIcon from '../../assets/filterIcon.svg';
import ResetFilterIcon from '../../assets/resetFilterIcon.svg';
import SearchIcon from '../../assets/search.svg';

import './filter.scss';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export default function filter() {
    return (
        <div>
            <div className="filter">

                <div className="filter__header">
                    Find the speaker of your dreams
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
                    
                </div>
            </div>
        </div>
    )
}
