import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './pdfTab.scss';

import {Upload, Button, message} from 'antd';
import fileUpload from '../../assets/uploadFile.svg';
import deleteBin from '../../assets/bin.svg';
import uploadImage from '../../../../utilities/generalUtils/uploadImage';
import pdfLogo from '../../assets/pdfLogo.png'

const FileImage = () => <img height='14px' style={{'margin-right': '10px'}} src={fileUpload} alt='calendar' />;
const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#4D75F4' }} spin />;

// const operations = <div>Extra Action</div>;
const MEDIA_TYPE = "pdf"
export default function PDFTab({state, stateChanger}) {
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
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				message.error('You can only upload a PDF file!');
				return;
			}
			setLoading(true)
			uploadImage(file)
				.then((res) => stateChanger({...state,media:[...state.media, {link: res,name: file.name,  category:MEDIA_TYPE}]}))
				.catch((err) => message.error("There was an error uploading this image, please try again later"))
				.finally(()=>setLoading(false));
			return false;
		},
		disabled: state.media.filter(s=>s.category===MEDIA_TYPE).length >= 3,
	};

	return (
		<div className='pdftab'>
			<div className='pdftab__images'>
				{state.media.filter(s=>s.category===MEDIA_TYPE).map((image, index) => (
					<div className='pdftab__images__image_wrapper' key={index}>
						<img src={pdfLogo} className='pdftab__images__image' alt='temp view' />
                        <div className="pdftab__images__text">{image.name.slice(0,15)}</div>
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

PDFTab.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}