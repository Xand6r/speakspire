export const cleanCertification = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			institution: params[i].institution_name,
			name: params[i].certification_name,
			from: params[i].from,
			to: params[i].to,
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
			from: params[i].from,
			to: params[i].to,
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
			from: params[i].from,
			to: params[i].to,
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
		primary_specialty: !!primary_specialty ? primary_specialty.value : '',
		secondary_specialty: !!secondary_specialty ? secondary_specialty.value : '',
		primary_tags: JSON.stringify(primary_topic_tags),
		secondary_tags: JSON.stringify(secondary_topic_tags),
		primary_topic: !!primary_topic_area ? primary_topic_area.value : '',
		secondary_topic: !!secondary_topic_area ? secondary_topic_area.value : '',
	});
};

export const cleanPreferences = ({availability, mode_of_delivery, open_for_travel, travel_places}) => {
	return Object.freeze({
		availability: !!availability ? availability.value : '',
		delivery_mode: !!mode_of_delivery ? mode_of_delivery.value : '',
		open_to_travel: !!open_for_travel ? open_for_travel.value : '',
		travel: JSON.stringify(travel_places),
	});
};
