import React, {useState} from 'react';
import './videoTab.scss';

import {Upload, Button, message} from 'antd';
import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/bin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';

const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
// const operations = <div>Extra Action</div>;

export default function ImageTab() {
	const [imagesUploaded, setImagesUploaded] = useState([]);

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
			//   if (info.file.status !== 'uploading') {
			//     console.log(info.file.originFileObj, info.fileList.originFileObj);
			//   }
			//   if (info.file.status === 'done') {
			//     message.success(`${info.file.name} file uploaded successfully`);
			//   } else if (info.file.status === 'error') {
			//     message.error(`${info.file.name} file upload failed.`);
			//   }
		},
		beforeUpload: (file) => {
			const isMp4OrMkv = file.type === 'video/mp4' || file.type === 'video/x-matroska';
			if (!isMp4OrMkv) {
				message.error('You can only upload an MP4/MKV file!');
				return;
			}
			uploadImage(file)
				.then((res) => setImagesUploaded([...imagesUploaded, {src: res}]))
				.catch((err) => setImagesUploaded([...imagesUploaded, {src: err}]));
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
				<Button icon={<FileImage />}>Upload File</Button>
			</Upload>
		</div>
	);
}
