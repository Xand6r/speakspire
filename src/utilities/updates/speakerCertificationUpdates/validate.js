const validateDetails = (details) => {
    return details.every(detail=>{
        return Object.values(detail).every(o=>o.length)
    })
}

export default validateDetails;