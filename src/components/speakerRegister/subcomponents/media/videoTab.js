import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './videoTab.scss';

import {Upload, Button, message} from 'antd';
import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/bin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

// const operations = <div>Extra Action</div>;
const MEDIA_TYPE = "video"
export default function VideoTab({state, stateChanger}) {
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
			const sizeInMb = file.size/1000000;
			if(sizeInMb > 50){
				message.error("Please upload a video file of less than 50MB");
				return;
			}
			const isMp4OrMkv = file.type === 'video/mp4' || file.type === 'video/x-matroska';
			if (!isMp4OrMkv) {
				message.error('You can only upload an MP4/MKV file!');
				return;
			}
			setLoading(true)
			uploadImage(file)
				.then((res) => stateChanger({...state,media:[...state.media, {link: res, category:MEDIA_TYPE}]}))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setLoading(false));
			return false;
		},
		disabled: state.media.filter(s=>s.category===MEDIA_TYPE).length >= 2,
	};

	return (
		<div className='videotab'>
			<div className='videotab__images'>
				{state.media.filter(s=>s.category===MEDIA_TYPE).map((image, index) => (
					<div className='videotab__images__image_wrapper' key={index}>
						<video className='videotab__images__image' controls>
							<video src={image.link} type={image.type} />
							Your browser does not support HTML5 video.
						</video>
						<img src={deleteBin} alt='' className='delete' onClick={() => deleteImage(index)} />
					</div>
				))}
			</div>
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
		</div>
	);
}

VideoTab.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}