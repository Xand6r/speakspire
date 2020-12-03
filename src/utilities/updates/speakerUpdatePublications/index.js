import React, {useState} from 'react';
import {message, DatePicker, Upload, Button, Spin} from 'antd';
import calendarIcon from '../../../assets/calendar.svg';
import moment from 'moment';
import blueCircle from '../assets/blueCircle.svg';
import closeTag from '../assets/closeTag.svg';
import uploadImage from '../../../utilities/generalUtils/uploadImage';
import fileUpload from '../../../components/speakerRegister/assets/uploadFile.svg';
import deleteBin from '../../../components/speakerRegister/assets/bin.svg';

import Select from 'react-select';
import { LoadingOutlined } from '@ant-design/icons';


import {PUBLICATION_TYPES} from './constants';

import '../updates.scss';
import './speakerUpdatePublications.scss';



export default function Index({
    onClose
}) {
    const [state, setState] = useState([{
        publicationType : "",
        publicationTitle: "",
        publicationYear: "",
        publicationLink: "",
    }]);
    const [certLoader, setCertLoader] = useState([]);;


    const changeListData = (index, property, value) => {
		const updatedState = [...state];
		updatedState[index][property] = value;
		setState(updatedState);
    };

    const savePublicationDetails = () => {
        // logic for saving details here
        message.success('Profile sucesfully updated!')
        onClose();
    };
    const deleteFormItem = (index) => {
		const oldItem = state.filter((s, eduIndex)=>(
			index !== eduIndex
		));
		setState(oldItem)
	}
    const monthFormat = 'YYYY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );
    const props = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
    };
    const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

    return (
        <div className="updates publications">

            <div className="updates__form">
                <div className="updates__form__header">
                    Add Publications
                </div>

                { 
                    state.map((publication, index) => (
                    <div key={`${index}-publications`} className="updates__form__content --withmargin">
                        {
                            (index !== 0) &&
                            <img
                                src={closeTag}
                                alt=""
                                className="form_close"
                                onClick={() => deleteFormItem(index)}
                            />
                        }
                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Type of Publication
                                </label>
                                <div className="--singleselect">
                                    <Select
                                        options={PUBLICATION_TYPES}
                                        isSearchable
                                        placeholder="Select"
                                        className="--item"
                                        onChange={(publicationType) =>{
                                            changeListData(index, 'publicationType', publicationType.value);
                                        }}
                                        value={
                                            publication.publicationType? 
                                            {
                                                value: publication.publicationType,
                                                label: publication.publicationType
                                            }
                                            : ""
                                        }
                                    />
                                </div>
                                
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Enter publication title"
                                    value={publication.publicationTitle}
                                    onChange={(e) => changeListData(index, 'publicationTitle', e.target.value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Publication File or Link
                                </label>
                                <div
										className={`--two_inputs --half_date ${publication.publicationLink ? '--link' : ''} ${
											publication.publicationFile ? '--file' : ''
										}`}
									>
										<Upload
											{...props}
											beforeUpload={(file) => {
												const oldState = [...certLoader];
												oldState[index] = true;
												setCertLoader(oldState);
												uploadImage(file)
													.then((res) => {changeListData(index, 'publicationFile', res)
													}
													)
													.catch((err) => changeListData(index, 'publicationFile', err))
													.finally(()=>{
														const oldState = [...certLoader];
														oldState[index] = false;
														setCertLoader(oldState);
													})

												return false;
											}}
										>
											<Button
                                                icon={!certLoader[index] && !publication.publicationFile  && <FileImage />}
                                                disabled={certLoader[index] || publication.publicationFile}
                                            >
											{
												(certLoader[index])?
												<Spin indicator={antIcon} /> :
                                                publication.publicationFile ? "File uploaded":
												'Upload File'
											}
											</Button>
										</Upload>
											{
												(publication.publicationFile &&
												<img
													src={deleteBin}
													alt=''
													className='delete'
													onClick={() => changeListData(index, 'publicationFile', null)}
												/>
												)
											}
										{
                                            !publication.publicationFile && !publication.publicationLink?
                                            <span className="filelinkor">or</span>: null
                                        }
										<div className='--input_wrapper'>
											<input
												name='publicationLink'
												type='text'
												value={publication.publicationLink}
												placeholder='Add Link'
												onChange={(e) => {
													changeListData(index, 'publicationLink', e.target.value);
												}}
											/>
										</div>
									</div>
                            </div>

                            
                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Year
                                </label>
                                <DatePicker
                                    placeholder="yyyy"
                                    suffixIcon={<DateSuffix />}
                                    onChange={(momentDate, dateString)=>{
                                        changeListData(index, 'publicationYear', dateString);

                                    }}
                                    picker="year"
                                    value={publication.publicationYear? moment(publication.publicationYear) : ''}
                                    disabledDate={d => !d || d.isAfter(moment())}
                                />
                            </div>
                        </div>
                    ))
                }
                <div
                    className="updates__form__footer"
                    onClick={() => {
                        setState([
                            ...state,
                            {
                                publicationType : "",
                                publicationTitle: "",
                                publicationYear: ""
                            }
                        ]);
                    }}
                >
                    <img src={blueCircle} alt='' />
                    <span>Add New Publication</span>
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
                    onClick={savePublicationDetails}
                >
                    Save
                </div>
            </div>

        </div>
    )
}
