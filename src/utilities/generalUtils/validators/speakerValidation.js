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
        expertise.highest_education !== ""
        &&
        expertise.languages.length !== 0
        &&
        expertise.education.every(cert=>{
            return Object.values(cert).every(o=>o.length)
        })
        // &&
        // expertise.certifications.every((cert) => {
        //     return (
        //         cert.certification_name
        //         &&
        //         cert.institution_name
        //         &&
        //         cert.from
        //         &&
        //         cert.to
        //         &&
        //         (cert.file || cert.link)
        //     )
        // })
    )
};

export const validateExperienceState = (experience) => {
    return Object.values(experience).every(o => o!== '')
        // &&
        // experience.positions.every(cert=>{
        //     return Object.values(cert).every(o=>o.length)
        // })
};

export const validatePreferenceState = (preference) => {
    return (
        (
            preference.availability !== "" &&
            preference.mode_of_delivery !=="" &&
            preference.open_for_travel !== ""
        )
        &&
        ((preference.open_for_travel.value === "yes" && preference.travel_places.length > 0 )
            ||
            preference.open_for_travel.value === "no"
        )
        &&
        (preference.contactMail || preference.contactPhone || preference.contactWhatsapp)
        &&
        (preference.currency && preference.budgetFrom && preference.budgetTo)
    )
}

export const validateMedia = (media) =>{
    return true
    // return (
    //     media.profile_photo.src && media.cover_photo.src
    //     && media.links.length >= 0
    // )
};