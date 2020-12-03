const cleanData = (params) => {
	let data = [];
	for (let i = 0; i < params.length; i++) {
		data.push({
			type: params[i].publicationType,
			title: params[i].publicationTitle,
			link: params[i].publicationLink,
			year: params[i].publicationYear,
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
