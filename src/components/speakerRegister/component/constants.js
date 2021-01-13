import moment from 'moment';
//  teh overall number of steps involved in the process of the registration
export const STEPS = [
    'Personal Details', 'Expertise', 'Experience',
    'Preferences', 'Media'
];


// the default state for the personal details state
export const SPEAKER_PERSONAL_DETAILS_KEY = "SPEAKER_PERSONAL_DETAILS";
export const INITIAL_PERSONAL_DETAILS_STATE = {
    fullname:'',
    gender:'',
    birthdate:moment().subtract(18, 'years').format('DD-MM-YY'),
    phonenumber:'',
    city:'',
    country:'',
    email:'',
    password:''
}

// the default state for the expertise state
const INITIAL_EDUCATION_STATE = {
    institution:'',
    field_of_study:'',
    from:'',
    to:'',
}
const INITIAL_CERTIFICATIONS_STATE = {
    certification_name:'',
    institution_name:'',
    from:'',
    to:'',
    file:null,
    link:"",

}

export const SPEAKER_EXPERTISE_KEY = "SPEAKER_EXPERTISE";

export const INITIAL_EXPERTISE_STATE = {
    primary_specialty:'',
    secondary_specialty:'',
    primary_topic_area: '',
    primary_topic_tags:[],
    secondary_topic_area: '',
    secondary_topic_tags:[],
    education:[INITIAL_EDUCATION_STATE],
    certifications:[INITIAL_CERTIFICATIONS_STATE],

    highest_education:"",
    languages:[]
};

const INITIAL_POSITIONS_STATE = {
    position:'',
    company:'',
    from:'',
    to:'',
}

export const SPEAKER_EXPERIENCE_KEY = "SPEAKER_EXPERIENCE";

export const INITIAL_EXPERIENCE_STATE = {
    positions: [INITIAL_POSITIONS_STATE],
    experience_years: "",
    engagement_no: "",
    unique_selling_proposition: "",
    fullbio: ""
}

export const SPEAKER_PREFERENCE_KEY = "SPEAKER_PREFERENCE";
export const INITIAL_PREFERENCE_STATE = {
    availability: "",
    mode_of_delivery: "",
    open_for_travel: "",
    travel_places: [],
    volunteering: "",
    contactMail:"",
    contactWhatsapp: "",
    contactPhone:"",
    currency: "",
    budgetFrom: "",
    budgetTo: ""
}

export const SPEAKER_MEDIA_KEY = "SPEAKER_MEDIA";
export const INITIAL_MEDIA_STATE = {
    profile_photo:{src:null},
    cover_photo:{src:null},
    links:[],
    media:[]
}

export const ERROR_MESSAGES = {
    INCOMPLETE_PARAMETERS: "Please Fill in All fields in the form before submitting"
}

export const COUNTRY_LIST = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom",  "Unites States of America (U.S.A)","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"].map(a=>({value:a, label:a}))
