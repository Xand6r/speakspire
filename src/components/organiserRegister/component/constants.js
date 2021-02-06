//  teh overall number of steps involved in the process of the registration
export const STEPS = ['Company details', 'About & Media'];

// the default state for the company details state
export const INITIAL_COMPANY_DETAILS_STATE = {
	companyName: '',
	companyEmail: '',
	phoneNumber: '',
	address: '',
	city: '',
	country: '',
	password: '',
};

export const INITIAL_MEDIA_STATE = {
	speciality: '',
	services: [],
	bio: '',
	clients: [],
	partners: [],
	profilePhoto: { src: undefined },
	coverPhoto: { src: undefined },
	links: [],
};

//  the different options for the speaker specialty
export const SPEAKER_SPECIALITY = [
	{ value: 'Corporate Events', label: 'Corporate Events' },
	{ value: 'Wedding/Parties', label: 'Wedding/Parties' },
	{ value: 'Shows/Concerts', label: 'Shows/Concerts' },
];

export const ORGANISER_PERSONAL_DETAILS_KEY = 'ORGANISER_PERSONAL_DETAILS';
export const ORGANISER_MEDIA_KEY = 'ORGANISER_MEDIA_KEY';
