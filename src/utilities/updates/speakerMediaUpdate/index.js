import React, {useState} from 'react';
import {jsonParse} from '../../utils';

import wwwLogo from './assets/www.svg';
import Instagram from './assets/instagram.svg';
import LinkedIn from './assets/linkedin.svg';
import Twitter from './assets/twitter.svg';
import Facebook from './assets/facebook.svg';
import behance from './assets/behance.svg';
import dribbble from './assets/dribbble.svg';
import pintrest from './assets/pintrest.svg';
import github from './assets/github.svg';

import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import {useSelector} from 'react-redux';

import {initialState} from './constants';
import './speakermediaupdate.scss';
import { useEffect } from 'react';
import axios from '../../axios';

const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />;

export default function Index({onClose, initialData, onSuccess}) {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const userID = useSelector(({user}) => user.id);
    
    const PROFILE_LINKS = [
        [wwwLogo, 'www.', 'website'],
        [Instagram, 'instagram.com/', 'instagram'],
        [LinkedIn, 'linkedin.com/', 'linkedin'],
        [Twitter, 'twitter.com/', 'twitter'],
        [Facebook, 'facebook.com/', 'facebook'],
        [behance, 'behance.net/', 'behance'],
        [dribbble, 'dribbble.com/', 'dribbble'],
        [pintrest, 'pintrest.com/', 'pintrest'],
        [github, 'github.com/', 'github'],
    ];
    const saveMediaDetails = () => {
        const submittedLinks = Object.values(state).filter( o => o)
        setLoading(true);
        axios.patch(`/speakers/${userID}/links`,{
            links: JSON.stringify(submittedLinks)
        }).then(() =>{
            message.success("Profile sucesfully updated");
            onSuccess();
            onClose();
        }).catch((err) => {
            message.error("There was an error updating user!", err.response.data.message);
            onClose();
        }).finally(() => {
            setLoading(false)
        })
    }
    const changeFormState = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }
    
    const getLink = (allLinks, linkType) => {
        try{
            return allLinks.find(oneLink => oneLink.includes(linkType)) || ""
        }catch(err){
            console.log(err)
            return ""
        }
    }

    useEffect(()=>{
        const links = jsonParse(initialData.links).filter(l => l);
        if(links.length){
            const initialState = {
                website: getLink(links, 'www'),
                instagram: getLink(links, 'instagram'),
                linkedin: getLink(links, 'linkedin'),
                twitter: getLink(links, 'twitter'),
                behance: getLink(links, 'behance'),
                facebook: getLink(links, 'facebook'),
                dribbble: getLink(links, 'dribbble'),
                pintrest: getLink(links, 'pintrest'),
                github: getLink(links, 'github')
            }
            setState(initialState);
        }
        
    }, [initialData])
    return (
        <div className="updates">
            <div className="updates__form__header">
                Profile Links
            </div>

            <div className="updates__form__links">
                {
                    PROFILE_LINKS.map((profileLink, index) => (
                        <div className="updates__form__links__wrapper">
                            <div className="imgwrapper">
                                <img src={profileLink[0]} alt=""/>
                            </div>
                            <input
                                type="text"
                                placeholder={profileLink[1]}
                                onChange={(e) => {
										const textContent = e.target.value;
                                        const newState = {...state}
										if(textContent.length === 1 && !newState[profileLink[2]]){
											newState[profileLink[2]] = `${profileLink[1]}${textContent}`;
											setState(newState)
											return;

										}else if(textContent === profileLink[1]){
											newState[profileLink[2]] = '';
											setState(newState)
											return;
										}

										newState[profileLink[2]] = textContent;
                                        setState(newState)
									}}
                                value={state[profileLink[2]]}
                            />
                        </div>
                    ))
                }

            </div>

            <div className="updates__action">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    Cancel
                </div>

                <div
                    className="save"
                    onClick={saveMediaDetails}
                >
                {
                    loading? <Spin indicator={antIcon} />
                    : "Save"
                }
                </div>
            </div>

        </div>
    )
}
