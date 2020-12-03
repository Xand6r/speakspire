import React,{useState, useEffect} from 'react';

import moment from 'moment';
import {message, DatePicker, Upload, Button, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import fileUpload from '../../../components/speakerRegister/assets/uploadFile.svg';
import deleteBin from '../../../components/speakerRegister/assets/bin.svg';
import uploadImage from '../../../utilities/generalUtils/uploadImage';
import calendarIcon from '../../../assets/calendar.svg';
import blueCircle from '../assets/blueCircle.svg';
import closeTag from '../assets/closeTag.svg';

import validateDetails from './validate';

import '../updates.scss';
import './speakerCertificationUpdates.scss';

export default function Index({
    onClose, initialData
}) {
    const [state, setState] = useState([
        {
            name: "",
            institution: "",
            from: "",
            to: "",
            file: "",
            link:""
        }
    ]);

    useEffect(() => {
        if(!initialData) return;
        const newState = initialData.map(datum => {
            const {
                name, institution, from, to, proof
            } = datum

            return {
                name, institution, from, to, link: proof
            }
        })
        console.log(newState)
        setState(newState);

    }, [initialData])
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
    const [certLoader, setCertLoader] = useState([]);;

    const deleteFormItem = (index) => {
		const oldItem = state.filter((s, eduIndex)=>(
			index !== eduIndex
		));
		setState(oldItem)
    }
    const saveCertificationDetails = () => {
        if(!validateDetails(state)){
            message.error("Please fill in all details before submitting!");
        }
        // sucesfully save details and then alert
        message.success("Profile Sucessfully updated!");
        onClose()
    }
    const changeListData = (index, property, value) => {
		const updatedState = [...state];
		updatedState[index][property] = value;
		setState(updatedState);
    };
    const monthFormat = 'MM/YY';
    const DateSuffix = () => (
        <img height="14px" src={calendarIcon} alt="calendar"/>
    );
    const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;


    return (
        <div className="updates position">

            <div className="updates__form">
                <div className="updates__form__header">
                    Certifications & Licsences
                </div>

                {
                    state.map((certification, index) => (
                        <div
                            key={`${index}-certification`}
                            className="updates__form__content --withmargin"
                        >
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
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Institution Name"
                                    value={certification.name}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Enter Field of Study"
                                    value={certification.institution}
                                    onChange={({target: {value, name}}) => changeListData(index, name, value)}
                                />
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    From
                                </label>
                                <div className="--date_wrapper --half_date">
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeListData(index, 'from', dateString)
                                        }}
                                        value={
                                            certification.from?
                                            moment(certification.from, monthFormat):''
                                        }
                                        disabledDate={d => !d || d.isAfter(moment())}
                                    />
                                    <span>to</span>
                                    <DatePicker
                                        format={monthFormat}
                                        picker="month"
                                        placeholder="mm/yy"
                                        suffixIcon={<DateSuffix />}
                                        onChange={(momentDate, dateString)=>{
                                            changeListData(index, 'to', dateString)
                                        }}
                                        value={
                                            certification.to?
                                            moment(certification.to, monthFormat):''   
                                        }
                                        disabledDate={d => !d || d.isBefore(certification.from)}
                                    />
                                </div>
                            </div>

                            <div className="updates__form__content__item">
                                <label htmlFor="fullname">
                                    Publication File or Link
                                </label>
                                <div
										className={`--two_inputs --half_date ${certification.link ? '--link' : ''} ${
											certification.file ? '--file' : ''
										}`}
									>
										<Upload
											{...props}
											beforeUpload={(file) => {
												const oldState = [...certLoader];
												oldState[index] = true;
												setCertLoader(oldState);
												uploadImage(file)
													.then((res) => {changeListData(index, 'file', res)
													}
													)
													.catch((err) => changeListData(index, 'file', err))
													.finally(()=>{
														const oldState = [...certLoader];
														oldState[index] = false;
														setCertLoader(oldState);
													})

												return false;
											}}
										>
											<Button
                                                icon={!certLoader[index] && !certification.file  && <FileImage />}
                                                disabled={certLoader[index] || certification.file}
                                            >
											{
												(certLoader[index])?
												<Spin indicator={antIcon} /> :
                                                certification.file ? "File uploaded":
												'Upload File'
											}
											</Button>
										</Upload>
											{
												(certification.file &&
												<img
													src={deleteBin}
													alt=''
													className='delete'
													onClick={() => changeListData(index, 'file', null)}
												/>
												)
											}
										{
                                            !certification.file && !certification.link?
                                            <span className="filelinkor">or</span>: null
                                        }
										<div className='--input_wrapper'>
											<input
												name='link'
												type='text'
												value={certification.link}
												placeholder='Add Link'
												onChange={(e) => {
													changeListData(index, 'link', e.target.value);
												}}
											/>
										</div>
									</div>
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
                                position: "",
                                company: "",
                                from: "",
                                to: ""
                            }
                        ]);
                    }}
                >
                    <img src={blueCircle} alt='' />
                    <span>Add New Certification</span>
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
                    onClick={saveCertificationDetails}
                >
                    Save
                </div>
            </div>

        </div>
    )
}
