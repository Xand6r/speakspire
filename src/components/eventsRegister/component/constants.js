//  teh overall number of steps involved in the process of the registration
export const STEPS = [
    'Event Info', 'Schedule',
    'Call for Speakers', 'Media'
];


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
        speakerDescription: '',
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
    { value: 'Venue & online', label: 'Venue & online' },
]

export const EVENT_FREQUENCY = [
    { value: 'Single Event', label: 'Single Event' },
    { value: 'Multi-day Event', label: 'Multi-day Event' },
    { value: 'Recurring Event', label: 'Recurring Event' },
]

export const EVENT_INTERVAL = [
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
]