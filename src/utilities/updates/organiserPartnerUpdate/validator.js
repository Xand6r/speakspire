const validateData = (data) => {
	let valid = false;
	const primary_specialty = data.primarySpecialty;
	const primary_topic = data.primaryTopicArea;
	const primary_tags = data.primary_topic_tags;
	if (primary_specialty.trim() === '' || primary_topic.trim() === '' || primary_tags.length < 1) {
		valid = false;
	} else {
		valid = true;
	}

	return valid;
};

const cleanData = (data) => {
	const primary_specialty = data.primarySpecialty;
	const secondary_specialty = data.secondarySpecialty;
	const primary_topic = data.primaryTopicArea;
	const secondary_topic = data.secondaryTopicArea;
	const primary_tags = JSON.stringify(data.primary_topic_tags);
	const secondary_tags = JSON.stringify(data.secondary_topic_tags);

	return Object.freeze({
		primary_specialty,
		secondary_specialty,
		primary_topic,
		secondary_topic,
		primary_tags,
		secondary_tags,
	});
};

export { cleanData, validateData };
