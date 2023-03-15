import React from "react";
import { Card, Flex, Spacer, Select, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as API from "../services/apiservice.js";

export function ItemUpdateForm(){
    const navigate = useNavigate();
    const location = useLocation();    
    const { id } = useParams();
    const { currentItem }= location.state;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {handleSubmit} = useForm();
    
    const [values, setValues] = useState({
        name: currentItem.name,
        description:  currentItem.description,
        price: currentItem.price,
        state: currentItem.state
    });   

    useEffect(()=> {
        console.log(`UseEffectBefore:${values.name} `);
        values.name = currentItem.name;
        values.description = currentItem.description;
        values.price = currentItem.price;
        values.state = currentItem.state;
        console.log(`UseEffectAfter:${values.name} `);
    },[]);

    function handleChange(event){
        const {target} = event;
        const { name, value} = target;
        console.log(name + "," + value);
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
        console.log(`HandleChangeAfter:${values.name} `);
    }

    const onSubmit = () =>{
        try{
            API.updateItem(currentItem.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(values),
            }).then(function(result){
                console.log(result);

                navigate(`/items/${id}`, {state:{currentItem: result, message:"Item actualizado correctamente"}});
            });
        } catch(error){
            console.error(error);
        }
    }

    return (
      <>
        <Center pt={16} w={1920}>
            <Container maxW='4xl' centerContent>
                <Card w='100%' p={4} color='gray.500'>
                    <CardHeader>
                        <Heading size='md'>Actualizando Item</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box  >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl>
                                    <FormLabel>Nombre del producto</FormLabel>
                                    <Input id="name" name="name" value={values.name} onChange={handleChange} isRequired/>
                                </FormControl>
                                <FormControl mt={4}> 
                                    <FormLabel>Descripción del producto</FormLabel>
                                    <Input id="description" name="description" value={values.description} onChange={handleChange} isRequired/>
                                </FormControl>
                                <FormControl mt={4}> 
                                    <FormLabel>Precio del producto</FormLabel>
                                    <Input id="price" name="price" value={values.price} onChange={handleChange} isRequired/>
                                </FormControl>
                                <FormControl mt={4}> 
                                    <FormLabel>Estado</FormLabel>
                                    <Select id="state" name="state" value={values.state} onChange={handleChange} isRequired>
                                        <option value='ACTIVE'>Activo</option>
                                        <option value='DISCONTINUED'>Descatalogado</option>
                                    </Select>
                                </FormControl>
                                <Flex>
                                    <Spacer/>
                                    <Button mr={4} colorScheme="green" type="submit" mt={4}>Actualizar</Button>

                                    <Link to={'/'}>    
                                        <Button colorScheme="red" type="submit" mt={4}>Cancelar</Button>
                                    </Link>
                                </Flex>
                            </form>                         
                        </Box>
                        <Button onClick={onOpen}>Open Modal</Button>
                    </CardBody>
                </Card>
                    
            </Container> 
        </Center>


        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            
            <ModalContent>
                <ModalHeader>Añade un precio reducido</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>

                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            
        </Modal>
        </>  
    );
}