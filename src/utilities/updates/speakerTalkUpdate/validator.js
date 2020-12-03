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

const validateData = (state) => {
	return state.every(detail=>{
        return Object.values(detail).every(o=>o)
    })
}

export { cleanData, validateData };
