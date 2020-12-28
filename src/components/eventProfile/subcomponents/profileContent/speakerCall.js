import React, {useState} from 'react';

import userIcon from './assets/user.svg';
import topicIcon from './assets/topic.svg';
import locationIcon from './assets/icon.svg';
import priceIcon from './assets/price.svg';
import downArrow from './assets/downArrow.svg';
import upArrow from './assets/upArrow.svg';

import './speakerCall.scss';

export const MoreOrLess = ({more}) => (
    <div className="moreorless">
        <span>
            {
                more?
                "More":"Less"
            }
        </span>
        <img
            src={more? downArrow : upArrow}
            alt=""
        />
    </div>
);

const formatPrice = (priceString) =>{
    return Number(priceString.replace(' ','')).toLocaleString()
}

const getPrice = (price) => {
    try{
        const priceRange = price.split(" - ");
        const formattedPriceRange = `${formatPrice(priceRange[0])} NGN - ${formatPrice(priceRange[1])} NGN`
        return formattedPriceRange;
    }catch(err){
        return "100,000 NGN - 650,000 NGN"
    }
}

export default function SpeakerCall({oneSpeaker}) {
    const [more, setMore] = useState(true);
    const {id, category, topic_area:topicArea, country, budget, description}  = oneSpeaker;
    return (
        <div className={`profile_speakercall ${!more && '--showmore'}`}>
            <div
                onClick={() => setMore(!more)}
            >
                <MoreOrLess more={more}/>
            </div>

            <div className="profile_speakercall__details">

                <div className="profile_speakercall__details__detail">
                    <div className="--key">
                        <img src={userIcon} alt=""/>
                    </div>
                    <div className="--premium">
                        {category}
                    </div>
                </div>
                

                <div className="profile_speakercall__details__detail">
                    <div className="--key">
                        <img src={topicIcon} alt=""/>
                    </div>
                    <div className="--value"> {topicArea} </div>
                </div>


                <div className="profile_speakercall__details__detail">
                    <div className="--key">
                        <img src={locationIcon} alt=""/>
                    </div>
                    <div className="--value">{country}</div>
                </div>


                <div className="profile_speakercall__details__detail">
                    <div className="--key">
                        <img src={priceIcon} alt=""/>
                    </div>
                    <div className="--value">
                        {getPrice(budget)}
                    </div>
                </div>
            </div>

            <div className="profile_speakercall__bio">
                {description}
            </div>

            <div className="profile_speakercall__action">
                Send Request
            </div>
        </div>
    )
}
