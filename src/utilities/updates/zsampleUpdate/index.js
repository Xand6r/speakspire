import React,{useState} from 'react';
import Select from 'react-select';

import {INITIAL_STATE} from './constants';
import { SPEAKER_SPECIALITY, TOPIC_AREAS } from '../../../components/speakerRegister/subcomponents/expertise/constants';

import '../updates.scss';
import './sampleUpdates.scss';

export default function Index({ onClose, initialData, onSuccess, eventId }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);

    const stateChanger = (name, value) => {
        setState({
            ...state,
            [name]:value
        })
    }

    return (
        <div className="updates sample">
            <div className='updates__form'>
                <div className='updates__form__header'>
                    Sample header
                    <span>Sample Subheading.</span>
                </div>

                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                        <label htmlFor='fullname'>One Form</label>
                        <input type="text"
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


            </div>
        </div>
    )
}
