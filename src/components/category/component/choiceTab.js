import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './choiceTab.scss';

import AccountTypeCard from '../subcomponents/accountCard';

import close from '../../../assets/close.svg';
import speaker from '../assets/bluemic_bluebg.svg';
import organiser from '../assets/individualicon.svg';
import individual from '../assets/greenuser_greenbg.svg';

// import bmbb from '../assets/bluemic_bluebg.svg';
// import gmgb from '../assets/greenuser_greenbg.svg';

const TABS = [
    [speaker, 'Speaker','Create a speaker profile and join a vibrant community of speakers. Get hired to speak at events.', '--blue'],
    [organiser, 'Organiser','Create a company profile, showcase your events, receive requests from speakers, and hire your preferred speakers.','--red'],
    [individual, 'Individual','Create a personal profile, find and hire the best speakers and organizers for your events. Keep track of your activities.', '--green'],
]

export default function ChoiceTab() {
    const [activeTab, setActiveTab] = useState(null);
    return (
        <div className="choicetab">

            <div className="choicetab__header">
                What kind of account would you like to create?
            </div>

            <img 
                className="choicetab__close" 
                src={close}
                alt="close button"
            />

            <div className="choicetab__tabs">
                {
                    TABS.map((tab,i)=>(
                        <AccountTypeCard
                            key={i}
                            index={i}
                            icon = {tab[0]}
                            title = {tab[1]}
                            content = {tab[2]}
                            extraclass = {tab[3]}
                            stateChanger = {setActiveTab}
                            active = {activeTab === i}
                        />
                    ))
                }
            </div>

            <div className="choicetab__footer">
                <Link 
                    className="link"
                    to={(activeTab === null)?"/category":"/register"}
                >
                    <div className="button">Continue</div>
                </Link>
                <div className="--subtext">
                    Already a member?
                    <Link className="link" to="/login">
                        <span> Sign in</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
