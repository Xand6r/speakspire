export default (data) => {
	const {
		address,
		bio,
		city,
		clients,
		companyEmail,
		companyName,
		country,
		coverPhoto,
		links,
		partners,
		password,
		phoneNumber,
		profilePhoto,
		speciality,
		services,
	} = data;

	return Object.freeze({
		name: companyName,
		email: companyEmail,
		address,
		phone: phoneNumber,
		state: city,
		country,
		password,
		specialty: speciality.value,
		services: JSON.stringify(services),
		bio,
		clients: JSON.stringify(clients),
		partners: JSON.stringify(partners),
		links: JSON.stringify(links),
		profile_photo: profilePhoto.src,
		cover_photo: coverPhoto.src,
	});
};
