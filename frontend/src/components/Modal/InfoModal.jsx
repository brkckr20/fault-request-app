import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, ModalFooter, useDisclosure, Box } from '@chakra-ui/react';
import { talepTuru } from '../../data';
import { useMutation } from 'react-query';
import { postRequest } from '../../api';
import { useForm } from "react-hook-form"
import { dateDiff, getUserId } from '../../config';

const InfoModal = ({ finalRef, isOpen, onClose, selectedRequest }) => {
    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Talep Bilgileri</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box borderBottom="1px solid #ececec">
                        <span>Talep Türü : </span>
                        <span>{selectedRequest.talep_turu}</span>
                    </Box>
                    <Box borderBottom="1px solid #ececec">
                        <span>Açıklama : </span>
                        <span>{selectedRequest.aciklama}</span>
                    </Box>
                    <Box borderBottom="1px solid #ececec">
                        <span>Durum : </span>
                        <span>{selectedRequest.durum}</span>
                    </Box>
                    <Box borderBottom="1px solid #ececec">
                        <span>İşlem Süresi : </span>
                        <span>{selectedRequest.zaman_farki} saat</span>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' onClick={onClose}>Vazgeç</Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}

export default InfoModal