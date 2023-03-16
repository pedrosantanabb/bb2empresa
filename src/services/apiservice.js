

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

export async function getSupplierDetail(id){
    try {
        const response = await fetch(`/api/suppliers/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllSuppliers(){
    try {
        const response = await fetch(`/api/suppliers/`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function createSupplier(requestOptions){
    try {
        console.log(requestOptions.body);
        const response =  await fetch(`/api/suppliers`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

export async function updateSupplier(id, requestOptions){
    try {
        console.log(requestOptions.body);
        const response =  await fetch(`/api/suppliers/${id}`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
}

export async function createPriceReduction(requestOptions){
    try {
        console.log(requestOptions.body);
        const response =  await fetch(`/api/pricereductions`, requestOptions);
        const data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}