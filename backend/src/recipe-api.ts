require('dotenv').config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm : string, page:number) => {
    if(!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
    
    const queryParams = {
        apiKey,
        query : searchTerm,
        number : "10",
        offset :(page * 10).toString()
    }
    url.search = new URLSearchParams(queryParams).toString()

    try{
        const searchResponse = await fetch(url);
        const resultsJson = await searchResponse.json();
        return resultsJson; 
    }catch (error){
        console.log(error);
    }
};

export const getRecipeSummmary = async(recipeId : string) =>{
    if(!apiKey) {
        throw new Error("API KEY NOT FOUND");
    }
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
    const params = {
        apiKey : apiKey
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const json = await response.json();

    return json;
}