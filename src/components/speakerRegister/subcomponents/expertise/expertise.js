import React, {useState, useEffect} from 'react';
import {Upload, message, Button, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import {DatePicker} from 'antd';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import MultiSelect from '@khanacademy/react-multi-select';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import deleteBin from '../../assets/bin.svg';
import closeTag from '../../assets/close.svg';

import uploadImage from '../../../../utilities/generalUtils/uploadImage';

import {
	SPEAKER_SPECIALITY,
	TOPIC_AREAS,
	DEFAULT_MULTI_OPTIONS,
	DEFAULT_SINGLE_OPTIONS,
	EDUCATION_OPTIONS,
	LANGUAGE_OPTIONS,
} from './constants';

import {
    SPEAKER_EXPERTISE_KEY
} from '../../component/constants';

import {
    cacheFormState
} from '../../../../utilities/dataPersist';

import './expertise.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss';

import blueCircle from '../../assets/circlePlus.svg';
import calendarIcon from '../../../../assets/calendar.svg';
import fileUpload from '../../assets/uploadFile.svg';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

export default function Expertise({stateChanger, state}) {
	const [certLoader, setCertLoader] = useState([]);;
	console.log(state.certifications)
	const [tagInputState, setTagInputState] = useState('');
	const changeTagInputState = (value) => {
		if (value.length < 20) {
			setTagInputState(value);
		}
	};

	function onChange(e) {
		console.log(`checked = ${e.target.checked}`);
	}

	useEffect(()=>{
		cacheFormState(SPEAKER_EXPERTISE_KEY, state);
	},[state])

	const [secondTagInputState, setSecondTagInputState] = useState('');
	const changeSecondTagInputState = (value) => {
		if (value.length < 20) {
			setSecondTagInputState(value);
		}
	};

	const deleteFormItem = (index, key) => {
		const oldItem = state[key].filter((edu, eduIndex)=>(
			index !== eduIndex
		));
		stateChanger({
			...state,
			[key]: oldItem
		});
	}

	const changeSelectState = (name, value) => {
		stateChanger({
			...state,
			[name]: value,
		});
	};
	const changeListData = (property, index, subproperty, value) => {
		const updatedState = {...state};
		updatedState[property][index][subproperty] = value;
		stateChanger(updatedState);
	};
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
	const monthFormat = 'MM/YY';
	const DateSuffix = () => <img height='14px' src={calendarIcon} alt='calendar' />;
	const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
	console.log(state)
	return (
		<div className='expertise'>
			<div className='personaldetails__heading'>
				<div className='personaldetails__heading__header'>Expertise</div>
			</div>

			<div className='expertise__formsection'>
				<div className='expertise__formsection__section'>
					<div className='expertise__formsection__section__header'>
						<div className='--heading'>Specialty</div>
						<div className='--sub_heading'>Tell us what kind of speaker you are.</div>
					</div>
					<div className='expertise__formsection__section__form --nomargin'>
						<div className='--input_wrapper --select'>
							<label htmlFor='position'>Primary Specialty</label>
							<div className='--singleselect'>
								<Select
									options={SPEAKER_SPECIALITY}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('primary_specialty', value)}
									value={state.primary_specialty}
								/>
							</div>
						</div>

						<div className='--input_wrapper --select'>
							<label htmlFor='company'>Secondary Specialty</label>
							<div className='--singleselect'>
								<Select
									options={SPEAKER_SPECIALITY}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('secondary_specialty', value)}
									value={state.secondary_specialty}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className='expertise__formsection__section'>
					<div className='expertise__formsection__section__header'>
						<div className='--heading'>Topic Areas</div>
						<div className='--sub_heading'>These are the broad topics your expertise falls under.</div>
					</div>
					<div className='expertise__formsection__section__form  --more-margin'>
						<div className='--input_wrapper --select'>
							<label className='double' htmlFor='position'>
								Primary Topic Area
							</label>
							<div className='--singleselect'>
								<Select
									options={TOPIC_AREAS}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('primary_topic_area', value)}
									value={state.primary_topic_area}
								/>
							</div>
						</div>

						<div className='--input_wrapper --tags'>
							<label className='double'>
								Topic Tags (Primary)
								<span>
									These are specific topics under your primary topic area you can easily speak about. Separate topics with commas. 
									{/*drag and drop to change topic arrangement.*/}
								</span>
							</label>
							<TagsInput
								value={state.primary_topic_tags}
								addKeys={[9, 13, 188]}
								onChange={(tag) => {
									stateChanger({
										...state,
										primary_topic_tags: tag,
									});
								}}
								inputValue={tagInputState}
								onChangeInput={changeTagInputState}
							/>
						</div>

						<div className='--input_wrapper --select'>
							<label className='double' htmlFor='position'>
								Secondary Topic Area
							</label>
							<div className='--singleselect'>
								<Select
									options={TOPIC_AREAS}
									isSearchable
									placeholder='Select'
									className='--item'
									onChange={(value) => changeSelectState('secondary_topic_area', value)}
									value={state.secondary_topic_area}
								/>
							</div>
						</div>

						<div className='--input_wrapper --tags'>
							<label className='double'>
								Topic Tags (Secondary)
								<span>
									These are specific topics under your secondary topic area you can easily speak about. Separate topics with comma. 
									{/*drag and drop to change topic arrangement.*/}
								</span>
							</label>
							<TagsInput
								value={state.secondary_topic_tags}
								addKeys={[9, 13, 188]}
								onChange={(tag) => {
									stateChanger({
										...state,
										secondary_topic_tags: tag,
									});
								}}
								inputValue={secondTagInputState}
								onChangeInput={changeSecondTagInputState}
							/>
						</div>
					</div>

					<div className='expertise__formsection__section'>
						<div className='expertise__formsection__section__header'>
							<div className='--heading'>Education</div>
						</div>
						{state.education.map((education, index) => (
							<div className='expertise__formsection__section__form'>
								{
									(index !== 0) &&
									<img
										src={closeTag}
										alt=""
										className="form_close"
										onClick={() => deleteFormItem(index, 'education')}
									/>
								}
								<div className='--input_wrapper'>
									<label htmlFor='position'>School</label>
									<input
										name='school'
										type='text'
										placeholder='Enter School Name'
										value={education.institution}
										onChange={(e) => {
											changeListData('education', index, 'institution', e.target.value);
										}}
									/>
								</div>

								<div className='--input_wrapper'>
									<label htmlFor='field_of_study'>field of study</label>
									<input
										name='field_of_study'
										type='text'
										value={education.field_of_study}
										onChange={(e) => {
											changeListData('education', index, 'field_of_study', e.target.value);
										}}
										placeholder="Enter Field of Study"
									/>
								</div>

								<div className='--input_wrapper'>
									<label htmlFor='dates'>From</label>
									<div className='--date_wrapper --half_date'>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('education', index, 'from', dateString);
											}}
											value={
												education.from?
												moment(education.from, monthFormat):''
											}
											disabledDate={d => !d || d.isAfter(moment())}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('education', index, 'to', dateString);
											}}
											value={
												education.to?
												moment(education.to, monthFormat):''
											}
											disabledDate={d => !d || d.isBefore(education.from)}
										/>
									</div>
									<div className="--tilldate">
										<Checkbox 
											onChange={(e)=>{
												if(e.target.checked){
													changeListData('education', index, 'to', moment().format(monthFormat))
												}else{
													changeListData('education', index, 'to', '')
												}
											}}
										>
											Till Date
										</Checkbox>
									</div>
								</div>
							</div>
						))}
						<div
							className='expertise__formsection__section__footer'
							onClick={() => {
								stateChanger({
									...state,
									education: [
										...state.education,
										{
											institution: '',
											field_of_study: '',
											from: '',
											to: '',
										},
									],
								});
							}}
						>
							<img src={blueCircle} alt='' />
							<span>Add New Education</span>
						</div>
					</div>

					<div className='expertise__formsection__section --last'>
						<div className='expertise__formsection__section__header'>
							<div className='--heading'>Certification and Licenses </div>
						</div>
						{state.certifications.map((cert, index) => (
							<div className='expertise__formsection__section__form'>
								{
									(index !== 0) &&
									<img
										src={closeTag}
										alt=""
										className="form_close"
										onClick={() => deleteFormItem(index, 'certifications')}
									/>
								}
								<div className='--input_wrapper'>
									<label htmlFor='position'>Certification Name</label>
									<input
										name='certification_name'
										type='text'
										placeholder='Enter School Name'
										value={cert.certification_name}
										onChange={(e) => {
											changeListData('certifications', index, 'certification_name', e.target.value);
										}}
									/>
								</div>

								<div className='--input_wrapper'>
									<label htmlFor='field_of_study'>Institution</label>
									<input
										name='institution_name'
										type='text'
										value={cert.institution_name}
										onChange={(e) => {
											changeListData('certifications', index, 'institution_name', e.target.value);
										}}
										placeholder="Enter institution Name"
									/>
								</div>


								<div className='--input_wrapper'>
									<label className='double'>
										Media
										<span>Upload or link to external documents, sites, photos and videos.</span>
									</label>
									<div
										className={`--two_inputs --half_date ${cert.link ? '--link' : ''} ${
											cert.file ? '--file' : ''
										}`}
									>
										<Upload
											{...props}
											beforeUpload={(file) => {
												const oldState = [...certLoader];
												oldState[index] = true;
												setCertLoader(oldState);
												uploadImage(file)
													.then((res) => {changeListData('certifications', index, 'file', res)
													}
													)
													.catch((err) => changeListData('certifications', index, 'file', err))
													.finally(()=>{
														const oldState = [...certLoader];
														oldState[index] = false;
														setCertLoader(oldState);
													})

												return false;
											}}
										>
											<Button icon={!certLoader[index] && <FileImage />}>
											{
												(certLoader[index])?
												<Spin indicator={antIcon} /> :
												'Upload File'
											}
											</Button>
										</Upload>
											{
												(cert.file &&
												<img
													src={deleteBin}
													alt=''
													className='delete'
													onClick={() => changeListData('certifications', index, 'file', null)}
												/>
												)
											}
										

										<div className='--input_wrapper'>
											<input
												name='field_of_study'
												type='text'
												value={cert.link}
												placeholder='Add Link'
												onChange={(e) => {
													changeListData('certifications', index, 'link', e.target.value);
												}}
											/>
										</div>
									</div>
								</div>

								<div className='--input_wrapper'>
									<label htmlFor='dates'>From</label>
									<div className='--date_wrapper --half_date'>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('certifications', index, 'from', dateString);
											}}
											value={
												cert.from?
												moment(cert.from, monthFormat):''
											}
											disabledDate={d => !d || d.isAfter(moment())}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('certifications', index, 'to', dateString);
											}}
											value={
												cert.to?
												moment(cert.to, monthFormat):''
											}
											disabledDate={d => (!d || d.isBefore(cert.from) || d.isAfter(moment())) }
										/>
									</div>
									<div className="--tilldate">
										<Checkbox 
											onChange={(e)=>{
												if(e.target.checked){
													changeListData('certifications', index, 'to', moment().format(monthFormat))
												}else{
													changeListData('certifications', index, 'to', '')
												}
											}}
										>
											Till Date
										</Checkbox>
									</div>
								</div>
							</div>
						))}
						<div
							className='expertise__formsection__section__footer'
							onClick={() => {
								stateChanger({
									...state,
									certifications: [
										...state.certifications,
										{
											certification_name: '',
											institution_name: '',
											from: '',
											to: '',
											file: null,
										},
									],
								});
							}}
						>
							<img src={blueCircle} alt='' />
							<span>Add New Certification</span>
						</div>
					</div>

					<div className='expertise__formsection__section__form --whitebg'>
						<div className='--input_wrapper --select'>
							<label className='double' htmlFor='position'>
								Highest Level of Education
							</label>
							<div className='--singleselect'>
								<Select
									options={EDUCATION_OPTIONS}
									isSearchable
									placeholder='Select'
									className='--item --cream'
									onChange={(value) => changeSelectState('highest_education', value)}
									value={state.highest_education}
								/>
							</div>
						</div>
					</div>

					<div className='expertise__formsection__section__form --whitebg'>
						<div className='--input_wrapper --select'>
							<label className='double' htmlFor='position'>
								Languages
							</label>
							<div className='--multiselect '>
								<MultiSelect
									options={LANGUAGE_OPTIONS}
									selected={state.languages}
									onSelectedChanged={(selected) => {
										changeSelectState('languages', selected);
									}}
									overrideStrings={{
										selectSomeItems: <span className='placeholding_text'>Select </span>,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='expertise__footer'>
				<div className='--button_group'>
					<Link className='link' to='/register/1'>
						<div className='cancel'>Back</div>
					</Link>

					<Link className='link' to='/register/3'>
						<div className='next'>Next</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

Expertise.propTypes = {
	stateChanger: PropTypes.func.isRequired,
	state: PropTypes.instanceOf(Object).isRequired,
};
