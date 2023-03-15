import { Table, TableContainer, Th, Tr, Td, Thead, Tbody, Card, Flex, Spacer, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody} from "@chakra-ui/react";
import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";


export function SupplierDetail(){
    const {id} = useParams();
    const {state} = useLocation();
    console.log(state);
    const { currentItem, message }= state;
    const item = currentItem;
    const items = (currentItem.items)? currentItem.items: [];
    console.log(items.length);
    return (
        <>
          <Center pt={16} w={1920}>
              <Container maxW='4xl' centerContent>
                  <Card w='100%' p={4} color='gray.500'>
                      <CardHeader>
                        {(message)?(
                            <Alert mb={4} status="success">{message}</Alert>
                        ):(<></>)}
                        <Flex>
                            <Heading size='lg'>Proveedor: {currentItem.name}</Heading>
                            <Spacer />
                                <Link to={`/suppliers/update/${id}`} state={{currentItem: item}} >
                                    <Button colorScheme="green">Actualizar</Button>
                                </Link>
                        </Flex>
                      </CardHeader>
                      <CardBody>
                          <Box  >
                              <form >
                                  <FormControl>
                                      <FormLabel>Nombre del proveedor</FormLabel>
                                      <Input id="name" name="name" value={currentItem.name} isReadOnly/>
                                  </FormControl>
                                  <FormControl mt={4}> 
                                      <FormLabel>País del proveedor</FormLabel>
                                      <Input id="country" name="country" value={currentItem.country} isReadOnly/>
                                  </FormControl>
                              </form>                         
                          </Box>
                          <Box pt={8}>
                            <Heading size='md'>Listado de Items</Heading>
                                <TableContainer mt="15" p="4">
                                    <Table variant='simple' >
                                    <Thead>
                                        <Tr>
                                            <Th>Name</Th>
                                            <Th>Description</Th>
                                            <Th>Price</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {(items.length >0)?(
                                        items.map( item =>(
                                            <Tr key={item.id}>
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.price}</Td>
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
                          
                      </CardBody>
                  </Card>
                      
              </Container> 
          </Center>                                  
          
          </>  
      );

}