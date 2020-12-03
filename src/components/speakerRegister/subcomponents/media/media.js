import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import {Spin} from 'antd';
import whiteTick from '../../assets/whiteTick.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

import ImageTab from './imageTab';
import VideoTab from './videoTab';
import PDFTab from './pdfTab';
import {Tabs} from 'antd';

import './media.scss';

import fileUpload from '../../assets/uploadFile.svg';

import wwwLogo from '../../assets/www.svg';
import Instagram from '../../assets/instagram.svg';
import LinkedIn from '../../assets/linkedin.svg';
import Twitter from '../../assets/twitter.svg';
import Facebook from '../../assets/facebook.svg';
import behance from '../../assets/behance.svg';
import dribbble from '../../assets/dribbble.svg';
import pintrest from '../../assets/pintrest.svg';
import github from '../../assets/github.svg';
import deleteBin from '../../assets/deleteBin.svg';
import {LoadingOutlined} from '@ant-design/icons';

import {Upload, message, Button} from 'antd';

import {
    SPEAKER_MEDIA_KEY
} from '../../component/constants';

import {
    cacheFormState
} from '../../../../utilities/dataPersist';

const {TabPane} = Tabs;

function callback(key) {
	console.log(key);
}

const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#4D75F4'}} spin />;
const PROFILE_LINKS = [
	[wwwLogo, 'www.'],
	[Instagram, 'instagram.com/'],
	[LinkedIn, 'linkedin.com/'],
	[Twitter, 'twitter.com/'],
	[Facebook, 'facebook.com/ '],
	[behance, 'behance.net/'],
	[dribbble, 'dribbble.com/'],
	[pintrest, 'pintrest.com/'],
	[github, 'github.com/'],
];

const FileImage = () => <img height='14px' style={{marginRight: '10px'}} src={fileUpload} alt='calendar' />;
const DoneImage = () => <img height='14px' style={{marginRight: '10px'}} src={whiteTick} alt='calendar' />;

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

export default function Media({stateChanger, state, handleSubmit}) {
	const changeSelectState = (name, value) => {
		stateChanger({
			...state,
			[name]: value,
		});
	};

	const [loadingStates, setLoadingStates] = useState({
		coverPictureLoading: false,
		userPictureLoading: false,
		submitLoading: false
	});

	const handleSubmitForm = () =>{
		setLoadingStates({...loadingStates, submitLoading:true});
		handleSubmit()
		.finally(()=>{
			setLoadingStates({...loadingStates, submitLoading:false});
		})
	}
	useEffect(()=>{
		cacheFormState(SPEAKER_MEDIA_KEY, state)
	}, [state]);

	return (
		<div className='media'>
			<div className='media__heading --more-padding'>
				<div className='media__heading__header'>Preferences</div>
			</div>

			<div className='media__formsection'>
				<div className='media__formsection__section --more-padding'>
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
										.then((res) => changeSelectState('profile_photo', {src: res}))
										.catch((err) => changeSelectState('profile_photo', {src: err}))
										.finally(() => {
											setLoadingStates({
												...loadingStates,
												userPictureLoading: false,
											});
										});
									return false;
								}}
							>
								{state.profile_photo.src ? (
									<div className='image_upload_button --uploaded'>
										<Button disabled icon={<DoneImage />}>
											Uploaded
										</Button>
									</div>
								) : (
									<div className='image_upload_button'>
										<Button
											disabled={loadingStates.coverPictureLoading || loadingStates.userPictureLoading}
											icon={!loadingStates.userPictureLoading && <FileImage />}
										>
											{loadingStates.userPictureLoading ? <Spin indicator={antIcon} /> : 'Upload File'}
										</Button>
									</div>
								)}
							</Upload>
						</ImgCrop>
						{state.profile_photo.src ? (
							<div
								className='file_delete'
								onClick={(e) => {
									changeSelectState('profile_photo', {src: undefined});
								}}
							>
								<img src={deleteBin} alt='' />
								<span>Delete Photo</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>

				<div className='media__formsection__section --more-padding'>
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
										.then((res) => changeSelectState('cover_photo', {src: res}))
										.catch((err) => changeSelectState('cover_photo', {src: err}))
										.finally(() => {
											setLoadingStates({
												...loadingStates,
												coverPictureLoading: false,
											});
										});
									return false;
								}}
							>
								{state.cover_photo.src ? (
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
						{state.cover_photo.src ? (
							<div
								className='file_delete'
								onClick={(e) => {
									changeSelectState('cover_photo', {src: undefined});
								}}
							>
								<img src={deleteBin} alt='' />
								<span>Delete Photo</span>
							</div>
						) : (
							''
						)}
					</div>
				</div>

				<div className='media__formsection__section --more-padding'>
					<label htmlFor=''>Profile Links</label>
					<div className='form_wrapper'>
						{PROFILE_LINKS.map((profileLink, index) => (
							<div className='icon_input' key={index}>
								<img src={profileLink[0]} alt='icon' className='icon' />
								<input
									type='text'
									placeholder={profileLink[1]}
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
									value={state.links[index]}
								/>
							</div>
						))}
					</div>
				</div>

				<div className='media__formsection__section'>
					<label htmlFor=''>Add media</label>
					<div className='form_wrapper'>
						<Tabs defaultActiveKey='1' onChange={callback}>
							{/* the tab to upload images */}
							<TabPane tab='Photos' key='1'>
								<ImageTab state={state} stateChanger={stateChanger} />
							</TabPane>
							{/* the tab to upload images */}

							<TabPane tab='Videos' key='2'>
								<VideoTab state={state} stateChanger={stateChanger} />
							</TabPane>

							<TabPane tab='Presentation' key='3'>
								<PDFTab state={state} stateChanger={stateChanger} />
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>

			<div className='media__footer'>
				<div className='--button_group'>
					<Link className='link' to='/register/4'>
						<div className='cancel'>Back</div>
					</Link>

					<Link className='link' onClick={handleSubmitForm}>
						<div className='next'>
							{
								loadingStates.submitLoading?
								<Spin indicator={
									<LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />
								} />:
								"Create My Account"
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
	handleSubmit: PropTypes.instanceOf(Function).isRequired,
};
