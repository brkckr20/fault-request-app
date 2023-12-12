import { Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, Textarea, Box } from '@chakra-ui/react';
import { putProcessingNotification, putProcessing } from '../../api';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';

const EditAdminModal = ({ finalRef, isOpen, onClose, secilenTalep }) => {
    const { register, handleSubmit } = useForm();
    const mutation = useMutation();

    const islemAlindiginiBildir = () => {
        putProcessingNotification(secilenTalep)
    }
    const onSubmit = data => {
        let values = {
            id: secilenTalep,
            admin_aciklamasi: data.admin_aciklamasi,
            basariliMi: data.basariliMi,
        }

        putProcessing(values);
    };


    return <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>

            <ModalHeader>Talebi Cevaplandır<br /> ID : {secilenTalep}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <Button onClick={islemAlindiginiBildir} type='button' w="100%" mb={2} colorScheme='orange' mr={2} >
                        İşleme Alındığını Bildir!
                    </Button>
                    <Textarea {...register("admin_aciklamasi")} placeholder='İşlem Sonrası Açıklama' />
                    <Box mt={2}>
                        <Checkbox {...register("basariliMi")}>İşlem Başarılı Mı?</Checkbox>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button type='submit' colorScheme='blue' mr={2} >
                        Gönder
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Vazgeç</Button>
                </ModalFooter>
            </form>

        </ModalContent>
    </Modal>
}

export default EditAdminModal