import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import axios from '../../axios';
import { message, Spin } from 'antd';
import validator from './validate';

import { initialState } from './constants';
import './speakerprofileupdates.scss';
import '../updates.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />;
export default function UpdateProfile({ initialData, onClose, onSuccess }) {
	const [state, setState] = useState(initialState);
	const userID = useSelector(({ user }) => user.id);
	const [loading, setLoading] = useState(false);
	const changeFormState = (name, value) => {
		setState((state) => ({
			...state,
			[name]: value,
		}));
	};

	useEffect(() => {
		const { name, phone, email, price, state, country } = initialData;
		changeFormState('fullname', name);
		changeFormState('phonenumber', phone);
		changeFormState('email', email);
		changeFormState('price', price);
		changeFormState('state', state);
		changeFormState('country', country);
	}, [initialData]);

	const changeInputState = ({ target: { name, value } }) => {
		changeFormState(name, value);
	};

	const savePersonalDetails = () => {
		if (!validator(state)) {
			message.error('Please fill in all fields before proceeding');
			return;
		}
		setLoading(true);
		axios
			.patch(`/speakers/${userID}/info`, {
				name: state.fullname,
				email: state.email,
                phone: state.phonenumber,
				price: state.price,
                state: state.state,
                country: state.country,
                
			})
			.then((res) => {
				message.success('Details updated sucesfully!');
				onSuccess();
				onClose();
			})
			.catch((err) => {
				message.error('There was an error updating user!', err.response.data.message);
				onClose();
			})
			.finally(() => {
				setLoading(false);
			});

		// update the details logic
	};

	return (
		<div className='updates talks'>
			<div className='updates__form'>
				<div className='updates__form__header'>Contact Details</div>

				<div className='updates__form__content'>
					<div className='updates__form__content__item'>
						<label htmlFor='fullname'>Full Name</label>
						<input type='text' name='fullname' value={state.fullname} onChange={changeInputState} />
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='fullname'>Phone</label>
						<input type='text' name='phonenumber' value={state.phonenumber} onChange={changeInputState} />
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='fullname'>Email</label>
						<input type='text' name='email' value={state.email} onChange={changeInputState} />
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='price'>Price</label>
						<input type='text' name='price' value={state.price} onChange={changeInputState} />
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='state'>State</label>
						<input type='text' name='state' value={state.state} onChange={changeInputState} />
					</div>

					<div className='updates__form__content__item'>
						<label htmlFor='country'>Country</label>
						<input type='text' name='country' value={state.country} onChange={changeInputState} />
					</div>
				</div>
			</div>
			<div className='updates__action'>
				<div className='cancel' onClick={onClose}>
					Cancel
				</div>

				<div className='save' onClick={savePersonalDetails}>
					{loading ? <Spin indicator={antIcon} /> : 'Save'}
				</div>
			</div>
		</div>
	);
}
