import { Flex, Spacer, Box, Text, List, ListItem, background } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';

const navItens = [
    { id: 1, name: 'Home', icon: '', link: '/', },
    { id: 2, name: 'Criar Produtos', icon: '', link: '/Produtos/Criar_Produto' },
    { id: 3, name: 'Lista de Produtos', icon: '', link: '/Produtos' },
    { id: 4, name: 'Grafico', icon: '', link: 'Grafico', },
    { id: 5, name: 'About', icon: '', link: '/About', },
    { id: 6, name: 'Sair', icon: '', link: "", },
];

const Navbar = () => {
    return (
        <Flex
        >
            <List
                height='100%'
                width='100%'
                padding='5px'
                margin='5px'
            >
                {navItens.map((navIten) => (
                    <Link to={navIten.link}>
                        <ListItem key={navIten.id}
                            padding='10px'
                            margin='5px'
                            align="left"
                            borderBottom='1px solid black'
                            cursor="pointer"
                            transition='0.8s'
                            _hover={{
                                borderBottom: 'none',
                                bg: 'cyan.400',
                                color: 'white',
                                borderRadius: "lg",
                            }}>
                            {navIten.name}
                        </ListItem>
                    </Link>

                ))}
            </List>

        </Flex >
    );
};

export default Navbar;
