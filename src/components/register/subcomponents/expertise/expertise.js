import React, {useState} from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import MultiSelect from "@khanacademy/react-multi-select";
import PropTypes from 'prop-types';

import './expertise.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss'

import blueCircle from '../../assets/circlePlus.svg';
import calendarIcon from '../../../../assets/calendar.svg'
import fileUpload from '../../assets/uploadFile.svg'
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
    ];

    const [inputState, setInputState] = useState("");
    const changeInputState = (value) =>{
        if (value.length < 20){
            setInputState(value)
        }
    };
    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    };
    const changeDate = (momentDate, dateString ,name) =>{
        stateChanger({
            ...state,
            [name]: [momentDate, dateString ]
          });
    };
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };

    const monthFormat = 'MM/YY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );
    const FileImage = () => (
        <img height="14px" style={ {'margin-right': '10px'} } src={fileUpload} alt="calendar"/>
    );

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
                        <div className="--heading">Specialty</div>
                        <div className="--sub_heading">
                        Tell us what kind of speaker you are.
                        </div>
                    </div>
                    <div className="expertise__formsection__section__form --nomargin">
                        <div className="--input_wrapper">
                            <label htmlFor="position">Primary</label>
                            <input
                                name="position"
                                type="text"
                                placeholder="Eg. Marketing Manager"
                                onChange={handleFormChange}
                                value={state.position}
                            />
                        </div>

                        <div className="--input_wrapper">
                            <label htmlFor="company">Secondary (optional)</label>
                            <input
                                name="company"
                                type="text"
                                placeholder="Eg. Speakspire"
                                onChange={handleFormChange}
                                value={state.company}
                            />
                        </div>

                    </div>

                </div>

                <div className="expertise__formsection__section">
                    <div className="expertise__formsection__section__header">
                        <div className="--heading">Topic Areas</div>
                        <div className="--sub_heading">
                        These are the broad topics your expertise falls under.
                        </div>
                    </div>
                    <div className="expertise__formsection__section__form">
                        <div className="--input_wrapper --select">
                            <label class="double" htmlFor="position">
                                Primary
                            </label>
                            <div className="--singleselect">
                                <Select options={options} isSearchable placeholder="Location" className="--item" />
                            </div>
                        </div>

                        <div className="--input_wrapper --tags">
                            <label className="double">
                                Topic Tags (Primary)
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

                        <div className="--input_wrapper --select">
                            <label class="double" htmlFor="position">
                                Secondary (optional)
                            </label>
                            <div className="--singleselect">
                                <Select options={options} isSearchable placeholder="Location" className="--item" />
                            </div>
                        </div>

                        <div className="--input_wrapper --tags">
                            <label className="double">
                                Topic Tags (Secondary)
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
                                <div className="--date_wrapper --half_date">
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeDate(momentDate, dateString, 'exp_dateFrom');
                                        }}
                                        value={state.exp_dateFrom[0]}
                                    />
                                    <span>to</span>
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeDate(momentDate, dateString, 'exp_dateTo');
                                        }}
                                        value={state.exp_dateTo[0]}
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

                    <div className="expertise__formsection__section --last">
                        <div className="expertise__formsection__section__header">
                            <div className="--heading">Certification and Licenses </div>
                        </div>
                        <div className="expertise__formsection__section__form">
                            <div className="--input_wrapper">
                                <label htmlFor="position">Certification Name</label>
                                <input
                                    name="school"
                                    type="text"
                                    placeholder="Enter School Name"
                                    onChange={handleFormChange}
                                    value={state.school}
                                />
                            </div>

                            <div className="--input_wrapper">
                                <label htmlFor="field_of_study">Institution</label>
                                <input
                                    name="field_of_study"
                                    type="text"
                                    onChange={handleFormChange}
                                    value={state.field_of_study}
                                />
                            </div>

                            <div className="--input_wrapper">
                                <label htmlFor="dates">From</label>
                                <div className="--date_wrapper --half_date">
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeDate(momentDate, dateString, 'exp_dateFrom');
                                        }}
                                        value={state.exp_dateFrom[0]}
                                    />
                                    <span>to</span>
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeDate(momentDate, dateString, 'exp_dateTo');
                                        }}
                                        value={state.exp_dateTo[0]}
                                    />
                                </div>
                            </div>

                            <div className="--input_wrapper">
                                <label className="double">
                                    Media
                                    <span>
                                    Upload or link to external documents, sites, photos and videos.
                                    </span>
                                </label>
                                <div className="--two_inputs --half_date">

                                    <Upload {...props}>
                                        <Button icon={<FileImage />}>Upload File</Button>
                                    </Upload>


                                    <div className="--input_wrapper">
                                        <input
                                            name="field_of_study"
                                            type="text"
                                            onChange={handleFormChange}
                                            value={state.field_of_study}
                                            placeholder="Add Link"
                                        />
                                    </div>
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
                                Add New Certification
                            </span>
                        </div>
                    </div>


                    <div className="expertise__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Highest Level of Education
                            </label>
                            <div className="--singleselect">
                                <Select options={options} isSearchable placeholder="Location" className="--item --cream" />
                            </div>
                        </div>
                    </div>

                    <div className="expertise__formsection__section__form --whitebg">
                        <div className="--input_wrapper --select">
                            <label className="double" htmlFor="position">
                                Languages
                            </label>
                            <div className="--multiselect ">
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
