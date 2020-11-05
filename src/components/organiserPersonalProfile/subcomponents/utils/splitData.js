export default (params) => {
	const data = params ? params.split(',') : [];
	let array = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i]
			.replace(/['"]+/g, ' ')
			.replace(/['/[]+/g, '')
			.replace(/['/\]]+/g, '');

		array.push(element);
	}
	return array;
};
