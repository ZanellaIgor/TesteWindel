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
            
            >
            <List
            >
                <ListItem>
                    <Link to='/Produtos'>Lista de Produtos</Link>
                </ListItem>
                <ListItem>
                    <Link to='/Produtos/Criar_Produto'>Criar Produto</Link>
                </ListItem>
                <ListItem>
                </ListItem>
                <ListItem>
                    <Link to='/Produtos/Editar_Produto/:id'>Editar Produto</Link>
                </ListItem>
            </List>
        </Flex>
    )
}

export default Home