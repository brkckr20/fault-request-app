import React from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const PasswordInput = ({ register }) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size='md' mt={2}>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Şifrenizi giriniz!'
                bg="white"
                {...register("sifre")}

            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordInput