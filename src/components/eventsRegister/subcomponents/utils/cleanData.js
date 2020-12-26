import { cleanDate, cleanSpeakers, cleanMedia } from './cleanParams';

export default (data, organizerId) => {
	const {
		eventName,
		eventOrganizer,
		eventDescription,
		services,
		eventType,
		topicArea,
		Language,
		cover_photo,
		frequency,
		dateFrom,
		dateTo,
		speakers,
		physicalLink,
		onlineLink,
		timeTo,
		timeFrom,
		interval,
		interval_day_of_week,
		media,
	} = data;
	return Object.freeze({
		name: eventName ? eventName : '',
		organizer: eventOrganizer ? eventOrganizer : '',
		description: eventDescription ? eventDescription : '',
		tags: JSON.stringify(services),
		type: eventType.value ? eventType.value : '',
		topic_area: topicArea.value ? topicArea.value : '',
		language: Language ? JSON.stringify(Language) : JSON.stringify({}),
		banner: cover_photo.src ? cover_photo.src : '',
		organizer_id: organizerId,

		schedule: {
			frequency: frequency.value ? frequency.value : '',
			date: cleanDate(dateFrom, dateTo),
			time: cleanDate(timeFrom, timeTo),
			physicalLink: JSON.stringify(physicalLink),
			onlineLink: JSON.stringify(onlineLink),
			intervals: interval.value ? interval.value : '',
			interval_day_of_week:interval_day_of_week?interval_day_of_week:'',
		},
		speakers: cleanSpeakers(speakers),
		media: cleanMedia(media),
	});
};
