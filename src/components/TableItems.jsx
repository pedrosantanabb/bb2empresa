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
} from '@chakra-ui/react'
import {HiDocumentAdd} from "react-icons/hi"; 
import * as API from "../services/apiservice.js";


export function TableItems(){
    const [items, setItems] = useState([]);

  useEffect(() => {
    API.getAllItems().then(setItems);
  }, []);

  return (
    <>
    <Flex>
        <Center>
            <Heading as='h3' size='lg' p="4" m="4">Listado de Productos</Heading>
        </Center>
        <Center>
            <Button colorScheme="green" leftIcon={<HiDocumentAdd/>}>Nuevo Item</Button>

        </Center>
    </Flex>
    <section>
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
                    <Button variant='outline' mr="2" colorScheme="blue">Ver Item</Button>
                    <Button variant='outline' colorScheme="green">Actualizar</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    </section>
    </>
  );

}