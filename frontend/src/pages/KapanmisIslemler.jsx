import React from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Button } from '@chakra-ui/react'

const KapanmisIslemler = () => {
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
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td>
                                <Button size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td>
                                <Button size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td>
                                <Button size="xs" colorScheme='cyan' textColor="white">Detay</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default KapanmisIslemler