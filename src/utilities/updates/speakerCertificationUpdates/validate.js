const validateDetails = (details) => {
    return details.every(detail=>{
        return Object.values(detail).every(o=>{
            return (
                o.name&& o.institution && o.from && o.to && (
                    o.file || o.link
                )
            )
        })
    })
}

export default validateDetails;