const validator = (state) => {
    return state.every(detail=>{
        return Object.values(detail).every(o=>o)
    })
}

export default validator;