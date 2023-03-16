import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Spinner, Button, Center, Box, Container, Heading, CardBody, CardHeader} from "@chakra-ui/react";
import { Profile } from "./Profile";
import { LoadingState } from "./LoadingState";

export function Home()  {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();



  if(isLoading){
    return <LoadingState/>;
    }

  return (
    <>
        <Center pt={16} w={1920}>
            <Container maxW='4xl' centerContent>
                <Card w='100%' p={4} color='gray.500'>
                    <CardHeader>
                        <Heading align='center' size='lg'>Bienvenidos a la App de gestión de la empresa</Heading>
                    </CardHeader>
                    <CardBody>
                        <Box h='300'>
                            <Container maxW='6xl' centerContent>
                                {(isAuthenticated)?(
                                    <>
                                        <Profile/>
                                    </>
                                ):(
                                    <Box h='300'>
                                        <Center>
                                            <Heading pb='16' size='sm'>Necesita Loguearse para poder entrar</Heading>        
                                        </Center>
                                        <Button colorScheme='green' size='lg' width='lg' onClick={loginWithRedirect}> Login</Button>
                                    </Box>
                                )}
                            </Container>
                        </Box>
                    </CardBody>
                </Card>
            </Container>        
        </Center>
    </>
  );
};
