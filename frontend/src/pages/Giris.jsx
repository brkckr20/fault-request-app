import React from 'react'
import { Box, Select, Button, Heading, useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from 'react-query';
import { getUsers, login } from '../api';
import Loader from '../components/Loader';
import PasswordInput from '../components/Inputs/PasswordInput';
import { useForm } from "react-hook-form"


const Giris = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const toast = useToast()
    const mutation = useMutation(login, {
        onSuccess(data) {
            console.log(data)
        },
        onError(err) {
            toast({
                title: 'Hata',
                description: err.response.data.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    });

    const handleLogin = (data) => {
        mutation.mutate(data);
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
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Select {...register("kullanici")} onChange={(e) => setSelectedUser(e.target.value)} backgroundColor="white" placeholder='Seçim yapınız'>
                        {
                            data.map((item, i) => (
                                <option key={i} value={item.username}>{item.kullanici_adi}</option>
                            ))
                        }
                    </Select>
                    <PasswordInput mt={2} bg="white" type='password' register={register} />
                    <Button type='submit' /* onClick={() => handleNext(selectedUser)} */ mt={4} w="100%" colorScheme='messenger' size='md'>
                        Devam et
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Giris