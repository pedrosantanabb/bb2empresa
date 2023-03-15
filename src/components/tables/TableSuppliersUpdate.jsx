
import { Flex, Select, Button, Table, Th, Tr, Td, Thead, Tbody} from "@chakra-ui/react"; 
import React from "react";

export function TableSuppliersUpdate({
    suppliers,
    allSuppliers,
    onchange,
    onClick,
}) {

    const [data, setData] = React.useState([
        {
            name: "",
            country:""
        }
    ])

    React.useEffect(()=> {
        setData(suppliers);
    },[]);

    function compareSuppliers(id){
        const result = suppliers.filter(supplier => supplier.id === id);   
        return result.length ==0;
    }



    return(
        <>
        <Flex>
            <Select mr={2} onChange={onchange} placeholder="Seleccione el proveedor que desea añadir">
            {(allSuppliers?.length >0)?(
                allSuppliers.map( supplier =>(
                (compareSuppliers(supplier.id)) && <option key={supplier.id} value={supplier.id} >{supplier.name}</option> 
            ))
            ):(
                <option>No hay proveedores</option>
                )}
            </Select>
            <Button onClick={onClick} size='md'>Añadir</Button>

        </Flex>
        <Table variant='simple' >
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Country</Th>
                </Tr>
            </Thead>
            <Tbody>
            {(data.length >0)?(
            data.map( supplier =>(
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
        </>
    );
}