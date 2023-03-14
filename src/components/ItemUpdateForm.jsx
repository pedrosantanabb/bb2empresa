import React from "react";
import { Card, Flex, Spacer, Select, StackDivider, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function ItemUpdateForm(){
    const location = useLocation();    
    const { currentItem }= location.state;
    //console.log(currentItem);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: ""
    });

    useEffect(()=> {
        values.name = currentItem.name;
        values.description = currentItem.description;
        values.price = currentItem.price;
    },[]);

    function handleChange(event){
        const {target} = event;
        const { name, value} = target;

        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
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
                                <form>
                                    <FormControl>
                                        <FormLabel>Nombre del producto</FormLabel>
                                        <Input id="name" name="name" value={values.name} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}> 
                                        <FormLabel>Descripción del producto</FormLabel>
                                        <Input id="description" name="description" value={values.description} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl mt={4}> 
                                        <FormLabel>Precio del producto</FormLabel>
                                        <Input id="price" name="price" value={values.price} onChange={handleChange}/>
                                    </FormControl>
                                    <Flex>
                                        <Spacer/>
                                        <Button mr={4} colorScheme="green" type="submit" mt={4}>Actualizar</Button>
                                        <Link to={'items/'}>    
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