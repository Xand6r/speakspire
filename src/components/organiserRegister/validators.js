export const validateOrganiserDetails = (detailsState) =>{
    // validate that all the organisers information are properly entered
    return Object.values(detailsState).every(o => o!== '');
}

export const validateOrganiserMedia = (mediaDetails) =>{
    // validate that all the media information is properly entered
    console.log(mediaDetails)
    return (
        mediaDetails.speciality !== "" &&
        mediaDetails.services.length > 0 &&
        mediaDetails.bio !== "" &&   
        mediaDetails.clients.length > 0 &&
        mediaDetails.partners.length > 0 &&
        mediaDetails.links.length >= 0
    );
}