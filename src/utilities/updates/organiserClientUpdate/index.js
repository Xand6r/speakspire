import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { message, Spin } from 'antd';
import TagsInput from 'react-tagsinput';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import {jsonParse} from '../../utils'


import '../updates.scss';
import './speakerTopicUpdate.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../stylesheets/tag.scss';
import { cleanData, validateData } from './validator';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;

export default function Index({ onClose, initialData, onSuccess }) {
	const [state, setState] = useState([]);
	const [loading, setLoading] = useState(false);
	const userId = useSelector(({ user }) => user.id);

	useEffect(() => {
		if (initialData) {
			const { clients } = initialData;
			setState(jsonParse(clients));
		}
	}, [initialData]);

	const saveTopicsState = () => {
		if (state.length) {
			// set lading state
			setLoading(true);
			// make patch request
			axios
				.patch(`organizers/${userId}/clients`, {
					clients: JSON.stringify(state),
				})
				.then(() => {
					message.success('Details updated sucesfully!');
					onClose();
					onSuccess();
				})
				.catch((err) => {
					console.log(err);
					message.error('There was an error updating user!', err.response.data.message);
					onClose();
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			message.error('Please fill in all details before submitting!');
			return;
		}
	};

	return (
		<div className='updates clients'>
			<div className='updates__form'>
				<div className='updates__form__header'>Edit Clients</div>

				<div className='updates__form__content'>
					<div className='updates__form__content__item'>
						<label className='double' htmlFor='fullname'>
							Clients
							<span>
								Who have you worked for? Separate client names with commas.
							</span>
						</label>
						<div className='--input_wrapper --tags'>
							<TagsInput
								value={state}
								addKeys={[9, 13, 188]}
								onChange={(tag) => {
									setState(tag);
								}}
								inputProps={{
								placeholder: !state.length? "Client 1, Client 2" : "Client",
							}}
							/>
						</div>
					</div>

				</div>
			</div>

			<div className='updates__action'>
				<div className='cancel' onClick={onClose}>
					Cancel
				</div>

				<div className='save' onClick={saveTopicsState}>
					{loading ? <Spin indicator={antIcon} /> : 'Save'}
				</div>
			</div>
		</div>
	);
}
