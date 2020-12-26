import React, {useState} from 'react';
import {Upload, Button, message, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';


import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/deleteBin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

import './imageTab.scss';
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
			const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				message.error('You can only upload JPG/PNG file!');
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
		<div className='imagetab'>
			<div className='imagetab__images'>
				{imagesUploaded.map((image, index) => (
					<div className='imagetab__images__image_wrapper' key={index}>
						<img src={image.src} className='imagetab__images__image' alt='temp view' />
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
