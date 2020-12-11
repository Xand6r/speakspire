import React, {useState} from 'react';
import axios from '../../../utilities/axios'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message, Select } from 'antd';
import {useHistory} from 'react-router-dom';

import {component as Nav} from '../../../utilities/navbar';

import mailIcon from '../assets/mailIcon.svg';
import close from '../assets/close.svg';

import '../password.scss';
import '../../confirmMail/component/confirmMail.scss';
const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'#fff' }} spin />;
export default function Index() {
    const { Option } = Select;

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [identity, setIdentity] = useState('speakers');


    const history = useHistory();

    const generateLink = () => `/${identity}/generateToken`;

    const changePassword = () =>{
        // make api call
        if(!email){
            message.error("Please pass in a valid mail before proceeding");
            return;
        }
        setLoading(true)
        axios.post(generateLink(), {
            email
        })
        .then(({data}) => {
            console.log(data);
            setPage(2);
        })
        .catch(err => {
            message.error("Email doesn't exist please go over it.")
            console.log()
        })
        .finally(() =>{
            setLoading(false)
        })
    }
    return (
        <div className="passwordwrapper">
            {/* the navigation bar of the page */}
            <div className="--sticky">
                <Nav />
            </div>
            {/* the navigation bar of the page */}


            {/* main section of the page */}
            {
               ( page === 1)?
                (
                    <div className="passwordtab">
                            <img className="passwordtab__close" onClick={() => history.goBack()} src={close} alt=""/>
                            <div className="passwordtab__headingsection">
                                <div className="passwordtab__header">
                                        Forgot Password? 
                                </div>

                                <div className="passwordtab__subheader">
                                        No worries, it happens to the best of us. Enter your Speakspire account email below.
                                </div>
                            </div>

                            <div className="passwordtab__formsection">
                                <div className="inputwrapper">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={({target: {value}}) => setEmail(value)}
                                        style={{background: "white"}}
                                    />
                                </div>

                                <div className="inputwrapper">
                                    {/* wrapper for select item */}
                                        <label htmlFor='password'> Account type </label>
                                        <Select defaultValue={identity} allowClear onChange={(value) => setIdentity(value)}>
                                            <Option className='select-dropdown' value='individuals'>
                                                Individual
                                            </Option>
                                            <Option className='select-dropdown' value='speakers'>
                                                Speaker
                                            </Option>
                                            <Option className='select-dropdown' value='organizers'>
                                                Organiser
                                            </Option>
                                        </Select>
                                    {/* wrapper for select item */}
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
                ):
                (
                    <div className="confirmmail__banner">
                        <img className="passwordtab__close" onClick={() => history.goBack()} src={close} alt=""/>
                        <img
                            src={mailIcon}
                            alt=""
                        />
                        <div className="confirmmail__banner__text">
                            <div className="confirmmail__banner__text__header">
                                You’ve Got Mail
                            </div>
                            <div className="confirmmail__banner__text__subtext">
                                Hello! We’ve sent a password rest link to <b>{email || "Your mail address"}</b>. Please check your email to reset your password.
                            </div>
                        </div>
                    </div>
                )
               
            }
            {/* main section of the page */}
        </div>
    )
}
