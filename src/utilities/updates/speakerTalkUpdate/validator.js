const cleanData = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			name: params[i].eventName,
			topic: params[i].talkTopic,
			location: params[i].location,
			year: params[i].talkYear,
		});
	}
	return data;
};

export { cleanData };
