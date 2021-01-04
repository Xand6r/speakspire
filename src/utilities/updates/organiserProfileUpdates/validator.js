export const validateData = (state) => {
    return Object.values(state).every(item => item!=="")
}