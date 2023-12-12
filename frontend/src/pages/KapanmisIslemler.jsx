import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { getRequests } from '../api';
import { getUserId } from '../config';

const KapanmisIslemler = () => {
    const userID = getUserId();
    const { data, isLoading } = useQuery("getRequests", getRequests);
    if (isLoading) {
        return <div>Yükleniyor</div>
    }

    return (
        <Box p={2}>
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
                            data.map((item, key) => (
                                <Tr key={key}>
                                    <Td>{item.talep_turu}</Td>
                                    <Td>{item.aciklama}</Td>
                                    <Td>
                                        <Button size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                                    </Td>
                                    {
                                        userID === 1 ? <Td>{item.kullanici_adi}</Td> : null
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

export default KapanmisIslemler