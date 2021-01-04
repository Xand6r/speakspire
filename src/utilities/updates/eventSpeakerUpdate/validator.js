export const validateData = (state) => {
	return true;
};

export const cleanParams = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			category: params[i].speakerCategory,
			topic_area: params[i].topicArea,
			country: params[i].country,
			budget: `${params[i].budgetFrom} - ${params[i].budgetTo}`,
			description: params[i].eventDescription,
		});
	}
	return data;
};
