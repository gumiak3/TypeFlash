
const URL = "https://random-word-api.herokuapp.com/all";

export const  getData = ()=>{
    return fetch(URL)
        .then((response) => {
            if(!response.ok)
                throw new Error("Error");
            return response.json();
        })
}