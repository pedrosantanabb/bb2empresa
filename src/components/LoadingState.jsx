import { Center, Spinner, Heading } from "@chakra-ui/react"


export function LoadingState(){

    return(
        <Center pt={16} w={1920}>
            <Spinner size='xl'/>
            <Heading ml='4' size='md'>Cargando...</Heading>
        </Center>
    )
    
}