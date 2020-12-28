export const validateData = (state) => {
    return state.eventType && state.topicArea && state.topicTags.length
}