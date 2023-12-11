import { Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, Textarea, Box } from '@chakra-ui/react';

const EditAdminModal = ({ finalRef, isOpen, onClose, secilenTalep }) => {
    return <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

            <ModalHeader>Talebi Cevaplandır,<br /> ID : {secilenTalep}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Button w="100%" mb={2} colorScheme='orange' mr={2} >
                    İşleme Alındığını Bildir!
                </Button>
                <Textarea placeholder='İşlem Sonrası Açıklama' />
                <Box mt={2}>
                    <Checkbox defaultChecked>İşlem Başarılı Mı?</Checkbox>
                </Box>
            </ModalBody>

            <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={2} >
                    Gönder
                </Button>
                <Button variant='ghost' onClick={onClose}>Vazgeç</Button>
            </ModalFooter>

        </ModalContent>
    </Modal>
}

export default EditAdminModal