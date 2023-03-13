

const API_URL = "http:localhost:8080";

export async function getAllItems(){
    try{
        
        const response = await fetch("/items");
        
        const data = await response.json();
        console.log(data);
        return data;       
    } catch(error) {
        console.error(error);
    }
}
    
export async function getItemById(id){
    try{
        const response = await fetch(`${API_URL}/items/${id}`);
        const data = await response.json();
        return data;       
    } catch(error) {
        console.log(error);
    }

}