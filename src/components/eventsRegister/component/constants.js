//  teh overall number of steps involved in the process of the registration
export const STEPS = [
    'Event Info', 'Schedule',
    'Call for Speakers', 'Media'
];

export const EVENT_TYPE = [
    { value: 'conference', label: 'Conference' },
    { value: 'party', label: 'Party' },
]
// export teh different categories existing for a speaker
export const SPEAKER_CATEGORY = [
    { value: 'classic', label: 'Classic Speaker' },
    { value: 'standard', label: 'Standard Speaker' },
    { value: 'premium', label: 'Premium Speaker' },

]
// the default state for the company details state
export const EVENT_INFO_STATE = {
    eventName:'',
    eventOrganizer:'',
    eventDescription:'',
    services:[],
    eventType:'',
    topicArea:'',
    Language:''
}


export const SCHEDULE_STATE = {
    location:'',
    physicalLink:'',
    onlineLink:[''],

    frequency:'',
    dateFrom: [],
    dateTo: [],
    timeTo: [],
    timeFrom: [],

    interval: '',
    interval_day_of_week: 'Mon'
}

export const SPEAKER_CALL = [
    {
        speakerCategory: '',
        topicArea: '',
        country: '',
        budgetFrom: '',
        budgetTo: '',
        eventDescription: '',
    }
]

export const INITIAL_MEDIA_STATE = {
    profile_photo:{src:undefined},
    cover_photo:{src:undefined},
    media:[]
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


export const EVENT_LOCATION = [
    { value: 'Physical', label: 'Physical' },
    { value: 'Virtual', label: 'Virtual' },
    { value: 'Physical and Virtual', label: 'Physical and Virtual' },
]

export const EVENT_FREQUENCY = [
    { value: 'Single-day Event', label: 'Single-day Event' },
    { value: 'Multi-day Event', label: 'Multi-day Event' },
    { value: 'Recurring Event', label: 'Recurring Event' },
]

export const EVENT_INTERVAL = [
    { value: 'Weekly', label: 'Weekly' },
    // { value: 'Monthly', label: 'Monthly' },
]

export const COUNTRY_LIST = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"].map(a=>({value:a, label:a}))