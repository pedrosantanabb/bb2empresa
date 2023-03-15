import {Box, Select, FormControl, Input, Container, FormLabel, Button, VStack, StackDivider, Center } from "@chakra-ui/react";
import * as React from "react";
import {useState} from "react";
import { useForm } from "react-hook-form";
import * as API from "../services/apiservice.js";
import { useNavigate } from "react-router-dom";

export function SupplierNewForm(){
    const navigate = useNavigate();
    
    const { register, handleSubmit} = useForm({
        defaultValues:{
            name: '',
            country: ''
        }
    });

    const onSubmit = (values) => {
        console.log(values);
        try {
            API.createSupplier({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(values),
            }).then(function(result){
                console.log(result);
                navigate(`/suppliers`, {state:{ message:"Proveedor creado correctamente"}});

            });
            
      
        } catch (error) {
            console.log(error);
        }
    }


    return(
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
                            <FormLabel>Nombre del proveedor</FormLabel>
                            <Input {...register("name", {required: true})}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>País</FormLabel>
                            <Input {...register("country", {required: true})}/>
                        </FormControl>
                        <Button bg="green.100" variant="outline" type="submit" width="full" mt={4}>Crear Proveedor</Button>
                        </form>
                    </Container>
                </Box>
            </VStack>
        </Center>
    );
}