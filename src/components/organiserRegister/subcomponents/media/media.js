import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Upload, message, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import {Spin} from 'antd';

import './media.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss';

import fileUpload from '../../assets/uploadFile.svg';
import whiteTick from '../../assets/whiteTick.svg';
import deleteBin from '../../assets/deleteBin.svg';

import wwwLogo from '../../assets/www.svg';
import Instagram from '../../assets/instagram.svg';
import LinkedIn from '../../assets/linkedin.svg';
import Twitter from '../../assets/twitter.svg';
import Facebook from '../../assets/facebook.svg';
import behance from '../../assets/behance.svg';
import dribbble from '../../assets/dribbble.svg';
import pintrest from '../../assets/pintrest.svg';
import github from '../../assets/github.svg';

import uploadImage from '../../../../utilities/generalUtils/uploadImage';
import { SPEAKER_SPECIALITY } from '../../component/constants';
import cleanData from '../utils/cleanData';
import {LoadingOutlined} from '@ant-design/icons';

import {
    ORGANISER_MEDIA_KEY
} from '../../component/constants';
import {
	cacheFormState
}  from '../../../../utilities/dataPersist';


const PROFILE_LINKS = [
	[wwwLogo, 'www.'],
	[Instagram, 'instagram.com/'],
	[LinkedIn, 'linkedin.com/in/'],
	[Twitter, 'twitter.com/'],
	[Facebook, 'facebook.com/ '],
	[behance, 'behance.net/'],
	[dribbble, 'dribbble.com/ '],
	[pintrest, 'pintrest.com/ '],
	[github, 'github.com/ '],
];

const FileImage = () => <img height='14px' style={{ marginRight: '10px' }} src={fileUpload} alt='calendar' />;

const DoneImage = () => <img height='14px' style={{ marginRight: '10px' }} src={whiteTick} alt='calendar' />;


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
const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#4D75F4'}} spin />;

