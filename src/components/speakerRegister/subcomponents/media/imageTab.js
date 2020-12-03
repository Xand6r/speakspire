import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import './imageTab.scss';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {Upload, Button, message} from 'antd';
import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/bin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';
const FileImage = () => <img height='14px' style={{'marginRight': '10px'}} src={fileUpload} alt='calendar' />;
// const operations = <div>Extra Action</div>;

const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;
const MEDIA_TYPE = "photo";
export default function ImageTab({
	state, stateChanger
}) {
	const [loading, setLoading] = useState(false);
	const deleteImage = (index) => {
		stateChanger({...state,media:
			state.media.filter((image, imageIndex) => {
				return imageIndex !== index;
			})
		});
	};
	const props = {
		name: 'file',
		onChange(info) {

		},
		beforeUpload: (file) => {
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
				return;
			}
			setLoading(true);
			uploadImage(file)
				.then((res) => 	stateChanger({...state,media:[...state.media, {link: res, category:MEDIA_TYPE}]}))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setLoading(false));
			return false;
		},
		disabled: state.media.filter(s=>s.category===MEDIA_TYPE).length >= 2,
	};
	return (
		<div className='imagetab'>
			<div className='imagetab__images'>
				{state.media.filter(s=>s.category===MEDIA_TYPE).map((image, index) => (
					<div className='imagetab__images__image_wrapper' key={index}>
						<img src={image.link} className='imagetab__images__image' alt='temp view' />
						<img src={deleteBin} alt='' className='delete' onClick={() => deleteImage(index)} />
					</div>
				))}
			</div>
			<ImgCrop aspect='1.49' >
				<Upload {...props}>
					<Button
						disabled={loading}
						icon={!loading && <FileImage />}
					>
					{
						(loading)?
						<Spin indicator={antIcon} /> :
						"Upload File"
					}
					</Button>
				</Upload>
			</ImgCrop>
		</div>
	);

	
}

ImageTab.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
