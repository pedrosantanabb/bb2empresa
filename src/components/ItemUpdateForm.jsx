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
    const [supplierSelected, setSupplierSelected] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const {handleSubmit} = useForm();
   // const suppliers = (currentItem.supplierList)? currentItem.supplierList: [];
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [values, setValues] = useState({
        name: currentItem.name,
        description:  currentItem.description,
        price: currentItem.price,
        state: currentItem.state,
        suppliers: currentItem.supplierList
    });   

    const[suppliers, setSuppliers] = useState(currentItem.supplierList);

    useEffect(()=> {
        values.name = currentItem.name;
        values.description = currentItem.description;
        values.price = currentItem.price;
        values.state = currentItem.state;

        API.getAllSuppliers().then(setAllSuppliers);
        console.log(`AllSuppliers:${allSuppliers.length}`)
       
    },[]);

    function compareSuppliers(id){
        const result = suppliers.filter(supplier => supplier.id === id);   
        return result.length ==0;
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

    function addSupplier(event){
        console.log("Añadir supplier:" + supplierSelected);
        const supplier = allSuppliers.filter(sup => sup.id == Number(supplierSelected));
        setSuppliers([...suppliers, supplier]);
        const newValues = {
            ...values,
            [supplierList]: suppliers,
        };
        setValues(newValues);
        console.log(suppliers.length);
    }

    function changeSupplierSelected(event){
        console.log("ChanceSupplierSelected:"+ event.target.value);
        //const id = Number(event.target.value);
        //const supplier = allSuppliers.filter(sup => sup.id == id);
        setSupplierSelected(event.target.value);
        //console.log(supplierSelected.name);
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
                                                <Th>Name</Th>
                                                <Th>Country</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {(suppliers.length >2)?(
                                        suppliers.map( supplier =>(
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
                                    <Button mr={4} colorScheme="green" type="submit" mt={4}>Actualizar</Button>

                                    <Link to={'/'}>    
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