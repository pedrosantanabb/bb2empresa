import {Button, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter}from "@chakra-ui/react";

export function AddPriceReductionModal({
    onClose,
    setIsOpen,
    size,
    isOpen
}){
    return(
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            
            <ModalContent>
                <ModalHeader>Añade un precio reducido</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>

                </ModalBody>

                <ModalFooter>
                <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            
        </Modal>
    );
}