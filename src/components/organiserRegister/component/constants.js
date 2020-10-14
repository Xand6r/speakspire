//  teh overall number of steps involved in the process of the registration
export const STEPS = [
    'Company details', 'About & Media'
];


// the default state for the company details state
export const INITIAL_COMPANY_DETAILS_STATE = {
    companyName:'',
    companyEmail:'',
    phoneNumber:'',
    address:'',
    city:'',
    country:'',
    password:''
}


export const INITIAL_MEDIA_STATE = {
    speciality:"",
    services:[],
    bio:"",
    clients:[],
    partners:[],
    profilePhoto:{src:undefined},
    coverPhoto:{src:undefined},
    links:[],
}

//  the different options for the speaker specialty
export const SPEAKER_SPECIALITY = [
    { value: 'Public Speaker', label: 'Public Speaker' },
    { value: 'Mentor', label: 'Mentor' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Event Compere', label: 'Event Compere' },
    { value: 'Show Host/Anchor ', label: 'Show Host/Anchor ' },
    { value: 'Red Carpet Host', label: 'Red Carpet Host' },
    { value: 'Voice-over Artiste', label: 'Voice-over Artiste' },
    { value: 'Narrator', label: 'Narrator' },
    { value: 'Commentator', label: 'Commentator' },
];