import { cleanCertification, cleanEducation, cleanExperience, cleanExpertise, cleanPreferences } from './cleanParams';

export default (data) => {
	console.log(data);
	const {
		fullbio,
		fullname,
		email,
		gender,
		birthdate,
		city,
		phonenumber,
		country,
		experience_years,
		engagement_no,
		highest_education,
		languages,
		unique_selling_proposition,
		links,
		profile_photo,
		cover_photo,
		password,
		education,
		primary_specialty,
		secondary_specialty,
		primary_topic_area,
		secondary_topic_area,
		primary_topic_tags,
		secondary_topic_tags,
		certifications,
		availability,
		mode_of_delivery,
		open_for_travel,
		travel_places,
		positions,
		media,
	} = data;
	return Object.freeze({
		name: fullname ? fullname : '',
		email: email ? email : '',
		sex: gender ? gender : '',
		birthday: birthdate ? birthdate[1] : '',
		phone: phonenumber ? phonenumber : '',
		state: city ? city : '',
		country: country ? country : '',
		years_of_experience: experience_years.value ? experience_years.value : '',
		number_of_engagements: engagement_no.value ? engagement_no.value : '',
		highest_level_of_education: highest_education.value ? highest_education.value : '',
		languages: JSON.stringify(languages),
		usp: unique_selling_proposition ? unique_selling_proposition : '',
		bio: fullbio ? fullbio : '',
		links: JSON.stringify(links),
		profile_photo: profile_photo.src ? profile_photo.src : '',
		cover_photo: cover_photo.src ? cover_photo.src : '',
		password: password ? password : '',
		education: cleanEducation(education),
		expertise: cleanExpertise({
			primary_specialty,
			primary_topic_tags,
			primary_topic_area,
			secondary_specialty,
			secondary_topic_tags,
			secondary_topic_area,
		}),
		certification: cleanCertification(certifications),
		preferences: cleanPreferences({ availability, mode_of_delivery, open_for_travel, travel_places }),
		experience: cleanExperience(positions),
		media,
	});
};
