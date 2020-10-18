import React from 'react';
import './signinTab.scss';
import SigninInput from '../subcomponents/signinInputs';
import close from '../../../assets/close.svg';
import userLogo from '../assets/userLogo.svg';

import { withRouter } from 'react-router-dom';

import axios from 'axios';

const Image = () => {
	const handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, 'imagename');
		axios
			.post('http://api.speakspire.com/speakers/1/photo/profile', formData,     {headers: {
                'Content-Type': 'multipart/form-data'
              }})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err.response.data));
	};

	const handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	return (
		<div>
			<input type='file' id='imageInput' hidden='hidden' onChange={handleImageChange} />
			<button onClick={handleEditPicture}>Select File</button>
		</div>
	);
};
function signintab({history}) {
    return (
        <div className="signintab">
            <img
                className="signintab__close" 
                src={close}
                alt="close button"
                onClick={() => history.goBack()}
            />

            <img
                className="signintab__sideimage"
                src={userLogo}
                alt="userLogo"
            />
            <Image />

            <div className="signininputcomponent">
                <SigninInput />
            </div>

        </div>
    )
}

export default withRouter(signintab);