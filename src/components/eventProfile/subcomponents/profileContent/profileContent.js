import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import moment from 'moment';

import { aboutEvent } from './constants';

import profileSample from '../../assets/instagram.svg';
import instagram from '../../assets/instagram.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import facebook from '../../assets/facebook.svg';
import web from '../../assets/web.svg';

import { component as EventCard } from '../../../../utilities/eventCard';
import {useSelector} from 'react-redux';
import { component as SkillTab } from '../../../../utilities/skillTab';

import './profileContent.scss';
import bluePencilIcon from '../../assets/pencil.svg';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

const EditIcon = () => (
	<div className='editicon'>
		<img src={bluePencilIcon} alt='' />
	</div>
);

const More = () => <div className='more'>More...</div>;

const splitData = (data) => {
	return data ? JSON.parse(data.split(',')) : [];
};

const filterData = (array, params) => {
	return array.filter((data) => data.category === params);
};

let parseNewDateFormat = (dateString) => {
    // datestring is of the form dd-mm-yy
    const splitDate = dateString.split('-');
    return moment(`20${splitDate[2]}, ${splitDate[1]}, ${splitDate[0]}`).format("Do MMM Y");
}

function parseTime(time) {    
    let timeInt = time.split(':')[0];
    let minutes = time.split(':')[1];

    // you could then add or subtract time here as needed

    if(time > '12:00') {
         return `${timeInt - 12}:${minutes} PM`;
    } else {
         return `${timeInt}:${minutes} AM`;
    }
}
export default function ProfileContent({ about, primaryTopic, primarySkills, secondaryTopic, secondarySkills, bio, userData }) {
	const { description, tags, topic_area, type, schedule, media } = userData;
	const eventState = useSelector(({events} )=> events);
	return (
		<div class='event_profilecontent_wrapper'>
			<div class='event_profilecontent'>
				<div className='event_profilecontent__left'>
					<div className='event_profilecontent__left__reason'>
						<div className='--top_heading'>
							<span>About This Event</span>
						</div>
						<div className='--bottom_content'>{description}</div>
					</div>
				</div>
				<div className='event_profilecontent__right'>
					<div className='event_profilecontent__right__bio'>
						<div className='--top_heading'>
							<span>Event Details</span>
						</div>
						<div className='--bottom_content'>
							<div className='--details_content'>
								<span> {type} </span>
								<span> {schedule ? schedule[0].frequency : null} </span>
							</div>

							<div className='--details_details'>
								<div className='--details_details__item'>
									<span> Topic Area </span>
									<div className='topicarea'>{topic_area}</div>
								</div>
								<div className='--details_details__item'>
									<span> Event Tags </span>
									<div className='eventtags'>
										{splitData(tags).map((tag) => (
											<div className='eventtag'>{tag}</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='event_profilecontent__right__media --tabs'>
						<Tabs defaultActiveKey='1' tabBarExtraContent={<EditIcon />}>
							{/* the tab to upload images */}
							<TabPane tab='Photos' key='1'>
								{media
									? filterData(media, 'photo').map(({ link }, index) => (
											<div className='image_tab_content' key={index}>
												<img src={link} alt='' />
											</div>
									  ))
									: null}
								<div className='moreimages'>
									<More />
								</div>
							</TabPane>
							{/* the tab to upload images */}

							<TabPane tab='Videos' key='2'>
								{media
									? filterData(media, 'video').map(({ link }, index) => (
											<div className='image_tab_content' key={index}>
												<video src={link} alt='' />
											</div>
									  ))
									: null}
								<div className='moreimages'>
									<More />
								</div>
							</TabPane>

							<TabPane tab='Presentation' key='3'>
								{media
									? filterData(media, 'presentation').map(({ link }, index) => (
											<div className='image_tab_content' key={index}>
												<img src={link} alt='' />
											</div>
									  ))
									: null}
								<div className='moreimages'>
									<More />
								</div>
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
			<div className='event_profilecontent__bottom'>
				<div className='--bottomtitle'>More Events from this Organizer</div>
				<div className='--bottom__events'>
				{
                        eventState.data.slice(0,3).map(event => {
                            let tags=[];
                            try{
                                tags=JSON.parse(event.tags)
                            }catch(err){
                                tags=[]
                            }
                            const fs="Do-MMM-YYY"
                            const dateFrom = parseNewDateFormat(event.schedule[0].date.slice(0,8))
                            const dateTo = parseNewDateFormat(event.schedule[0].date.slice(9))
                            const timeFrom = parseTime(event.schedule[0].time.split('-')[0])
                            const timeTo = parseTime(event.schedule[0].time.split('-')[1])
                            let dateInterval = ""
                            if(event.schedule[0].frequency === "Single Event"){
                                dateInterval = `${dateFrom} ${timeFrom} WAT`
                            }else{
                                dateInterval = `${dateFrom} - ${dateTo} ${timeFrom} WAT`
                            }
                            return (
                                <EventCard
                                    id={event.id}
                                    eventName={event.name}
                                    eventTitle={event.organizer}
                                    profileimage={event.banner}
                                    skillsList={tags}
                                    pcs={"pcs"}
                                    dateInterval = {dateInterval}
                                />
                            )
                        })
                    }
				</div>
			</div>
			<div />
		</div>
	);
}

ProfileContent.propTypes = {
	about: PropTypes.string,
	primaryTopic: PropTypes.string,
	bio: PropTypes.string,
};

ProfileContent.defaultProps = {
	about: aboutEvent,
	primaryTopic: 'Career Development',
	primarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory'],
	secondaryTopic: 'Technology',
	secondarySkills: ['Business', 'Startup Advisory', 'Growth and Customer Service', 'Startup Advisory', 'Growth and Customer Service'],
	bio:
		"Don't worry, this is not also a senseless post. We estimate that 9 in 10 who read this post to the end will see meaning and value in it. Of that 9 about 5 will hit the like button; 3 will visit our profile; and 1 or less will hit the share or save button. This is a raw data set at best. The question is what do you do with this data. No! Wrong! The question is how do you make sense of this data",
};
