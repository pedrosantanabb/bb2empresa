import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { Card, Flex, Spacer, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as API from "../services/apiservice.js";

export function SupplierUpdateForm(){
    const navigate = useNavigate();
    const location = useLocation();  
    const { id } = useParams();
    const {handleSubmit} = useForm();
    const { currentItem }= location.state;

    const [values, setValues] = useState({
        name: currentItem.name,
        country:  currentItem.country
    });   

    useEffect(()=> {
        values.name = currentItem.name;
        values.country = currentItem.country;           
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

                navigate(`/suppliers/${id}`, {state:{currentItem: result, message:"Proveedor actualizado correctamente"}});
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
                          <Heading size='md'>Actualizando Proveedor</Heading>
                      </CardHeader>
                      <CardBody>
                          <Box  >
                              <form onSubmit={handleSubmit(onSubmit)}>
                                  <FormControl>
                                      <FormLabel>Nombre del proveedor</FormLabel>
                                      <Input id="name" name="name" value={values.name} onChange={handleChange} isRequired/>
                                  </FormControl>
                                  <FormControl mt={4}> 
                                      <FormLabel>País del proveedor</FormLabel>
                                      <Input id="country" name="country" value={values.country} onChange={handleChange} isRequired/>
                                  </FormControl>
                                  <Flex>
                                      <Button mr={4} colorScheme="green" type="submit" mt={4}>Actualizar</Button>
  
                                      <Link to={'/suppliers'}>    
                                          <Button colorScheme="red" type="submit" mt={4}>Cancelar</Button>
                                      </Link>
                                      <Spacer/>
                                  </Flex>
                              </form>                         
                          </Box>
                          
                      </CardBody>
                  </Card>
                      
              </Container> 
          </Center>                                  
          
          </>  
      );

}