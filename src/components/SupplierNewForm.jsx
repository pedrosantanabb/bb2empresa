import {Box, Select, FormControl, Input, Container, FormLabel, Button, VStack, StackDivider, Center, Card, CardHeader, Heading, CardBody, Flex, Spacer, FormErrorMessage } from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as API from "../services/apiservice.js";
import { Link, useNavigate } from "react-router-dom";

export function SupplierNewForm(){
    const navigate = useNavigate();
    
    const { register, handleSubmit} = useForm({
        defaultValues:{
            name: '',
            country: ''
        }
    });
    const isError = (register.name === '' || register.country==='');

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
        <Center p={8}  w={1920}>
            <Container maxW='4xl' centerContent>
                <Card w='100%'color='gray.500'>
                    <CardHeader>
                        <Heading align='center' size='lg'>Formulario de creación de Proveedores</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box h='300'>
                            <Container maxW='container.sm' color='#262626' p='4'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl isRequired>
                                    <FormLabel>Nombre del proveedor</FormLabel>
                                    <Input {...register("name")}/>
                                    {isError &&
                                    <FormErrorMessage>
                                        Nombre del proveedor requerido
                                    </FormErrorMessage>
                                    }
                                </FormControl >
                                <FormControl mt='8' mb='8' isRequired>
                                    <FormLabel>País</FormLabel>
                                    <Input {...register("country")}/>
                                    {isError &&
                                    <FormErrorMessage>
                                        País del proveedor requerido
                                    </FormErrorMessage>
                                    }
                                </FormControl>
                                <Flex>
                                    <Spacer/>
                                    <Button colorScheme='green' type="submit" mr={4} mt={4}>Crear Proveedor</Button>
                                    <Link to={'/suppliers' }>
                                        <Button colorScheme="red" type="submit" mt={4}>Cancelar</Button>
                                    </Link> 
                                </Flex>
                                </form>
                            </Container>
                        </Box>

                    </CardBody>
                </Card>
            </Container>
        </Center>
    );
}