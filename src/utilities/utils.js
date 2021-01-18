export const jsonParse = (jsonstring) => {
    try{
        return JSON.parse(jsonstring)
    }catch(err){
        console.log(`%c ${err.message}`, 'color:red;font-size:25px;');
        return [];
    }
}

const engagementMap = {
    '0-10 engagements': 0.4,
    '11-50 engagements': 0.7,
    '51+ engagements': 1
};

const experienceMap = {
    '0-2 years': 0.4,
    '2 -5 years': 0.7,
    '6+ years': 1, 
};


/**
 * Function to classify a speaker into standard, classic or premium
 * @param {*} engagements The number range of engagements a speaker has had
 * @param {*} experience The number range of experience a user has had
 * @param {*} languageString  The string of languages a user speaks
 * @returns [standard, classic, premium]
 */
export const classifySpeaker = (engagements, experience, languageString) => {
    const score = (engagementMap[engagements] * 55) + (experienceMap[experience] * 40) + jsonParse(languageString).length
    if(score <= 45){
        return "standard"
    }else if(score >= 46 && score <= 84){
        return "classic"
    }else{
        return "premium"
    }
}