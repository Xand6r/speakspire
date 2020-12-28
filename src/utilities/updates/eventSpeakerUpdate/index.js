import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import bluePlusIcon from '../../../components/eventsRegister//assets/bluePlainPlus.svg';
import deleteSectionIcon from '../../../components/eventsRegister//assets/deletesection.svg';

import { TOPIC_AREAS } from '../../../components/speakerRegister/subcomponents/expertise/constants';
import { SPEAKER_CATEGORY, COUNTRY_LIST } from '../../../components/eventsRegister/component/constants';

import axios from '../../axios';
import {INITIAL_STATE} from './constants';
import {validateData} from './validator';


import '../updates.scss';
import './sampleUpdates.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

export default function Index({ onClose, initialData, onSuccess, eventId }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const stateChanger = (name, value) => {
        setState({
            ...state,
            [name]:value
        })
    }

    const deleteSection = (index) => {
        setState(
            [...state].filter((state,stateIndex)=>(
                stateIndex !== index
        )))
    }

    const changeListData = ( index, subproperty,  value) =>{
        const updatedState = [...state];
        updatedState[index][subproperty] = value;
        setState(updatedState);
    }

    const addNewCall = () => {
        setState([
            ...state,
            {
                speakerCategory: '',
                topicArea: '',
                country: '',
                budgetFrom: '',
                budgetTo: '',
                eventDescription: '',
            }
        ])
    }

    useEffect(() => {
        // set initial state
        const {speakers} = initialData;
        if(speakers.length){
            const initialData = [];
            for (let speaker of speakers){
                const {
                    budget, category, country,
                    description, topic_area
                } = speaker;
                initialData.push({
                    speakerCategory: category,
                    budgetFrom: budget.split(' - ')[0],
                    budgetTo: budget.split(' - ')[1],
                    eventDescription: description,
                    topicArea: topic_area,
                    country: country
                });
            }
            setState(initialData)
        }

    }, [initialData]);

    const saveState = () => {
		const valid = validateData(state);
		if (valid) {
			// set lading state
			setLoading(true);
			// make patch request
			axios
				.patch(`speakers//expertise`, {
				})
				.then(() => {
					message.success('Details updated sucesfully!');
					onClose();
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					message.error('There was an error updating user!', err.response.data.message);
					onClose();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			message.error('Please fill in all details before submitting!');
			return;
		}
	};

    return (
        <div className="updates sample">
            <div className='updates__form'>
                <div className='updates__form__header'>
                    Call For Speakers
                </div>
                {
                    state.map((speakercall, index) => (
                        <div className={`updates__form__content ${index!==0 && "--margin-top"}`}>
                        {
                            (index === 0)
                                ||
                            <img
                                src={deleteSectionIcon}
                                alt=""
                                className="--delete"
                                onClick={()=>deleteSection(index)}
                            />
                        }
                            <div className='updates__form__content__item'>
                                <label htmlFor='fullname'>Speaker Category</label>
                                <div className='--singleselect'>
                                    <Select
                                        options={SPEAKER_CATEGORY}
                                        isSearchable
                                        placeholder='Select'
                                        className='--item'
                                        onChange={(value) => {
                                            changeListData(index, 'speakerCategory',  value.value)
                                        }}
                                        value={
                                            speakercall.speakerCategory
                                                ? {
                                                        value: speakercall.speakerCategory,
                                                        label: speakercall.speakerCategory,
                                                }
                                                : ''
                                        }
                                    />
                                </div>
                            </div>


                            <div className='updates__form__content__item'>
                                <label htmlFor='fullname'>Topic Area</label>
                                <div className='--singleselect'>
                                    <Select
                                        options={TOPIC_AREAS}
                                        isSearchable
                                        placeholder='Select'
                                        className='--item'
                                        onChange={(value) => changeListData(index, 'topicArea',  value)}
                                        value={
                                            speakercall.topicArea
                                                ? {
                                                        value: speakercall.topicArea,
                                                        label: speakercall.topicArea,
                                                }
                                                : ''
                                        }
                                    />
                                </div>
                            </div>


                            <div className='updates__form__content__item'>
                                <label htmlFor='country'>Country</label>
                                <div className='--singleselect'>
                                    <Select
                                        options={COUNTRY_LIST}
                                        isSearchable
                                        placeholder='Select'
                                        className='--item'
                                        onChange={(value) =>  changeListData(index, 'country',  value)}
                                        value={
                                            speakercall.country
                                                ? {
                                                        value: speakercall.country,
                                                        label: speakercall.country,
                                                }
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="budget">
                                    Speaker Budget
                                </label>
                                <div className="--double_wrapper">
                                    <input
                                        type="number"
                                        placeholder="00.00 NGN"
                                        min="1000"
                                        onChange={(e) =>  changeListData(index, 'budgetFrom',  e.target.value)}
                                        value={speakercall.budgetFrom}
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        placeholder="00.00 NGN"
                                        min="1000"
                                        onChange={(e) =>  changeListData(index, 'budgetTo',  e.target.value)}
                                        value={speakercall.budgetTo}
                                    />
                                </div>
                            </div>

                            <div className="updates__form__content__item updates__form__textareacontent --white">
                                <label htmlFor="budget">
                                    Speaker Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Tell us more about the kind of speakers you’re looking for"
                                    value={speakercall.eventDescription}
                                    onChange={(e)=>{
                                        changeListData(index, 'eventDescription',  e.target.value)
                                    }}
                                ></textarea>
                            </div>

                        </div>
                    ))
                }
            </div>
            <div
                className="--extra"
                onClick={addNewCall}
                >
                    <div>
                        <img src={bluePlusIcon} alt=""/>
                        Add New Call For Speakers
                    </div>
                </div>
            <div className='updates__action'>
				<div className='cancel' onClick={onClose}>
					Cancel
				</div>

				<div className='save' onClick={saveState}>
					{loading ? <Spin indicator={antIcon} /> : 'Save'}
				</div>
			</div>
        </div>
    )
}
