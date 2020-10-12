//  teh overall number of steps involved in the process of the registration
export const STEPS = [
    'Personal Details', 'Expertise', 'Experience',
    'Preferences', 'Media'
];


// the default state for the personal details state
export const INITIAL_PERSONAL_DETAILS_STATE = {
    fullname:'',
    gender:'Others',
    birthdate:[],
    phonenumber:'',
    address:'',
    city:'',
    country:'',
    email:'',
    password:''
}

// the default state for the expertise state
const INITIAL_EDUCATION_STATE = {
    institution:'',
    field_of_study:'',
    from:[],
    to:[],
}
const INITIAL_CERTIFICATIONS_STATE = {
    certification_name:'',
    institution_name:'',
    from:'',
    to:'',
    file:null,
    link:"",

}

export const INITIAL_EXPERTISE_STATE = {
    primary_specialty:'',
    secondary_specialty:'',
    primary_topic_area: '',
    primary_topic_tags:['Topic 1', 'Topic 2'],
    secondary_topic_area: '',
    secondary_topic_tags:['Topic 1', 'Topic 2'],
    topic_tags:['Topic 1', 'Topic 2'],
    education:[INITIAL_EDUCATION_STATE],
    certifications:[INITIAL_CERTIFICATIONS_STATE],

    highest_education:"",
    languages:[]
};

const INITIAL_POSITIONS_STATE = {
    position:'',
    company:'',
    from:[],
    to:[],
}
export const INITIAL_EXPERIENCE_STATE = {
    positions: [INITIAL_POSITIONS_STATE],
    experience_years: "",
    engagement_no: "",
    unique_selling_proposition: "",
    full_bio: ""
}
export const INITIAL_PREFERENCE_STATE = {
    availability: "",
    mode_of_delivery: "",
    open_for_travel: "",
    travel_places: ""
}
export const INITIAL_MEDIA_STATE = {
    profile_photo:{src:null},
    cover_photo:{src:null},
    links:[],
    media:[]
}