import React from 'react'
import { Box, Select, Button, Heading, Input } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getUsers } from '../api';
import Loader from '../components/Loader';

const Giris = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleNext = (slug) => {
        navigate("panel/" + slug);
    }

    const { data, isLoading } = useQuery('kullanicilar', getUsers);

    if (isLoading) {
        return <Loader />
    }

    return (
        <Box backgroundColor="rgb(91, 44, 64)" w='100%' h="100%" display="grid" justifyContent="center" alignItems="center">
            <Box w={600} h={200}>
                <Heading as='h1' mb={2} textAlign="center" textColor="white" size='2xl' noOfLines={1}>
                    NAKOSAN
                </Heading>
                <Heading fontStyle="italic" as='h4' mb={4} textAlign="center" textColor="white" size='lg' noOfLines={1}>
                    Bilgi İşlem
                </Heading>
                <Select onChange={(e) => setSelectedUser(e.target.value)} backgroundColor="white" placeholder='Seçim yapınız'>
                    {
                        data.map((item, i) => (
                            <option key={i} value={item.username}>{item.kullanici_adi}</option>
                        ))
                    }
                </Select>

                <Button isDisabled={selectedUser === null ? true : false} onClick={() => handleNext(selectedUser)} mt={4} w="100%" colorScheme='messenger' size='md'>
                    Devam et
                </Button>
            </Box>
        </Box>
    )
}

export default Giris