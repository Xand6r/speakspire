import React, { useState } from 'react';
import { Select, Spin, message } from 'antd';
import { useHistory } from "react-router";

import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../utilities/axios'

import { ROLES_AND_URLS } from './constants';

import './signinInputs.scss';

export default function SigninInputs() {
    
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'white' }} spin />;
    const history = useHistory()
    const { Option } = Select;
    const [ loading, setLoading ] = useState(false);
    const [identity, setIdentity ] =useState('individual')
    function handleChange(value) {
        setIdentity(value);
    }
    const [state, stateChanger ] = useState({email:"", password:""});
    const handleFormChange = (event)=>{
        const {name, value} = event.target;
        stateChanger({
            ...state,
            [name]: value
          });
    };
    const loginUser = () =>{
        setLoading(true);
        axios.post(ROLES_AND_URLS[identity], state)
        .then(res=>{
            setLoading(false)
            const userToken = res.data.data;
            message.success("Login Sucessfull");
            sessionStorage.setItem("speakspire_token", userToken);
            setTimeout(()=>{
                history.push("/speakers");
            }, 1000)
        })
        .catch(err=>{
            setLoading(false)
            message.error(err?.response?.data?.message)
        })
    }

    const [passwordHidden, setPasswordHidden ] = useState(true);
    return (
        <div className="signininputs">
            
            <div className="signininputs__headers">
                <div className="signininputs__headers__heading">
                    Sign In
                </div>

                <div className="signininputs__headers__subheading">
                    New to Speakspire? <span class="blue__text" onClick={()=>history.push('/category')}>Sign Up</span>
                </div>
            </div>

            <div className="signininputs__form">
                <div className="--inputwrapper">
                    <label htmlFor="email"> Email </label>
                    <input 
                        placeholder="Enter your email"
                        type="text"
                        onChange={handleFormChange}
                        name="email"
                        id="email"
                    />
                </div>
                <div className="--inputwrapper">
                    <label htmlFor="password"> Password </label>
                        <div className="--passwordinput">
                        <input
                            onChange={handleFormChange}
                            placeholder="Enter your password"
                            type={(passwordHidden)?"password":"text"}
                            name="password"
                            id="password"
                        />
                        <i 
                            className={(passwordHidden)?"far fa-eye":"fa fa-eye-slash"}
                            id="togglePassword" 
                            onClick={() => setPasswordHidden(!passwordHidden)}
                        />
                    </div>
                </div>

                {/* wrapper for select item */}
                <div className="--inputwrapper">
                    <label htmlFor="password"> Account type </label>
                    <Select defaultValue={identity} allowClear onChange={handleChange}>
                        <Option className="select-dropdown" value="individual">Individual</Option>
                        <Option className="select-dropdown" value="speaker">Speaker</Option>
                        <Option className="select-dropdown" value="organiser">Organiser</Option>
                    </Select>
                </div>
                {/* wrapper for select item */}

                <span className="blue__text">Forgot Password?</span>
            </div>

            <div
                className="signininputs__submit"
                onClick={loginUser}
            >
            {
                loading?
                <Spin indicator={antIcon} /> : "Sign in"
            }
            </div>

        </div>
    )
}
