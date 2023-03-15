import * as API from "../services/apiservice.js";
import { useState, useEffect } from 'react'
import {
    Alert,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Flex,
    Center,
    Container,
    Card,
    CardHeader,
    Spacer,
    CardBody,
  } from '@chakra-ui/react'

  import {HiDocumentAdd} from "react-icons/hi"; 
  import { Link, useLocation } from "react-router-dom";

export function SupplierList(){
    const {state} = useLocation();
    console.log(state);
    
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        API.getAllSuppliers().then(setSuppliers);
      }, []);

    return (
        <>
            <Center p={8} ml={16} w={1920}>
                <Container maxW='8xl' centerContent>
                    <Card w='100%' p={8} color='gray.500'>
                    <CardHeader>
                        {(state?.message)?(
                            <Alert mb={4} status="success">{state.message}</Alert>
                        ):(<></>)}
                        <Flex>
                        <Heading size='lg'>Listado de Proveedores</Heading>
                        <Spacer/>
                        <Link to={'/suppliers/newSupplier'}>    
                            <Button colorScheme="green" leftIcon={<HiDocumentAdd/>}>Nuevo Proveedor</Button>
                        </Link>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                    <TableContainer mt="15" p="4">
                    <Table variant='simple' >
                        <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Country</Th>
                            <Th></Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {suppliers.map( supplier =>(
                            <Tr key={supplier.id}>
                            <Td>{supplier.name}</Td>
                            <Td>{supplier.country}</Td>
                            <Td>
                                <Link to={`/suppliers/${supplier.id}`} state={{currentItem: supplier}}>
                                    <Button variant='outline' mr="2" colorScheme="blue">Ver Proveedor</Button>
                                </Link>
                                <Link to={`/suppliers/update/${supplier.id}`} state={{currentItem: supplier}}>
                                    <Button variant='outline' colorScheme="green">Actualizar</Button>
                                </Link>
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                    </CardBody>
                    </Card>
                </Container>
            </Center>
        </>
    );
}