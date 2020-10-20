export const INITIAL_STATE = {
    location: "",
    fee:"",
    topicArea: "",
    specialty: "",
    speakerCategory: ""
}

export const multi_options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Watermelon", value: "watermelon" },
    { label: "Pear", value: "pear" },
    { label: "Apple", value: "apple" },
    { label: "Tangerine", value: "tangerine" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Peach ", value: "peach" },
];

export const FILTER_TEXT = [
    {"placeholder":"Location", state:"location", options: multi_options},
    {"placeholder":"Fee", state:"fee", options: multi_options},
    {"placeholder":"Topic Area", state:"topicArea", options: multi_options},
    {"placeholder":"Specialty", state:"specialty", options: multi_options},
    {"placeholder":"Speaker Category ", state:"speakerCategory", options: multi_options},
];

export const CHECKBOX_OPTIONS = [
    { label: "Online Engagement", value: "Online Engagement" },
    { label: "Physical Engagement", value: "Physical Engagement" },
    { label: 'Weekdays', value: 'Weekdays' },
    { label: 'Weekends', value: 'Weekends' },
    { label: 'Open to travel', value: 'Open to travel' },
];