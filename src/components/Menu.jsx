
import React from "react";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


export function Menu({props}){
    
    const [isOpen, setIsOpen] = React.useState(true);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <NavBarContainer {...props}>
          <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
      );
}



const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["green.500", "green.500", "transparent", "transparent"]}
        color={["black", "black", "primary.700", "primary.700"]}
        {...props}
      >
        {children}
      </Flex>
    );
  };

const MenuLinks = ({ isOpen }) => {
  const {logout, loginWithRedirect, isAuthenticated } = useAuth0();
    return (
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Inicio</MenuItem>
          <MenuItem to="/items"> Productos </MenuItem>
          <MenuItem to="/suppliers"> Proveedores </MenuItem>
          {(isAuthenticated)?(
            <MenuItem to="/" isLast>
              <Button size="sm" 
              rounded="md" color={["primary.500", "primary.500", "white", "white"]} 
              bg={["red", "red", "primary.500", "primary.500"]} 
              _hover={{bg: ["primary.100", "primary.100", "primary.600", "primary.600"]}}
              onClick={logout}>
                Logout
              </Button>
            </MenuItem>
          ):(
          <MenuItem to={loginWithRedirect} isLast>
            <Button
              size="sm"
              rounded="md"
              color={["black", "primary.500", "white", "white"]}
              bg={["green", "green", "primary.500", "primary.500"]}
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }} onClick={loginWithRedirect}
            >
              Login
            </Button>
          </MenuItem>
          )}
        </Stack>
      </Box>
    );
  };


const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
      <Link to={to}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    );
  };