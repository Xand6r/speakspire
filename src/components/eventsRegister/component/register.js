import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Switch,
    Link,
    Route // for later
} from 'react-router-dom';

import {
    STEPS, EVENT_INFO_STATE,
    SCHEDULE_STATE, SPEAKER_CALL,
    INITIAL_MEDIA_STATE
} from './constants';

import {component as NavBar} from '../../../utilities/navbar';
import {component as SectionTab} from '../../speakerRegister/subcomponents/sectionTab';
import {component as EventCard} from '../../../utilities/eventCard';
import {component as PersonalDetail} from '../subcomponents/eventInfo';
import {component as Schedule} from '../subcomponents/schedule';
import {component as Speakercall} from '../subcomponents/speakercall';
import {component as Media} from '../subcomponents/media';


import './register.scss';
import defaultImage from '../assets/greycircle.svg'


export default function Register({
    location
}) {
    const [activeTab, setactiveTab] = useState(0);
    const [previewHidden, setPreviewHidden ] = useState(false);

    const [eventInfo, setEventInfo] = useState(EVENT_INFO_STATE);
    const [schedule, setSchedule] = useState(SCHEDULE_STATE);
    const [speakerCall, setSpeakerCall] = useState(SPEAKER_CALL);
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
    }

    return (
        <div className="registerevent">
            {/* the navigation bar component */}
            <NavBar />
            {/* the navigation bar component */}

            {/* the section for tapping which form to fill  */}
            <div className="registerevent__activetab">
                <div className="registerevent__activetab__steps">
                    {
                        STEPS.map((step, index)=>(
                            <Link key={Math.random()} className="link" to={`/registerevent/${index+1}`}>
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
            </div>
            {/* the section for tapping which form to fill  */}

            {/* the section actually showing the mail content */}
            <div className="registerevent__content">
                <div>
                    <div 
                        className={`registerevent__content__preview ${(previewHidden)?"--small":"--large"}`}
                    >
                        <div className="registerevent__content__preview__header">

                        </div>
                        {
                            (!previewHidden)?
                                <div className="registerevent__content__preview__card">
                                
                                    <EventCard
                                        eventName={eventInfo.eventName}
                                        skillsList={eventInfo.services}
                                        eventTitle={eventInfo.eventOrganizer}
                                        profileimage={media.cover_photo.src}
                                        pcs={schedule.location}
                                        dateInterval={schedule.dateFrom[0] && `${schedule.dateFrom[0]?.format('Do MMM YY')||''} - ${schedule.dateTo[0]?.format('Do MMM YY')||''}`}
                                    />

                                </div>
                                :""
                        }
                    </div>
                </div>
                <div className="registerevent__content__form">
                    <Switch>
                        <Route
                            path = "/registerevent/(1)?"
                            exact
                            render={(props) => (
                                <PersonalDetail {...props} 
                                    stateChanger = {setEventInfo}
                                    state = {eventInfo}
                                />
                            )}
                        />

                        <Route
                            path = "/registerevent/2"
                            exact
                            render={(props) => (
                                <Schedule {...props}
                                    stateChanger = {setSchedule}
                                    state = {schedule} 
                                />
                            )}
                        />

                        <Route
                            path = "/registerevent/3"
                            exact
                            render={(props) => (
                                <Speakercall {...props}
                                    stateChanger = {setSpeakerCall}
                                    state = {speakerCall} 
                                />
                            )}
                        />

                        <Route
                            path = "/registerevent/4"
                            exact
                            render={(props) => (
                                <Media {...props}
                                    stateChanger = {setMedia}
                                    state = {media} 
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