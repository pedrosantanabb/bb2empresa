import {Box, Select, FormControl, Input, Container, FormLabel, Button, VStack, StackDivider, Center } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as API from "../services/apiservice.js";
export function ItemNewForm(){
    const {data, setData} = React.useState([]);


    const { register, handleSubmit} = useForm({
        defaultValues:{
            name: '',
            description: '',
            price: '',
            state: ''
        }
    });

    const onSubmit = (values) => {
        console.log(values);
        try {
            const res = API.createItem({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(values),
            });
            console.log(res);
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
              }
            
              const data = res.json();
              const result = {
                status: res.status + "-" + res.statusText,
                headers: { "Content-Type": res.headers.get("Content-Type") },
                data: data,
              };
      
              
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        const putData= {
            name: "Prueba",
            description: "Descripcion 02",
            price: 25.8,
            state: 2,
        };

  
    }, [])

    return (
        <Center>
            <VStack
                maxWidth={600}
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'>
                <Box h='600'>
                    <Container maxW='container.sm' color='#262626' p='16'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>Nombre del producto</FormLabel>
                            <Input {...register("name", {required: true})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descripción del producto</FormLabel>
                            <Input {...register("description", {required: true})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Precio del producto</FormLabel>
                            <Input {...register("price", {required: true})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Estado del producto</FormLabel>
                            <Select placeholder='Select option' {...register("state", {required: true})}>
                                <option value='1'>ACTIVE</option>
                                <option value='2'>DISCONTINUED</option>
                            </Select>
                        </FormControl>
                        <Button bg="green.100" variant="outline" type="submit" width="full" mt={4}>Crear Nuevo Item</Button>
                        </form>
                    </Container>
                </Box>
            </VStack>
        </Center>
        );
}