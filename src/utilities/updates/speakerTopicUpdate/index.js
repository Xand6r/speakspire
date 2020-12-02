import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {message} from 'antd';
import TagsInput from 'react-tagsinput';


import { SPEAKER_SPECIALITY, TOPIC_AREAS } from '../../../components/speakerRegister/subcomponents/expertise/constants';

import '../updates.scss';
import './speakerTopicUpdate.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../stylesheets/tag.scss';

export default function Index({
    onClose, initialData
}) {
    const [state, setState] = useState({
        primarySpecialty: "",
        secondarySpecialty: "",
        primaryTopicArea: "",
        secondaryTopicArea: "",
        primary_topic_tags: [],
        secondary_topic_tags: []
    });

    useEffect(() => {
        if(initialData){
            const {
                primarySpecialty, secondarySpecialty,
                primaryTopic, primarySkills, 
                secondaryTopic, secondarySkills
            } = initialData;

            setState({
                primarySpecialty: primarySpecialty || "",
                secondarySpecialty: secondarySpecialty || "",
                primaryTopicArea: primaryTopic || "",
                secondaryTopicArea: secondaryTopic || "",
                primary_topic_tags: primarySkills || [],
                secondary_topic_tags: secondarySkills || []
            })
        }
    }, [initialData])

    const saveTopicsState = () => {
        // logic for updating state, and on sucess do the below
        message.success("Profile Updated Sucesfully!")
        onClose();
    }

    return (
        <div className="updates topics">

            <div className="updates__form">
                <div className="updates__form__header">
                    Edit Topic Areas
                </div>

                <div className="updates__form__header__preform">
                    Specialty
                    <span>
                        Tell us what type of speaker you are.
                    </span>
                </div>
                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Primary Speciality
                        </label>
                        <div className="--singleselect">
                            <Select
                                options={SPEAKER_SPECIALITY}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(primarySpecialty) =>{
                                    setState({
                                        ...state,
                                        primarySpecialty: primarySpecialty.value
                                    });
                                }}
                                value={
                                    state.primarySpecialty? 
                                    {
                                        value: state.primarySpecialty,
                                        label: state.primarySpecialty
                                    }
                                    : ""
                                }
                            />
                        </div>
                    </div>
                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Secondary Speciality
                        </label>
                        <div className="--singleselect">
                            <Select
                                options={SPEAKER_SPECIALITY}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(secondarySpecialty) =>{
                                    setState({
                                        ...state,
                                        secondarySpecialty: secondarySpecialty.value
                                    });
                                }}
                                value={
                                    state.secondarySpecialty? 
                                    {
                                        value: state.secondarySpecialty,
                                        label: state.secondarySpecialty
                                    }
                                    : ""
                                }
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="updates__form">

                <div className="updates__form__header__preform">
                    Topic Areas
                    <span>
                    These are broad topics your expertise falls under.
                    </span>
                </div>
                <div className="updates__form__content">
                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Primary Topic Area
                        </label>
                        <div className="--singleselect">
                            <Select
                                options={TOPIC_AREAS}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(primaryTopicArea) =>{
                                    setState({
                                        ...state,
                                        primaryTopicArea: primaryTopicArea.value
                                    });
                                }}
                                value={
                                    state.primaryTopicArea? 
                                    {
                                        value: state.primaryTopicArea,
                                        label: state.primaryTopicArea
                                    }
                                    : ""
                                }
                            />
                        </div>
                    </div>

                    <div className="updates__form__content__item">
                        <label  className="double"  htmlFor="fullname">
                            Topic Tags (Primary)

                            <span>
                                These are specific topics under your primary topic area you can easily speak about. Separate topics with commas, drag and drop to change topic arrangement. 
                            </span>
                        </label>
                        <div className="--input_wrapper --tags">
                            <TagsInput
                                value={state.primary_topic_tags}
                                addKeys={[9, 13, 188]}
                                onChange={(tag) => {
                                    setState({
                                        ...state,
                                        primary_topic_tags: tag,
                                    });
                                }}
                            />
                        </div>
                    </div>


                    <div className="updates__form__content__item">
                        <label htmlFor="fullname">
                            Secondary Topic Area
                        </label>
                        <div className="--singleselect">
                            <Select
                                options={TOPIC_AREAS}
                                isSearchable
                                placeholder="Select"
                                className="--item"
                                onChange={(secondaryTopicArea) =>{
                                    setState({
                                        ...state,
                                        secondaryTopicArea: secondaryTopicArea.value
                                    });
                                }}
                                value={
                                    state.secondaryTopicArea? 
                                    {
                                        value: state.secondaryTopicArea,
                                        label: state.secondaryTopicArea
                                    }
                                    : ""
                                }
                            />
                        </div>
                    </div>

                    <div className="updates__form__content__item">
                        <label className="double" htmlFor="fullname">
                            Topic Tags (Secondary)
                            <span>
                                These are specific topics under your secondary topic area you can easily speak about. Separate topics with commas, drag and drop to change topic arrangement. 
                            </span>
                        </label>
                        <div className="--input_wrapper --tags">
                            <TagsInput
                                value={state.secondary_topic_tags}
                                addKeys={[9, 13, 188]}
                                onChange={(tag) => {
                                    setState({
                                        ...state,
                                        secondary_topic_tags: tag,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                

            </div>

            <div className="updates__action">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    Cancel
                </div>

                <div
                    className="save"
                    onClick={saveTopicsState}
                >
                    Save
                </div>
            </div>
        </div>
    )
}
