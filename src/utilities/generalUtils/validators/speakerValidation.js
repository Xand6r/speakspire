export function validateForm(state){
    // a function to validate that every field in a form is properly filled before proceeding
    const keys = Object.keys(state);
    return keys.every(key=>state['key'])
}

export const validatePersonaDetails = (personalState) => {
    return Object.values(personalState).every(o => o!== '') && personalState?.birthdate?.length !==0
};

export const validateExpertiseState = (expertise) => {
    return(
        Object.values(expertise).every(o => o!== '')
        &&
        expertise.primary_topic_tags.length !== 0
        &&
        expertise.secondary_topic_tags.length !== 0
        &&
        expertise.languages.length !== 0

    )
};

export const validateExperienceState = (experience) => {
    return Object.values(experience).every(o => o!== '')
};

export const validatePreferenceState = (preference) => {
    return (
        Object.values(preference).every(o => o!== '')
        &&
        ((preference.open_for_travel.value === "yes" && preference.travel_places.length > 0 )
            ||
            preference.open_for_travel.value === "no"
        )
    )
}

export const validateMedia = (media) =>{
    return (
        media.profile_photo.src && media.cover_photo.src
        && media.links.length > 0
    )
};