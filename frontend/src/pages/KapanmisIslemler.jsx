import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Button, Tfoot, useDisclosure } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getRequests } from '../api';
import { getUserId } from '../config';
import InfoModal from '../components/Modal/InfoModal';

const KapanmisIslemler = () => {
    const userID = getUserId();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);
    const [selectedRequest, setSelectedRequest] = React.useState({});
    const { data, isLoading } = useQuery("getRequests", getRequests);

    const showInformation = (item) => {
        onOpen();
        setSelectedRequest(item)
    }

    if (isLoading) {
        return <div>Yükleniyor</div>
    }

    console.log(data);

    return (
        <Box p={2}>
            <InfoModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} selectedRequest={selectedRequest} />
            <Heading as="h3" fontSize="2xl" mb={4} borderBottom="1px solid gray">Kapanmış İşlemler</Heading>
            <TableContainer>
                <Table variant='striped' colorScheme='gray' size="sm">
                    <TableCaption>Cevaplanmış talepleriniz burada listelenir!</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Talep Türü</Th>
                            <Th>Açıklama</Th>
                            <Th>Durum</Th>
                            {
                                userID === 1 ? <Th>Talep Eden</Th> : null
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            userID === 1 ? data.map((item, key) => (
                                <Tr key={key}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>
                                        <Button onClick={() => showInformation(item)} size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                                    </Td>
                                    {
                                        userID === 1 ? <Td>{item.kullanici_adi}</Td> : null
                                    }
                                </Tr>
                            )) : data.filter(x => x.talep_eden_id === userID).map((item, key) => (
                                <Tr key={key}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>
                                        <Button onClick={() => showInformation(item)} size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                                    </Td>
                                    {
                                        userID === 1 ? <Td>{item.kullanici_adi}</Td> : null
                                    }
                                </Tr>
                            ))
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td>Toplam</Td>
                            <Td>{userID === 1 ? data.length : data.filter(x => x.talep_eden_id === userID).length}</Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default KapanmisIslemler