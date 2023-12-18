import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Button, useDisclosure, Tfoot } from '@chakra-ui/react'
import { getUserId } from '../config'
import { CiEdit } from "react-icons/ci";
import EditAdminModal from '../components/Modal/EditAdminModal';
import { useQuery } from 'react-query'
import { getRequests } from '../api';
import Loader from '../components/Loader'


const BekleyenTalepler = () => {
    const [secilenTalep, setSecilenTalep] = React.useState(0);
    const userID = getUserId();
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: taleplerData, isLoading } = useQuery("getRequests", getRequests);

    if (isLoading) {
        return <Loader />
    }

    return (
        <Box p={2}>
            <EditAdminModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} secilenTalep={secilenTalep} />
            <Heading as="h3" fontSize="2xl" mb={4} borderBottom="1px solid gray">Bekleyen İşlemler</Heading>
            <TableContainer>
                <Table variant='striped' colorScheme='gray' size="sm">
                    <TableCaption>Cevaplanması beklenen talepleriniz burada listelenir!</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Talep Türü</Th>
                            <Th>Açıklama</Th>
                            <Th>Durum</Th>
                            {
                                userID == 1 ? (
                                    <React.Fragment>
                                        <Th>Talep Eden</Th>
                                        <Th>İşleme Al</Th>
                                    </React.Fragment>
                                ) : null
                            }

                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            taleplerData.filter(x => x.durum !== "Tamamlandı").map((item, i) => (
                                <Tr key={i}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>{item.durum}</Td>
                                    {
                                        userID == 1 ? (
                                            <React.Fragment>
                                                <Td>
                                                    {item.kullanici_adi}
                                                </Td>
                                                <Td>
                                                    <Button size="xs" onClick={() => {
                                                        setSecilenTalep(item.id);
                                                        onOpen()
                                                    }} colorScheme='green'><CiEdit size={22} /></Button>
                                                </Td>
                                            </React.Fragment>
                                        ) : null
                                    }
                                </Tr>
                            ))
                        }
                    </Tbody>
                    <Tfoot backgroundColor="green" color="white">
                        <Tr>
                            <Td>Bekleyen Toplam : </Td>
                            <Td>{taleplerData.filter(x => x.durum !== "Tamamlandı").length}</Td>
                            <Td></Td>
                            {
                                userID == 1 ? (
                                    <React.Fragment>
                                        <Td></Td>
                                        <Td></Td>
                                    </React.Fragment>
                                ) : null
                            }
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BekleyenTalepler