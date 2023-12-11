import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Button, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { API, getUserId } from '../config'
import { CiEdit } from "react-icons/ci";
import EditAdminModal from '../components/Modal/EditAdminModal';


const BekleyenTalepler = ({ kullaniciID }) => {
    const [talepler, setTalepler] = React.useState([]);
    const [secilenTalep, setSecilenTalep] = React.useState(0);
    const userID = getUserId();
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    React.useEffect(() => {
        userID === 1 ? axios.get(`${API}/talep`).then(({ data }) => setTalepler(data)) : axios.get(`${API}/talep/${kullaniciID}`).then(({ data }) => setTalepler(data));
    }, [talepler])
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
                            talepler.map((item, i) => (
                                <Tr key={i}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>Bekleniyor</Td>
                                    {
                                        userID == 1 ? (
                                            <React.Fragment>
                                                <Td>
                                                    {item.kullanici_adi}
                                                </Td><Td>
                                                    <Button size="sm" onClick={() => {
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
                </Table>
            </TableContainer>
        </Box>
    )
}

export default BekleyenTalepler