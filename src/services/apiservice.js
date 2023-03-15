

const API_URL = "http:localhost:8080";

export async function getAllItems(){
    try{
        
        const response = await fetch("/api/items");
        
        const data = await response.json();
        console.log(data);
        return data;       
    } catch(error) {
        console.error(error);
    }
}
    
export async function getItemById(id){
    try{
        const response = await fetch(`/api/items/${id}`);
        console.log(response);
        const data = await response.json();
        return data;       
    } catch(error) {
        console.log(error);
        return error;
    }

}

export async function updateItem(id, requestOptions){
    try {
        console.log(requestOptions.body);
        const response =  await fetch(`/api/items/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
}

export async function createItem(requestOptions){
    try {
        console.log(requestOptions.body);
        const response =  await fetch(`/api/items`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}