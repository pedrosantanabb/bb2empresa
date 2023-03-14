import React from "react";
import { useState, useEffect } from 'react'
import {
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
import * as API from "../services/apiservice.js";
import { Link } from "react-router-dom";
import {Menu} from "./Menu.jsx";


export function TableItems(){
    const [items, setItems] = useState([]);

  useEffect(() => {
    API.getAllItems().then(setItems);
  }, []);

  return (
    <>
    <Center p={8} ml={16} w={1920}>
      <Container maxW='8xl' centerContent>
        <Card w='100%' p={8} color='gray.500'>
          <CardHeader>
            <Flex>
              <Heading size='lg'>Listado de Productos</Heading>
              <Spacer/>
              <Link to={'items/newItem'}>    
                <Button colorScheme="green" leftIcon={<HiDocumentAdd/>}>Nuevo Item</Button>
              </Link>
            </Flex>
          </CardHeader>
          <CardBody>
          <TableContainer mt="15" p="4">
          <Table variant='simple' >
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map( item =>(
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.price}</Td>
                  <Td>
                    <Link to={`items/${item.id}`} state={{currentItem: item}}>
                      <Button variant='outline' mr="2" colorScheme="blue">Ver Item</Button>
                    </Link>
                    <Link to={`items/update/${item.id}`} state={{currentItem: item}}>
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