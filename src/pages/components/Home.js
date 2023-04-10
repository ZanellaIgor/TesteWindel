import { ListItem, List, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (

        <Flex
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg='gray.200'
            >
            <List
             m='10px'
             padding='100px'
             border='1px solid black'
             borderRadius='10px'
             bg='white'
            >
                <ListItem
                m='10px'
                padding='10px'
                border='1px solid black'
                borderRadius='6px'
                bg='blue.400'
                >
                    <Link to='/Produtos'>Lista de Produtos</Link>
                </ListItem>
                <ListItem
                 m='10px'
                 padding='10px'
                 border='1px solid black'
                 borderRadius='6px'
                 bg='blue.400'>
                    <Link to='/Produtos/Criar_Produto'>Criar Produto</Link>
                </ListItem>
                
            </List>
        </Flex>
    )
}

export default Home