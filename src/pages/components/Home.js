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
            backgroundImage="url(https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_960_720.jpg)"
            color='white'
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