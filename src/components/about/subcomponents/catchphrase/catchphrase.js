import React from 'react';
import './catchphrase.scss';

import Speaker from '../../assets/speaker.svg'

export default function Catchphrase() {
    return (
        <div class="catchphrase">

            <div className="catchphrase__textcontent">
                <div className="catchphrase__textcontent__header">
                    Who pays the BIL?
                </div>
                <div className="catchphrase__textcontent__subheader">
                    An inspired world doesn’t come cheap. The BIL must be paid. These are the values that drive our core essence.
                </div>
            </div>

            <div className="catchphrase__phraseswrapper">

                <div className="catchphrase__phraseswrapper__box --first">
                    <div className="catchphrase__phraseswrapper__box__text">
                        <div className="--phrase__heading">
                            Boldness
                        </div>
                        <div className="--phrase__subheading">
                            It takes boldness to speak and inspire people to make bold changes and strive to be better.
                        </div>
                    </div>
                    <img
                        src={Speaker}
                        alt="speaker"
                        className="catchphrase__phraseswrapper__box__image"
                    />
                </div>

                <div className="catchphrase__phraseswrapper__box --second">
                    <div className="catchphrase__phraseswrapper__box__text">
                        <div className="--phrase__heading">
                            Intent
                        </div>
                        <div className="--phrase__subheading">
                            It is our unwavering belief that life holds more meaning and purpose than is apparent. But to reach them we must live intentionally – striving for purpose, meaning, and more.
                        </div>
                    </div>
                    <img
                        src={Speaker}
                        alt="speaker"
                        className="catchphrase__phraseswrapper__box__image"
                    />
                </div>

                <div className="catchphrase__phraseswrapper__box --third">
                    <div className="catchphrase__phraseswrapper__box__text">
                        <div className="--phrase__heading">
                            Love
                        </div>
                        <div className="--phrase__subheading">
                            Boldness and intent aren’t enough; Love is still needed in achieving our goal. We show love in all our dealings and interactions with our audience.
                        </div>
                    </div>
                    <img
                        src={Speaker}
                        alt="speaker"
                        className="catchphrase__phraseswrapper__box__image"
                    />
                </div>



            </div>
        </div>
    )
}
