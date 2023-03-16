import React from "react";
import { Table, Th, Tr, Td, Thead, Tbody, TableContainer, Card, Flex, Spacer, Select, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as API from "../services/apiservice.js";
import { AddPriceReductionModal } from "./AddPriceReductionModal.jsx";
import { TableSuppliersUpdate } from "./tables/TableSuppliersUpdate.jsx";

export function ItemUpdateForm(){
    const navigate = useNavigate();
    const location = useLocation();    
    const { id } = useParams();
    const { currentItem }= location.state;
    const [suppliers, setSuppliers] = useState(currentItem.supplierList);
    const [pricesList, setPriceslist]  = useState(currentItem.priceReductions);
    const [supplierSelected, setSupplierSelected] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [values, setValues] = useState({
        name: currentItem.name,
        description:  currentItem.description,
        price: currentItem.price,
        state: currentItem.state,
        supplierList: [],
        priceReductions: [],
    });

    const [newPriceReduction, setNewPriceReduction] = useState({
        id:null,
        reducedPrice: '',
        startDate: '',
        endDate: '',
        item: { id: currentItem.id},
    });
    
    const { register, handleSubmit} = useForm({
        defaultValues:{
            id: currentItem.id,
            creationDate: currentItem.creationDate,
            name: currentItem.name,
            description: currentItem.description,
            price: currentItem.price,
            state: currentItem.state,
            supplierList: [],
            priceReductions:[],
        }
    });

    useEffect(()=> {
        values.name = currentItem.name;
        values.description = currentItem.description;
        values.price = currentItem.price;
        values.state = currentItem.state;

        API.getAllSuppliers().then(setAllSuppliers);
        console.log(`AllSuppliers:${allSuppliers.length}`)
       
    },[]);

    

    function compareSuppliers(id){
        const result = currentItem.supplierList?.filter(supplier => supplier.id === id);   
        return result?.length ==0;
    }

    function handlePriceReductionChange(event){
        const {target} = event;
        const { name, value} = target;
        console.log(name + "," + value);
        const newValues = {
            ...newPriceReduction,
            [name]: value,
        };
        setNewPriceReduction(newValues);
        console.log(`HandleChangeAfter:${newPriceReduction.price} `);
    }

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

    const onSubmit = (values) =>{
        try{
            values.supplierList = suppliers;
            values.priceReductions= pricesList;
            const jsonBody = JSON.stringify(values);
            console.log("Transformando el body");
            console.log(jsonBody);
            API.updateItem(currentItem.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: jsonBody,
            }).then(function(result){
                console.log(result);

                navigate(`/items/${id}`, {state:{currentItem: result, message:"Item actualizado correctamente"}});
            });
        } catch(error){
            console.error(error);
        }
    }

    function addSupplier(){
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

    function addPriceReduction(){
        console.log("Añadir priceReduction:" + newPriceReduction);
        const jsonBody = JSON.stringify(newPriceReduction);
        API.createPriceReduction({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonBody,
        }).then(function(result){
            console.log("Resultado:")
            console.log(result);
            setPriceslist([
                ...pricesList,
                {id: result.id, reducedPrice: result.reducedPrice, startDate: result.startDate, endDate: result.endDate}
            ]);
        });

        
    }

    function changeSupplierSelected(event){
        console.log("ChanceSupplierSelected:"+ event.target.value);        
        setSupplierSelected(event.target.value);
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
                                <Box pt={8}>
                                    <Heading pb={4} size='md'>Listado de Precios Reducidos</Heading>
                                    <Flex>
                                        <FormControl isRequired mr={4}>
                                            <FormLabel>Precio Reducido</FormLabel>
                                            <Input id="reducedPrice" name="reducedPrice" onChange={handlePriceReductionChange} isRequired/>
                                        </FormControl>
                                        <FormControl isRequired mr={4}>
                                            <FormLabel>Fecha de Inicio</FormLabel>
                                            <Input id="startDate" name="startDate" type="date" onChange={handlePriceReductionChange} isRequired/>
                                        </FormControl>
                                        <FormControl isRequired mr={4}>
                                            <FormLabel>Fecha de Fin</FormLabel>
                                            <Input id="endDate" name="endDate" type="date" onChange={handlePriceReductionChange} isRequired/>
                                        </FormControl>
                                        <Button onClick={addPriceReduction} size='lg'>Añadir</Button>

                                    </Flex>                                   
                                    <TableContainer mt="15" p="4">
                                    <Table variant='simple' >
                                        <Thead>
                                            <Tr>
                                                <Th>Precio</Th>
                                                <Th>Fecha Inicio</Th>
                                                <Th>Fecha Fin</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {(pricesList?.length >0)?(
                                        pricesList?.map( priceR =>(
                                            <Tr key={priceR.id}>
                                                <Td>{priceR.reducedPrice}</Td>
                                                <Td>{priceR.startDate}</Td>
                                                <Td>{priceR.endDate}</Td>
                                            </Tr>
                                        ))
                                        ):(
                                            <Tr>
                                                <Td>
                                                <strong>No se encontraron precios reducidos</strong>
                                                </Td>
                                            </Tr>
                                        )}
                                        </Tbody>
                                    </Table>
                                    </TableContainer>
                                </Box>
                                <Flex>
                                    <Button mr={4} colorScheme="green" type="submit" mt={4}>Actualizar</Button>

                                    <Link to={'/items'}>    
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

        {isOpen && <AddPriceReductionModal setIsOpen={setIsOpen} />}                                     
        
        </>  
    );
}