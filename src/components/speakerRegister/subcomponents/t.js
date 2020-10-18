export const cleanCertification = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			institution: params[i].institution_name,
			name: params[i].certification_name,
			from: params[i].from[1],
			to: params[i].to[1],
			proof: params[i].link,
		});
	}
	return data;
};

export const cleanEducation = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			institution: params[i].institution,
			field_of_study: params[i].field_of_study,
			from: params[i].from[1],
			to: params[i].to[1],
		});
	}
	return data;
};

export const cleanExperience = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			company: params[i].company,
			position: params[i].position,
			from: params[i].from[1],
			to: params[i].to[1],
		});
	}
	return data;
};

export const cleanExpertise = ({
	primary_specialty,
	primary_topic_tags,
	primary_topic_area,
	secondary_specialty,
	secondary_topic_tags,
	secondary_topic_area,
}) => {
	return Object.freeze({
		primary_specialty: primary_specialty.value,
		secondary_specialty: secondary_specialty.value,
		primary_tags: primary_topic_tags.join(),
		secondary_tags: secondary_topic_tags.join(),
		primary_topic: primary_topic_area.value,
		secondary_topic: secondary_topic_area.value,
	});
};

export const cleanPreferences = ({availabilty, mode_of_delivery, open_for_travel, travel_places}) => {
	return Object.freeze({
		availabilty: availabilty.value,
		delivery_mode: mode_of_delivery.value,
		open_to_travel: open_for_travel.value,
		travel: travel_places.join(),
	});
};
