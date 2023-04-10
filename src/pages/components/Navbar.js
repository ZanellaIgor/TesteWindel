import { Flex, Spacer, Box, Text, List, ListItem, background } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';

const navItens = [
    {name: 'Home', icon: '', link: '/', },
    {name: 'Criar Produtos', icon: '', link: '/Produtos/Criar_Produto' },
    {name: 'Lista de Produtos', icon: '', link: '/Produtos' },
    {name: 'Grafico', icon: '', link: 'Grafico', },
    {name: 'About', icon: '', link: '/About', },
    {name: 'Sair', icon: '', link: "", },
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
                    <Link  key={navIten.index} to={navIten.link}>
                        <ListItem 
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
