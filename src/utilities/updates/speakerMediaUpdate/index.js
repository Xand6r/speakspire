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

import {message} from 'antd';

import {initialState} from './constants';
import './speakermediaupdate.scss';
import { useEffect } from 'react';
export default function Index({onClose, initialData}) {
    const [state, setState] = useState(initialState);
    
    const PROFILE_LINKS = [
        [wwwLogo, 'www.', 'website'],
        [Instagram, 'instagram.com/', 'instagram'],
        [LinkedIn, 'linkedin.com/', 'linkedin'],
        [Twitter, 'twitter.com/', 'twitter'],
        [Facebook, 'facebook.com/', 'facebook'],
        [behance, 'behance.net/', 'benhance'],
        [dribbble, 'dribbble.com/', 'dribble'],
        [pintrest, 'pintrest.com/', 'pintrest'],
        [github, 'github.com/', 'github'],
    ];
    const saveMediaDetails = () => {
        const submittedLinks = Object.values(state).filter( o => o)
        console.log(submittedLinks);
        // logic for saving media details
        message.success("Profile sucesfully updated");
        onClose();
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
                benhance: getLink(links, 'benhance'),
                facebook: getLink(links, 'facebook'),
                dribble: getLink(links, 'dribble'),
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
                    Save
                </div>
            </div>

        </div>
    )
}
