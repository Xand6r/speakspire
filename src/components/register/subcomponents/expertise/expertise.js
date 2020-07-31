import React, {useState} from 'react';
import Select from 'react-select'
import TagsInput from 'react-tagsinput';
import MultiSelect from "@khanacademy/react-multi-select";
import PropTypes from 'prop-types';

import './expertise.scss';
import 'react-tagsinput/react-tagsinput.css';
import './tag.scss'
import blueCircle from '../../assets/circlePlus.svg';
export default function Expertise({
    stateChanger, state
}) {
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
     
      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const [inputState, setInputState] = useState("")
    const changeInputState = (value) =>{
        if (value.length < 20){
            setInputState(value)
        }
    }
    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    }

    return (
        <div className="expertise">

            <div className="personaldetails__heading">
                <div className="personaldetails__heading__header">
                    Expertise
                </div>
            </div>

            <div className="expertise__formsection">

                <div className="expertise__formsection__section">
                    <div className="expertise__formsection__section__header">
                        <div className="--heading">Current Position</div>
                        <div className="--sub_heading">
                            This is the primary position to be displayed on your profile.
                        </div>
                    </div>
                    <div className="expertise__formsection__section__form">
                        <div className="--input_wrapper">
                            <label htmlFor="position">Position</label>
                            <input
                                name="position"
                                type="text"
                                placeholder="Eg. Marketing Manager"
                                onChange={handleFormChange}
                                value={state.position}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="company">company</label>
                            <input
                                name="company"
                                type="text"
                                placeholder="Eg. Speakspire"
                                onChange={handleFormChange}
                                value={state.company}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="dates">From</label>
                            <div className="--date_wrapper">
                                <input
                                    type="date"
                                    name="exp_dateFrom"
                                    id="exp_dateFrom"
                                    onChange={handleFormChange}
                                    value={state.exp_dateFrom}
                                />
                                <span>to</span>
                                <input
                                    type="date"
                                    name="exp_dateTo"
                                    id="exp_dateTo"
                                    onChange={handleFormChange}
                                    value={state.exp_dateTo}
                                />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="expertise__formsection__section__footer"
                    >
                        <img 
                            src={blueCircle}
                            alt=""
                        />
                        <span>
                            Add New Education
                        </span>
                    </div>
                </div>

                <div className="expertise__formsection__section">
                    <div className="expertise__formsection__section__header">
                        <div className="--heading">Education</div>
                    </div>
                    <div className="expertise__formsection__section__form">
                        <div className="--input_wrapper">
                            <label htmlFor="position">School</label>
                            <input
                                name="school"
                                type="text"
                                placeholder="Enter School Name"
                                onChange={handleFormChange}
                                value={state.school}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="field_of_study">field of study</label>
                            <input
                                name="field_of_study"
                                type="text"
                                onChange={handleFormChange}
                                value={state.field_of_study}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="dates">From</label>
                            <div className="--date_wrapper">
                                <input
                                    type="date"
                                    name="edu_dateFrom"
                                    id="edu_dateFrom"
                                    onChange={handleFormChange}
                                    value={state.edu_dateFrom}
                                />
                                <span>to</span>
                                <input
                                    type="date"
                                    name="edu_dateTo"
                                    id="edu_dateTo"
                                    onChange={handleFormChange}
                                    value={state.edu_dateTo}
                                />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="expertise__formsection__section__footer"
                    >
                        <img 
                            src={blueCircle}
                            alt=""
                        />
                        <span>
                            Add New Position
                        </span>
                    </div>
                </div>

                <div className="expertise__formsection__section">
                    <div className="expertise__formsection__section__header">
                        <div className="--heading">Topic</div>
                    </div>
                    <div className="expertise__formsection__section__form">
                        <div className="--input_wrapper --select">
                            <label class="double" htmlFor="position">
                                Topics
                                <span>These are the broad topics your expertise falls under.</span>
                            </label>
                            <div className="--multiselect --white">
                                <MultiSelect
                                    options={multi_options}
                                    selected={state.topics}
                                    onSelectedChanged={selected => stateChanger({...state, topics:selected})}
                                    overrideStrings={{
                                        selectSomeItems: <span class="placeholding_text">Select Topic</span>,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="--input_wrapper --tags">
                            <label className="double">
                                Topic Tags
                                <span>
                                These are specific topics you can easily speak about. Separate topics
                                  with commas. {/*drag and drop to change topic arrangement.*/}
                                </span>
                            </label>
                            <TagsInput
                                value={state.topic_tags}
                                addKeys={[9, 13, 188 ]}
                                onChange={(tag)=>{
                                    stateChanger({...state,topic_tags:tag})
                                    }}
                                inputValue={inputState}
                                onChangeInput={changeInputState}
                            />
                        </div>

                    </div>
                    <div className="expertise__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label class="double" htmlFor="bio">
                                Short Bio
                                <span>
                                    This is your profile introduction.
                                </span>
                            </label>
                            <textarea
                                name="shortbio"
                                type="text"
                                placeholder="Enter Your Short Bio"
                                value={state.shortbio}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <div className="expertise__formsection__section__form --whitebg">
                        <div className="--input_wrapper">
                            <label class="double" htmlFor="fullbio">
                                Full Bio
                                <span>
                                    This is your full bio.
                                </span>
                            </label>
                            <textarea
                                name="fullbio"
                                type="text"
                                placeholder="Enter Your Full Bio"
                                value={state.fullbio}
                                onChange={handleFormChange}
                            />
                        </div>
                    </div>
                    
                    <div className="expertise__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Language
                            </label>
                            <div className="--singleselect">
                            <Select options={options} isSearchable placeholder="Location" className="--item" />
                                {/* <MultiSelect
                                    options={multi_options}
                                    selected={selected}
                                    onSelectedChanged={selected => setSelected(selected)}
                                    overrideStrings={{
                                        selectSomeItems: <span class="placeholding_text">Select Language</span>,
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="expertise__footer">

                <div className="--button_group">
                    <div className="cancel">
                        Cancel
                    </div>
                    <div className="next">
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

Expertise.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
