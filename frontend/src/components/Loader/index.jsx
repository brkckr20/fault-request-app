import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
    return (
        <Box backgroundColor="rgb(91, 44, 64)" w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
            <Spinner color='white' />
        </Box>
    )
}

export default Loader