import React, { useState } from 'react';
import {component as NavBar} from '../../../utilities/navbar';
import {component as SectionTab} from '../subcomponents/sectionTab';
import {component as SpeakerCard} from '../../../utilities/speakerCard';
import {component as PersonalDetail} from '../subcomponents/personalDetails'

import './register.scss';


const STEPS = [
    'Personal Details', 'Expertise',
    'Speaking Preferences', 'Media'
]
export default function Register() {
    const [activeTab, setactiveTab] = useState(0);
    const [previewHidden, setPreviewHidden ] = useState(false);
    const [fullname, setFullName] = useState('');

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
                        <SectionTab
                            key={Math.random()}
                            index={index}
                            text={step}
                            active={index === activeTab }
                            changeTab={makeActive}
                        />
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
                                    fullname={fullname}
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
                    <PersonalDetail
                        onNameChange = {setFullName}
                        nameValue = {fullname}
                    />
                </div>
            </div>

        </div>
    )
}
