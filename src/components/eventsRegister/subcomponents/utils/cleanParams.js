export const cleanDate = (from, to) => {
	return `${from[1]}-${to[1]}`;
};

export const cleanSpeakers = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			category: params[i].speakerCategory.value,
			topic_area: params[i].topicArea.value,
			country: params[i].country.value,
			budget: `${params[i].budgetFrom} - ${params[i].budgetTo}`,
			description: params[i].eventDescription,
		});
	}
	return data;
};

export const cleanMedia = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			category: params[i].category,
			link: params[i].link,
		});
	}
	return data;
};
