import React from 'react'
import { Flex, Box, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { FiPlus } from "react-icons/fi";
import { LuCheck } from "react-icons/lu";
import { CiStopwatch } from "react-icons/ci";
import AddModal from '../components/Modal/AddModal';
import BekleyenTalepler from './BekleyenTalepler';
import KapanmisIslemler from './KapanmisIslemler';
import axios from 'axios';
import { API } from '../config';
import { useParams } from 'react-router-dom'

const Panel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [aktifPencere, setAktifPencere] = React.useState("bekleyentalepler");
    const finalRef = React.useRef(null);
    const { slug } = useParams();
    const [kullaniciAdi, setKullaniciAdi] = React.useState("");
    const goToPage = (pageName) => {
        setAktifPencere(pageName);
    }

    React.useState(() => {
        axios.get(`${API}/kullanici/${slug}`).then(data => {
            setKullaniciAdi(data.data)
            localStorage.setItem('n-user', JSON.stringify(data.data));
        });
    }, [])

    return (
        <React.Fragment>
            <AddModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} goToPage={goToPage} />
            <Flex backgroundColor="rgb(91, 44, 64)" w='100%' h="100%">
                <Box w={300} borderRight="0.2px solid gray" padding="0 18px" flexShrink={0}>
                    <Heading textAlign="center" textColor="white" fontSize="x-large" my={2}>{kullaniciAdi.kullanici_adi}</Heading>
                    <Box mt={4} mb={2}>
                        <Button onClick={() => goToPage("bekleyentalepler")} leftIcon={<CiStopwatch size={24} />} colorScheme='orange' w="100%">Bekleyen İşlemler</Button>
                    </Box>
                    <Box mb={2}>
                        <Button onClick={() => goToPage("kapanmisislemler")} leftIcon={<LuCheck size={24} />} colorScheme='green' w="100%">Kapanmış İşlemler</Button>
                    </Box>
                    <Box visibility={slug === "bcakir" ? "hidden" : "visible"}>
                        <Button onClick={onOpen} leftIcon={<FiPlus size={24} />} colorScheme='twitter' w="100%">Yeni Talep Oluştur</Button>
                    </Box>
                </Box>
                <Box bg="white" w="100%">
                    {
                        aktifPencere === "bekleyentalepler" && <BekleyenTalepler kullaniciID={kullaniciAdi.id} />
                    }
                    {
                        aktifPencere === "kapanmisislemler" && <KapanmisIslemler />
                    }
                </Box>
            </Flex>
        </React.Fragment>
    )
}

export default Panel