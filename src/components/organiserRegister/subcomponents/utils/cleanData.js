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
		name: companyName ? companyName : '',
		email: companyEmail ? companyEmail : '',
		address: address ? address : '',
		phone: phoneNumber ? phoneNumber : '',
		state: city ? city : '',
		country: country ? country : '',
		password: password ? password : '',
		specialty: speciality.value ? speciality.value : '',
		services: JSON.stringify(services),
		bio: bio ? bio : '',
		clients: JSON.stringify(clients),
		partners: JSON.stringify(partners),
		links: JSON.stringify(links),
		profile_photo: profilePhoto.src ? profilePhoto.src : 'https://res.cloudinary.com/xand6r/image/upload/v1604961781/speakspire/speakspire_user_ojnefq.svg',
		cover_photo: coverPhoto.src ? coverPhoto.src : 'https://res.cloudinary.com/xand6r/image/upload/v1604961724/speakspire/Cover_Photo_-_Speakspire_pc3buw.png',
	});
};
