import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router'
import jwtDecode from 'jwt-decode';
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import close from '../assets/close.svg';

import {component as Nav} from '../../../utilities/navbar';

import '../password.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#fff' }} spin />;
export default function Index() {
    const parameters = new URLSearchParams(window.location.search);
    const nuserToken = parameters.get('token');
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjp7ImVtYWlsIjoib2x1d2FmZXJhbm1pYWRldHVuamkxMTFAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJBZGV0dW5qaSBPbHV3YWZlcmFubWkiLCJyb2xlIjoic3BlYWtlciJ9LCJleHAiOjE2MDc2MTQ0NzYsImlzcyI6Imh0dHA6XC9cL2FwaS5zcGVha3NwaXJlLmNvbVwvIiwiaWF0IjoxNjA3NjEwODc2fQ.1_Cl3TXo0PsMaQV2VRyGvxgeKpWDy7puLmYGggEvZVk'
    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordHidden, setPasswordHidden] = useState(true);


    if(!userToken){
        history.push('/login')
    }

    const userInfo = jwtDecode(userToken);
    const { user_id : {id, role}} = userInfo;

    const changePassword = () => {
        history.push('/login?newpassword=true')
    }

    return (
        <div className="passwordwrapper">
            {/* the navigation bar of the page */}
            <div className="--sticky">
                <Nav />
            </div>
            {/* the navigation bar of the page */}

            {/* the formsection to send in your new password */}
            <div className="passwordtab">

                <img className="passwordtab__close" onClick={() => history.goBack()} src={close} alt=""/>
                <div className="passwordtab__headingsection">
                    <div className="passwordtab__header">
                        Reset Password? 
                    </div>
                </div>

                <div className="passwordtab__formsection">
                    <div className="inputwrapper">
                        <label htmlFor="">New Password</label>
                        <div className="--passwordinput">
                            <input
                                type={passwordHidden ? 'password' : 'text'}
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={({target: {value}}) => setNewPassword(value)}
                            />
                            <i className={passwordHidden ? 'far fa-eye' : 'fa fa-eye-slash'} id='togglePassword' onClick={() => setPasswordHidden(!passwordHidden)} />
                        </div>
                    </div>
                </div>

                <div
                    className="passwordtab__submit"
                    onClick={changePassword}
                >
                    {
                        (loading)?
                        <Spin indicator={antIcon} /> :
                        "Continue"
                    }
                </div>
            </div>
            {/* the formsection to send in your new password */}
        </div>
    )
}
