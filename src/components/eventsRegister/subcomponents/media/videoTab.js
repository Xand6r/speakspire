import React, {useState} from 'react';
import {LoadingOutlined} from '@ant-design/icons';

import {Upload, Button, message, Spin} from 'antd';

import './videoTab.scss';
import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/bin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#4D75F4'}} spin />;

export default function ImageTab() {
	const [imagesUploaded, setImagesUploaded] = useState([]);
	const [loading, setLoading] = useState(false);

	const deleteImage = (index) => {
		setImagesUploaded(
			imagesUploaded.filter((image, imageIndex) => {
				return imageIndex !== index;
			})
		);
	};
	const props = {
		name: 'file',
		onChange(info) {
		},
		beforeUpload: (file) => {
			const isMp4OrMkv = file.type === 'video/mp4' || file.type === 'video/x-matroska';
			if (!isMp4OrMkv) {
				message.error('You can only upload an MP4/MKV file!');
				return;
			}
			setLoading(true);
			uploadImage(file)
				.then((res) => setImagesUploaded([...imagesUploaded, {src: res}]))
				.catch((err) => setImagesUploaded([...imagesUploaded, {src: err}]))
				.finally(()=>setLoading(false))

			return false;
		},
		disabled: imagesUploaded.length >= 2,
	};

	return (
		<div className='videotab'>
			<div className='videotab__images'>
				{imagesUploaded.map((image, index) => (
					<div className='videotab__images__image_wrapper' key={index}>
						<video className='videotab__images__image' controls>
							<source src={image.src} type={image.type} />
							Your browser does not support HTML5 video.
						</video>
						{/* <img
                                
                                
                                alt="temp view"
                            /> */}
						<img src={deleteBin} alt='' className='delete' onClick={() => deleteImage(index)} />
					</div>
				))}
			</div>
			<Upload {...props}>
				<Button
					disabled={loading}
					icon={!loading && <FileImage />}
				>
					{loading ? <Spin indicator={antIcon} /> : 'Upload File'}
				</Button>
			</Upload>
		</div>
	);
}
