import { Table, Th, Tr, Td, Thead, Tbody, TableContainer, Card, Flex, Spacer, Select, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody, InputGroup, InputRightElement } from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as API from "../services/apiservice.js";
export function ItemNewForm(){
    const [supplierSelected, setSupplierSelected] = useState(-1);    
    const [allSuppliers, setAllSuppliers] = useState([]);
    const navigate = useNavigate();
    
    const [suppliers, setSuppliers] = useState([]);
        
    const { register, handleSubmit} = useForm({
        defaultValues:{
            name: '',
            description: '',
            price: '',
            state: '',
            supplierList: [],
        }
    });

    useEffect(()=> {
        
        API.getAllSuppliers().then(setAllSuppliers);
        console.log(`AllSuppliers:${allSuppliers.length}`)
       
    },[]);
    const isError = (register.name === '' || register.description==='' || register.price===''|| register.state==='');
    
    const onSubmit = (values) => {
        console.log(values);

        values.supplierList = suppliers;
        const jsonBody = JSON.stringify(values);
        console.log("Transformando el body");
        console.log(jsonBody);
        try {
            const res = API.createItem({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonBody,
            }).then(function(result){
                console.log("Resultado:")
                console.log(result);
                navigate(`/items`, {state:{ message:"Producto creado correctamente"}});
            });
              
        } catch (error) {
            console.log(error);
        }
    }

    function compareSuppliers(id){
        const result = suppliers?.filter(supplier => supplier.id === id);   
        return result?.length ==0;
    }
    
    function changeSupplierSelected(event){
        console.log("ChanceSupplierSelected:"+ event.target.value);        
        setSupplierSelected(event.target.value);
    }

    function addSupplier(event){
        console.log("Añadir supplier:" + supplierSelected);
        const supplier = allSuppliers.filter(sup => sup.id == Number(supplierSelected));
        console.log(supplier[0].name);
        setSuppliers([
            ...suppliers,
            {id: supplier[0].id, name: supplier[0].name, country: supplier[0].country }
        ]);

        console.log(suppliers.length);
        console.log(suppliers);
    }


    return (
        <Center p={8}  w={1920}>
            <Container maxW='4xl' centerContent>
                <Card w='100%'color='gray.500'>
                    <CardHeader>
                        <Heading align='center' size='lg'>Formulario de creación de Productos</Heading>
                    </CardHeader>
                    <CardBody>                        
                        <Box h='100%'>
                            <Container maxW='container.sm' color='#262626' p='4'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl mb={4} isInvalid={isError} isRequired> 
                                    <FormLabel>Nombre del producto</FormLabel>
                                    <Input {...register("name")}/>
                                    {isError &&
                                        <FormErrorMessage>
                                            Nombre del producto requerido
                                        </FormErrorMessage>
                                    }
                                </FormControl>
                                <FormControl mb={4}  isInvalid={isError} isRequired>
                                    <FormLabel>Descripción del producto</FormLabel>
                                    <Input {...register("description")}/>
                                    {isError &&
                                        <FormErrorMessage>
                                            Descripción del producto requerido
                                        </FormErrorMessage>
                                    }
                                </FormControl>
                                <FormControl mb={4} isInvalid={isError} isRequired>
                                    <FormLabel>Precio del producto</FormLabel>
                                    <Input {...register("price")}/>
                                    {isError &&
                                        <FormErrorMessage>
                                            Precio del producto requerido
                                        </FormErrorMessage>
                                    }
                                </FormControl>
                                <FormControl mb={4} isInvalid={isError} isRequired>
                                    <FormLabel>Estado del producto</FormLabel>
                                    <Select placeholder='Seleccione una Opción' {...register("state")}>
                                        <option value='ACTIVE'>ACTIVE</option>
                                        <option value='DISCONTINUED'>DISCONTINUED</option>
                                    </Select>
                                    {isError &&
                                        <FormErrorMessage>
                                            Precio del producto requerido
                                        </FormErrorMessage>
                                    }
                                </FormControl>
                                <Box pt={8}>
                                    <Heading pb={4} size='md'>Listado de Proveedores</Heading>
                                    <Flex>
                                        <Select mr={2} onChange={changeSupplierSelected} placeholder="Seleccione el proveedor que desea añadir">
                                        {(allSuppliers?.length >0)?(
                                            allSuppliers.map( supplier =>(
                                            (compareSuppliers(supplier.id)) && <option key={supplier.id} value={supplier.id} >{supplier.name}</option> 
                                        ))
                                        ):(
                                            <option>No hay proveedores</option>
                                         )}
                                        </Select>
                                        <Button onClick={addSupplier} size='md'>Añadir</Button>

                                    </Flex>                                   
                              
                                    <TableContainer mt="15" p="4">
                                    <Table variant='simple' >
                                        <Thead>
                                            <Tr>
                                                <Th>Nombre</Th>
                                                <Th>País</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {(suppliers?.length >0)?(
                                        suppliers?.map( supplier =>(
                                            <Tr key={supplier.id}>
                                                <Td>{supplier.name}</Td>
                                                <Td>{supplier.country}</Td>
                                            </Tr>
                                        ))
                                        ):(
                                            <Tr>
                                                <Td>
                                                <strong>No se encontraron proveedores</strong>
                                                </Td>
                                            </Tr>
                                        )}
                                        </Tbody>
                                    </Table>
                                    </TableContainer>
                                </Box>
                                <Flex>
                                    <Spacer/>
                                    <Button colorScheme='green' type="submit" mr={4} mt={4}>Crear Nuevo Producto</Button>
                                    <Link to={'/items'}>
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