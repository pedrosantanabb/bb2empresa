import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { Table, TableContainer, Th, Tr, Td, Thead, Tbody, Spacer, Flex, Textarea, Card,  Alert, AlertTitle, AlertDescription, Button, Center, Container, FormControl, FormLabel, Heading, Input, VStack, Box, CardHeader, CardBody, Stack } from "@chakra-ui/react";

export function ItemDetail(props){
    const {id} = useParams();
    console.log(id);
    const {state} = useLocation();
    console.log(state);
    const { currentItem, message }= state;
    console.log(message);
    console.log(currentItem);
    const item = currentItem;
    const suppliers = (currentItem.supplierList)? currentItem.supplierList: [];
    const priceReductions = (currentItem.priceReductions)? currentItem.priceReductions: [];

    return (
      <Center pt={16} w={1920}>
        <Stack spacing={3}>
          
          
        </Stack>
      <Container maxW='4xl' centerContent>
              <Card w='100%' p={4} color='gray.500'>
                  <CardHeader>
                    {(message)?(
                      <Alert mb={4} status="success">{message}</Alert>
                    ):(<></>)}
                      <Flex>
                        <Heading size='lg'>Item: {currentItem.name}</Heading>
                        <Spacer />
                        <Link to={`/items/update/${id}`} state={{currentItem: item}} >
                          <Button colorScheme="green">Actualizar</Button>
                        </Link>
                      </Flex>
                  </CardHeader>
                  <CardBody>
                      <Box  >                          
                        <FormControl mt={4}> 
                            <FormLabel>Descripción del producto</FormLabel>
                            <Textarea value={currentItem.description} isReadOnly/>
                        </FormControl>
                        <FormControl mt={4}> 
                            <FormLabel>Precio del producto</FormLabel>
                            <Input value={currentItem.price} isReadOnly/>
                        </FormControl>
                        <FormControl mt={4}> 
                            <FormLabel>Estado del producto</FormLabel>
                            <Input value={currentItem.state} isReadOnly/>
                        </FormControl>
                        <FormControl mt={4}> 
                            <FormLabel>Fecha de creación</FormLabel>
                            <Input value={currentItem.creationDate} isReadOnly/>
                        </FormControl>   
                      </Box>
                      <Box pt={8}>
                        <Heading size='md'>Listado de Proveedores</Heading>
                        <TableContainer mt="15" p="4">
                          <Table variant='simple' >
                            <Thead>
                              <Tr>
                                <Th>Name</Th>
                                <Th>Country</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {(suppliers.length >0)?(
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
                      <Box pt={8}>
                        <Heading size='md'>Precios Reducidos</Heading>
                        <TableContainer mt="15" p="4">
                          <Table variant='simple' >
                            <Thead>
                              <Tr>
                                <Th>Precio Reducido</Th>
                                <Th>Fecha de Inicio</Th>
                                <Th>Fecha de Fin</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {(priceReductions.length >0)?(
                              priceReductions.map( price =>(
                                <Tr key={price.id}>
                                  <Td>{price.reducedPrice}</Td>
                                  <Td>{price.startDate}</Td>
                                  <Td>{price.endDate}</Td>
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
    ); 

    
        
}