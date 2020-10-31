export const validateEventInfo = (eventInfoState) =>{
    return (
        Object.values(eventInfoState).every(o => o!== '') &&
        eventInfoState.services.length > 0
    );
}

const _validateLocation = (scheduleState) => {
    return (
        (
            scheduleState.location.value === "Physical" &&
            scheduleState.physicalLink !== ''
        ) ||
        (
            scheduleState.location.value === "Virtual" &&
            scheduleState.onlineLink.every(o => o !== '')
        ) ||
        (
            scheduleState.location.value === "Physical and Virtual" &&
            scheduleState.onlineLink.every(o => o !== '') &&
            scheduleState.physicalLink !==''
        )

    )
}

const _validateFrequency = (scheduleState) => {
    return(
        (
            ["Single-day Event", "Multi-day Event"].includes(scheduleState.frequency.value) &&
            scheduleState.dateFrom.length > 0 &&
            scheduleState.dateTo.length > 0 &&
            scheduleState.timeFrom.length > 0 &&
            scheduleState.timeTo.length > 0 
        ) ||
        (
            ["Recurring Event"].includes(scheduleState.frequency.value) &&
            scheduleState.interval !== '' &&
            scheduleState.dateFrom.length > 0 &&
            scheduleState.dateTo.length > 0 &&
            scheduleState.timeFrom.length > 0 &&
            scheduleState.timeTo.length > 0 
        )
    )
}

export const validateSpeakerCall = (scheduleState) =>{
    return scheduleState.every(speakerCall=>{
        return Object.values(speakerCall).every(o=>o!=="")
    })
}

export const validateMedia = (scheduleState) => {
    return scheduleState.profile_photo.src &&
    scheduleState.cover_photo.src
}

export const scheduleValidator = (scheduleState) => {
    return (
        _validateLocation(scheduleState) &&
        _validateFrequency(scheduleState)
    );
}