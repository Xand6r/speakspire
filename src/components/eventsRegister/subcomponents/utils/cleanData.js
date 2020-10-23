import { cleanDate, cleanSpeakers, cleanMedia } from './cleanParams';

export default (data) => {
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
		name: eventName,
		organizer: eventOrganizer,
		description: eventDescription,
		tags: JSON.stringify(services),
		type: eventType.value,
		topic_area: topicArea.value,
		language: Language.value,
		banner: cover_photo.src,

		schedule: {
			frequency: frequency.value,
			date: cleanDate(dateFrom, dateTo),
			time: cleanDate(timeFrom, timeTo),
			physicalLink: JSON.stringify(physicalLink),
			onlineLink: JSON.stringify(onlineLink),
			intervals: interval.value,
			interval_day_of_week,
		},
		speakers: cleanSpeakers(speakers),
		media: cleanMedia(media),
	});
};
