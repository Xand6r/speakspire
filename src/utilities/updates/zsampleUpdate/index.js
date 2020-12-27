import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { SPEAKER_SPECIALITY, TOPIC_AREAS } from '../../../components/speakerRegister/subcomponents/expertise/constants';

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

    useEffect(() => {
        // set initial state

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
                    Sample header
                    <span>Sample Subheading.</span>
                </div>

                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                    <label htmlFor='fullname'>Event Name</label>
                        <input
                            type="text"
                            value={state.name}
                            onChange={
                                ({target:{name, value}})=>{
                                    stateChanger(name, value)
                                }
                            }
                            placeholder="Enter event name"
                        />
                    </div>

                    <div className='updates__form__content__item'>
                        <label htmlFor='fullname'>Secondary Speciality</label>
                        <div className='--singleselect'>
                            <Select
                                options={SPEAKER_SPECIALITY}
                                isSearchable
                                placeholder='Select'
                                className='--item'
                                onChange={(secondarySpecialty) => {
                                    setState({
                                        ...state,
                                        secondarySpecialty: secondarySpecialty.value,
                                    });
                                }}
                                value={
                                    state.secondarySpecialty
                                        ? {
                                                value: state.secondarySpecialty,
                                                label: state.secondarySpecialty,
                                        }
                                        : ''
                                }
                            />
                        </div>
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
        </div>
    )
}
