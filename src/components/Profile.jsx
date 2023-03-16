import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Button, Center, Box, Image, Heading} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export  const Profile = () => {
    const {logout, user, isAuthenticated, isLoading} = useAuth0();

    
    return (
        <>
        <Box h='300'>
            <Center>
                <Image src={user.picture} alt={user.name}/>
            </Center>
            <Center>
                <Heading alignContent='center' pt='4' size="md">{user.name}</Heading>
            </Center>
            <Flex mt='16'>
                <Link to={`/items`}>
                    <Button colorScheme='blue' size='md' mr='4'> Ver Productos</Button>
                </Link>
                <Link to={`/suppliers`}>
                    <Button colorScheme='blue' size='md' mr='4'> Ver Proveedores</Button>
                </Link>
                <Button colorScheme='red' size='md' onClick={logout}> Salir</Button>
            </Flex>
        </Box>
        </>
    );
                               

};