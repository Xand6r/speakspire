import axios from '../axios';

export default async (image) => {
	const formData = await new FormData();
	formData.append('file', image);
	let link;
	try {
		const response = await axios.post('/upload', formData);
		link = response.data.data;
	} catch (err) {
		console.log(err);
		link = '';
	}

	return link;
};
