import React, {useState} from 'react';
import {Upload, message, Button} from 'antd';
import {Link} from 'react-router-dom';
import {UploadOutlined} from '@ant-design/icons';
import {DatePicker} from 'antd';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import MultiSelect from '@khanacademy/react-multi-select';
import PropTypes from 'prop-types';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

import {
	SPEAKER_SPECIALITY,
	TOPIC_AREAS,
	DEFAULT_MULTI_OPTIONS,
	DEFAULT_SINGLE_OPTIONS,
	EDUCATION_OPTIONS,
	LANGUAGE_OPTIONS,
} from './constants';

import './expertise.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss';

import blueCircle from '../../assets/circlePlus.svg';
import calendarIcon from '../../../../assets/calendar.svg';
import fileUpload from '../../assets/uploadFile.svg';
export default function Expertise({stateChanger, state}) {
	const [tagInputState, setTagInputState] = useState('');
	const changeTagInputState = (value) => {
		if (value.length < 20) {
			setTagInputState(value);
		}
	};

	const [secondTagInputState, setSecondTagInputState] = useState('');
	const changeSecondTagInputState = (value) => {
		if (value.length < 20) {
			setSecondTagInputState(value);
		}
	};

	const handleFormChange = (event) => {
		const {name, value} = event.target;
		stateChanger({
			...state,
			[name]: value,
		});
	};
	const changeDate = (momentDate, dateString, name) => {
		stateChanger({
			...state,
			[name]: [momentDate, dateString],
		});
	};
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
							<label htmlFor='position'>Primary</label>
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
							<label htmlFor='company'>Secondary (optional)</label>
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
					<div className='expertise__formsection__section__form'>
						<div className='--input_wrapper --select'>
							<label class='double' htmlFor='position'>
								Primary
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
									These are specific topics you can easily speak about. Separate topics with commas.{' '}
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
							<label class='double' htmlFor='position'>
								Secondary (optional)
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
									These are specific topics you can easily speak about. Separate topics with commas.{' '}
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
												changeListData('education', index, 'from', [momentDate, dateString]);
											}}
											value={education.from[0]}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('education', index, 'to', [momentDate, dateString]);
											}}
											value={education.to[0]}
										/>
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
											from: [],
											to: [],
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
												console.log('changed')
												changeListData('certifications', index, 'from', [momentDate, dateString]);
											}}
											value={cert.from[0]}
										/>
										<span>to</span>
										<DatePicker
											format={monthFormat}
											picker='month'
											placeholder='mm/yy'
											suffixIcon={<DateSuffix />}
											onChange={(momentDate, dateString) => {
												changeListData('certifications', index, 'to', [momentDate, dateString]);
											}}
											value={cert.to[0]}
										/>
									</div>
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
												uploadImage(file)
													.then((res) => changeListData('certifications', index, 'file', res))
													.catch((err) => changeListData('certifications', index, 'file', err));

												return false;
											}}
										>
											<Button icon={<FileImage />}>Upload File</Button>
										</Upload>

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
									placeholder='Location'
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
										selectSomeItems: <span class='placeholding_text'>Select Language</span>,
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