export default function Media({ stateChanger, state, handleSubmit }) {
	const [tagInputState, setTagInputState] = useState('');
	const [loadingStates, setLoadingStates] = useState({
		coverPictureLoading: false,
		userPictureLoading: false,
		submitLoading: false
	});
	const changeTagInputState = (value) => {
		if (value.length < 20) {
			setTagInputState(value);
		}
	};

	const [secTagInputState, setSecTagInputState] = useState('');
	const changeSecTagInputState = (value) => {
		if (value.length < 20) {
			setSecTagInputState(value);
		}
	};

	const [thirdtagInputState, setThirdTagInputState] = useState('');
	const changeThirdTagInputState = (value) => {
		if (value.length < 20) {
			setThirdTagInputState(value);
		}
	};

	const changeSelectState = (name, value) => {
		stateChanger({
			...state,
			[name]: value,
		});
	};

	const handleCreateAccount = () => {
		if(loadingStates.submitLoading) return;
		setLoadingStates({...loadingStates, submitLoading: true})
		handleSubmit().finally(()=>{
			setLoadingStates({...loadingStates, submitLoading: false})
		})
	}

	/**
	 * watch for changes in the state and uplod accordingly
	*/
	useEffect(()=>{
		cacheFormState(ORGANISER_MEDIA_KEY,state);
	},[state])

	return (
		<div className='organiserlogin'>
			<div className='organiserlogin__heading --more-padding'>
				<div className='organiserlogin__heading__header'>Organiser info</div>
			</div>

			<div className='organiserlogin__formsection'>
				<div className='organiserlogin__formsection__section --more-padding'>
					<label className='double' htmlFor='position'>
						Specialty *
					</label>
					<div className='--singleselect'>
						<Select
							options={SPEAKER_SPECIALITY}
							isSearchable
							placeholder='Select'
							className='--item'
							onChange={(value) => changeSelectState('speciality', value)}
							value={state.speciality}
						/>
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label className='double'>
						Services *
						<span>Add specific services you offer. Separate services with commas.</span>
					</label>
					<div className='--input_wrapper --tags --grey'>
						<TagsInput
							value={state.services}
							addKeys={[9, 13, 188]}
							onChange={(tag) => {
								changeSelectState('services', tag);
							}}
							inputValue={tagInputState}
							onChangeInput={changeTagInputState}
							inputProps={{
								placeholder: 'Service 1, Service 2',
							}}
						/>
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label className='double' htmlFor='fullbio'>
						Company Bio *
						<span>Enter company bio</span>
					</label>
					<textarea
						name='bio'
						type='text'
						placeholder='Enter Your Full Bio'
						value={state.bio}
						onChange={(e) => {
							changeSelectState('bio', e.target.value);
						}}
					/>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label className='double'>
						Clients *
						<span>Who have you worked for? Separate client names with commas.</span>
					</label>
					<div className='--input_wrapper --tags --grey'>
						<TagsInput
							value={state.clients}
							addKeys={[9, 13, 188]}
							onChange={(tag) => {
								changeSelectState('clients', tag);
							}}
							inputValue={secTagInputState}
							onChangeInput={changeSecTagInputState}
							inputProps={{
								placeholder: 'Client 1, Client 2',
							}}
						/>
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label className='double'>
						Partners *
						<span>Who do you work with? Separate client names with commas.</span>
					</label>
					<div className='--input_wrapper --tags --grey'>
						<TagsInput
							value={state.partners}
							addKeys={[9, 13, 188]}
							onChange={(tag) => {
								changeSelectState('partners', tag);
							}}
							inputValue={thirdtagInputState}
							onChangeInput={changeThirdTagInputState}
							inputProps={{
								placeholder: 'Partner 1, Partner 2',
							}}
						/>
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label htmlFor=''>Profile Links</label>
					<div className='form_wrapper'>
						{PROFILE_LINKS.map((profileLink, index) => (
							<div className='icon_input'>
								<img src={profileLink[0]} alt='icon' className='icon' />
								<input
									type='text'
									placeholder={profileLink[1]}
									value={state.links[index]}
									onChange={(e) => {
										let newState = [...state.links];
										const textContent = e.target.value;
										if(textContent.length === 1 && !newState[index]){
											newState[index] = `${profileLink[1]}${textContent}`;
											changeSelectState('links', newState);
											return;

										}else if(textContent === profileLink[1]){
											newState[index] = '';
											changeSelectState('links', newState);
											return;
										}

										newState[index] = textContent;
										changeSelectState('links', newState);
									}}
								/>
							</div>
						))}
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding'>
					<label htmlFor=''>Profile Photo</label>
					<div className='form_wrapper'>
						<ImgCrop shape='round'>
							<Upload
								{...props}
								beforeUpload={(file) => {
									const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
									if (!isJpgOrPng) {
										message.error('You can only upload JPG/PNG file!');
										return;
									}
									setLoadingStates({
										...loadingStates,
										userPictureLoading: true,
									});
									uploadImage(file)
										.then((res) => changeSelectState('profilePhoto', { file, src: res }))
										.catch((err) => changeSelectState('profilePhoto', { file, src: err }))
										.finally(() => {
											setLoadingStates({
												...loadingStates,
												userPictureLoading: false,
											});
										})

									return false;
								}}>
								{state.profilePhoto.src ? (
									<div className='image_upload_button --uploaded'>
										<Button disabled icon={<DoneImage />}>
											Uploaded
										</Button>
									</div>
								) : (
									<div className='image_upload_button'>
									<Button
											disabled={loadingStates.userPictureLoading || loadingStates.coverPictureLoading}
											icon={!loadingStates.userPictureLoading && <FileImage />}
										>
											{loadingStates.userPictureLoading ? <Spin indicator={antIcon} /> : 'Upload File'}
										</Button>
									</div>
								)}
							</Upload>
						</ImgCrop>
						{state.profilePhoto.src ? (
							<div
								className='file_delete'
								onClick={(e) => {
									changeSelectState('profilePhoto', { src: undefined });
								}}>
								<img src={deleteBin} alt='' />
								<span>Delete Photo</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>

				<div className='organiserlogin__formsection__section --more-padding --more-margin'>
					<label htmlFor=''>Cover Photo</label>
					<div className='form_wrapper'>
						<ImgCrop aspect='3.49'>
							<Upload
								{...props}
								beforeUpload={(file) => {
									const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
									if (!isJpgOrPng) {
										message.error('You can only upload JPG/PNG file!');
										return;
									}
									setLoadingStates({
										...loadingStates,
										coverPictureLoading: true,
									});
									uploadImage(file)
										.then((res) => changeSelectState('coverPhoto', { file, src: res }))
										.catch((err) => changeSelectState('coverPhoto', { file, src: err }))
										.finally(() => {
											setLoadingStates({
												...loadingStates,
												coverPictureLoading: false,
											});
										});
									return false;
								}}>
								{state.coverPhoto.src ? (
									<div className='image_upload_button --uploaded'>
										<Button disabled icon={<DoneImage />}>
											Uploaded
										</Button>
									</div>
								) : (
									<div className='image_upload_button'>
										<Button
											disabled={loadingStates.coverPictureLoading || loadingStates.userPictureLoading}
											icon={!loadingStates.coverPictureLoading && <FileImage />}
										>
											{loadingStates.coverPictureLoading ? <Spin indicator={antIcon} /> : 'Upload File'}
										</Button>
									</div>
								)}
							</Upload>
						</ImgCrop>
						{state.coverPhoto.src ? (
							<div
								className='file_delete'
								onClick={(e) => {
									changeSelectState('coverPhoto', { src: undefined });
								}}>
								<img src={deleteBin} alt='' />
								<span>Delete Photo</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</div>

			<div className='organiserlogin__footer --more-padding'>
				<div className='--button_group'>
					<Link className='link' to='/organiser/1'>
						<div className='cancel'>Back</div>
					</Link>

					<Link className='link' onClick={handleCreateAccount}>
					<div className='next'>
						{
							loadingStates.submitLoading?
							<Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />} /> :
							'Create My Account'
						}
					</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

Media.propTypes = {
	stateChanger: PropTypes.func.isRequired,
	state: PropTypes.instanceOf(Object).isRequired,
};
