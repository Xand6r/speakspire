import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Switch,
    Link,
    Route // for later
} from 'react-router-dom';

import {
    STEPS, INITIAL_PERSONAL_DETAILS_STATE,
    INITIAL_EXPERTISE_STATE,
    INITIAL_EXPERIENCE_STATE,
    INITIAL_PREFERENCE_STATE,
    INITIAL_MEDIA_STATE
} from './constants';

import {component as NavBar} from '../../../utilities/navbar';
import {component as SectionTab} from '../subcomponents/sectionTab';
import {component as SpeakerCard} from '../../../utilities/speakerCard';
import {component as PersonalDetail} from '../subcomponents/personalDetails';
import {component as Expertise} from '../subcomponents/expertise';
import {component as Experience} from '../subcomponents/experience';
import {component as Preference} from '../subcomponents/preference';
import {component as Media} from '../subcomponents/media';

import './register.scss';
import defaultImage from '../assets/greycircle.svg'


export default function Register({
    location
}) {
    const [activeTab, setactiveTab] = useState(0);
    const [previewHidden, setPreviewHidden ] = useState(false);
    const [personalDetails, setPersonalDetails] = useState(INITIAL_PERSONAL_DETAILS_STATE);
    const [expertise, setExpertise] = useState(INITIAL_EXPERTISE_STATE);
    const [experience, setExperience] = useState(INITIAL_EXPERIENCE_STATE);
    const [preference, setPreference] = useState(INITIAL_PREFERENCE_STATE);
    const [media, setMedia] = useState(INITIAL_MEDIA_STATE);
    
    
    useEffect(()=>{
        const {pathname} = location;
        const currentTab = pathname.split("/")[2]
        if(!currentTab){
            setactiveTab(0)
            return
        }
        setactiveTab(Number(currentTab)-1)
    },[setactiveTab, location])

    const makeActive = (clickedIndex) => {
        setactiveTab(clickedIndex)
    };

    // function to submit the the state variables
    const onSubmit = () =>{
        const finalState = {
            ...personalDetails, 
            ...expertise, 
            ...experience,
            ...preference,
            ...media
        }
        alert('here');
        console.log('finalState');
        console.log(finalState);
    }

    return (
        <div className="register">
            {/* the navigation bar component */}
            <NavBar />
            {/* the navigation bar component */}

            {/* the section for tapping which form to fill  */}
            <div className="register__activetab">
                {
                    STEPS.map((step, index)=>(
                        <Link key={Math.random()} className="link" to={`/register/${index+1}`}>
                            <SectionTab   
                                index={index}
                                text={step}
                                active={index === activeTab }
                                changeTab={makeActive}
                            />
                        </Link>
                    ))
                }
            </div>
            {/* the section for tapping which form to fill  */}

            {/* the section actually showing the mail content */}
            <div className="register__content">
                <div>
                    <div 
                        className={`register__content__preview ${(previewHidden)?"--small":"--large"}`}
                    >
                        <div className="register__content__preview__header">
                            <span>Preview</span>
                            <i
                                onClick={()=>{setPreviewHidden(!previewHidden)}}
                                className={(previewHidden)?"fa fa-eye":"fa fa-eye-slash"}
                            >
                            </i>
                        </div>
                        {
                            (!previewHidden)?
                                <div className="register__content__preview__card">

                                    <SpeakerCard
                                        fullname={personalDetails.fullname}
                                        company={experience.positions[0].company}
                                        position={experience.positions[0].position}
                                        skills={
                                            expertise.primary_topic_tags
                                            .filter(tag=>!INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag))
                                            .length > 0? expertise.primary_topic_tags
                                            .filter(tag=>!INITIAL_EXPERTISE_STATE.primary_topic_tags.includes(tag)):undefined
                                        }
                                        image={media.profile_photo.src || undefined}
                                        primary={expertise.primary_specialty.value}
                                        secondary={expertise.secondary_specialty.value}
                                    />
                                </div>
                                :""
                        }
                        <div className="register__content__preview__footer">
                            Your detials are being automatically 
                            saved. You can skip a question and 
                            come back to it later.
                        </div>
                    </div>
                </div>
                <div className="register__content__form">
                    <Switch>
                        <Route
                            path = "/register/(1)?"
                            exact
                            render={(props) => (
                                <PersonalDetail {...props} 
                                    stateChanger = {setPersonalDetails}
                                    state = {personalDetails}
                                />
                            )}
                        />
                        <Route
                            path = "/register/2"
                            exact
                            render={(props) => (
                                <Expertise {...props}
                                    stateChanger = {setExpertise}
                                    state = {expertise}
                                />
                            )}
                        />
                        <Route
                            path = "/register/3"
                            exact
                            render={(props) => (
                                <Experience {...props}
                                    stateChanger = {setExperience}
                                    state = {experience} 
                                />
                            )}
                        />
                        <Route
                            path = "/register/4"
                            exact
                            render={(props) => (
                                <Preference {...props}
                                    stateChanger = {setPreference}
                                    state = {preference} 
                                />
                            )}
                        />
                        <Route
                            path = "/register/5"
                            exact
                            render={(props) => (
                                <Media {...props}
                                    stateChanger = {setMedia}
                                    state = {media}
                                    haldleSubmit = {onSubmit}
                                />
                            )}
                        />
                        
                    </Switch>
                </div>
            </div>

        </div>
    )
}

Register.propTypes = {
    location: PropTypes.instanceOf(Object).isRequired
}