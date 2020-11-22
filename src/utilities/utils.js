export const jsonParse = (jsonstring) => {
    try{
        return JSON.parse(jsonstring)
    }catch(err){
        console.log(`%c ${err.message}`, 'color:red;font-size:25px;');
        return [];
    }
}