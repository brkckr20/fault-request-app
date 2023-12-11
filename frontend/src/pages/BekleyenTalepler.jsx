import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { API } from '../config'
const BekleyenTalepler = ({ kullaniciID }) => {
    const [talepler, setTalepler] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${API}/talep/${kullaniciID}`).then(({ data }) => setTalepler(data));
    }, [talepler])
    return (
        <Box p={2}>
            <Heading as="h3" fontSize="2xl" mb={4} borderBottom="1px solid gray">Bekleyen İşlemler</Heading>
            <TableContainer>
                <Table variant='striped' colorScheme='gray' size="sm">
                    <TableCaption>Cevaplanması beklenen talepleriniz burada listelenir!</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Talep Türü</Th>
                            <Th>Açıklama</Th>
                            <Th>Durum</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            talepler.map(item => (
                                <Tr key={item.id}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>Bekleniyor</Td>
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