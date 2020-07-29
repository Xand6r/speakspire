import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Switch,
    Link,
    Route // for later
  } from 'react-router-dom'

import {component as NavBar} from '../../../utilities/navbar';
import {component as SectionTab} from '../subcomponents/sectionTab';
import {component as SpeakerCard} from '../../../utilities/speakerCard';
import {component as PersonalDetail} from '../subcomponents/personalDetails';
import {component as Expertise} from '../subcomponents/expertise';

import './register.scss';


const STEPS = [
    'Personal Details', 'Expertise',
    'Speaking Preferences', 'Media'
]
const INITIAL_STATE = {
    fullname:'',
    gender:'',
    birthdate:'',
    phonenumber:'',
    location:'',
    email:'',
    password:''
}

export default function Register({
    location
}) {
    const [activeTab, setactiveTab] = useState(0);
    const [previewHidden, setPreviewHidden ] = useState(false);
    const [personalDetails, setPersonalDetails] = useState(INITIAL_STATE);

    useEffect(()=>{
        const {pathname} = location;
        const currentTab = pathname.split("/")[2]
        setactiveTab(Number(currentTab)-1)
    },[setactiveTab, location])

    const makeActive = (clickedIndex) => {
        setactiveTab(clickedIndex)
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
                                <Expertise
                                />
                            )}
                        />
                    </Switch>
                    {/* <PersonalDetail
                        onNameChange = {setFullName}
                        nameValue = {fullname}
                    /> */}
                </div>
            </div>

        </div>
    )
}

Register.propTypes = {
    location: PropTypes.instanceOf(Object).isRequired
}