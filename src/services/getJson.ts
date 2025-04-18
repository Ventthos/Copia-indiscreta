export async function getJson(url: string){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return  {data: data, error: null}
          
    }
    catch(error){
        return {data: null, error: error}
    };
}