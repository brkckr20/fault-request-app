import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, Textarea, Select } from '@chakra-ui/react';
import { talepTuru } from '../../data';
import { useMutation, useQueryClient } from 'react-query';
import { postRequest } from '../../api';
import { useForm } from "react-hook-form"
import { getUserId } from '../../config';


const AddModal = ({ finalRef, isOpen, onClose, goToPage }) => {

    const { register, handleSubmit } = useForm();
    const { invalidateQueries } = useQueryClient();
    const { mutate } = useMutation(postRequest, {
        onSuccess: () => {
            invalidateQueries("getRequests");
        }
    });
    const userID = getUserId();
    const onSubmit = (data) => {
        const values = {
            talep_eden_id: userID,
            ...data
        }
        mutate(values);
        onClose();
        goToPage('bekleyentalepler');
    };

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Yeni Talep Oluştur</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select {...register("talep_turu")} mb={2} placeholder='Talep Türünü Seçiniz'>
                            {
                                talepTuru.map((item, i) => (
                                    <option key={i} value={item.name}>{item.name}</option>
                                ))
                            }
                        </Select>
                        <Textarea {...register("aciklama")} placeholder='Talep edilen içeriği yazınız' />
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
    )
}

export default AddModal