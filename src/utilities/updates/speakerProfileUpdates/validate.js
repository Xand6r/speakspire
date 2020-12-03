const validator = (state) => {
    return Object.values(state).every(o=>o.length)
}

export default validator;