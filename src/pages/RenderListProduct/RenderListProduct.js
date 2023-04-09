import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Flex,
    FormLabel,
    Heading,
    Image,
    Box,
    Spacer,
    Button,
    CircularProgress, CircularProgressLabel, Center
} from '@chakra-ui/react'

import React, { useEffect, useState } from "react";
import axios from "axios";


//icons
import { BsFillGridFill } from 'react-icons/bs';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { FaListUl } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;

const RenderListProduct = () => {

    const [produtos, setProdutos] = useState([]);
    const [desc, setDesc] = useState("");
    const [ref, setRef] = useState("");
    const [fab, setFab] = useState("");

    //Filter dos produtos
    const [filterProduct, setFilterProduct] = useState([])
    const [productsFilter, setProductsFilter] = useState([])
    //Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState("");


    const [load, setLoad] = useState(true)
    const baseURL = "https://homologacao.windel.com.br:3000/teste-front"

    const handlePageChange = (pageNumber) => {
        setLoad(true)
        setCurrentPage(pageNumber);
    };
    //const sortedProducts = produtos.sort((a, b) => a.name.localeCompare(b.name));

    const totalPages = filterProduct.length > 0 ? Math.ceil(filterProduct.length / PAGE_SIZE) : Math.ceil(totalProducts / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const productsToDisplay = filterProduct.length > 0 ? (filterProduct.slice(startIndex, startIndex + PAGE_SIZE)) : (produtos);

    // const totalPages = filterProduct.length >1 ? Math.ceil(filterProduct.length / PAGE_SIZE) : Math.ceil(produtos.length / PAGE_SIZE);
    // const startIndex = (currentPage - 1) * PAGE_SIZE;
    // const productsToDisplay = filterProduct.length >1 ? (filterProduct.slice(startIndex, startIndex + PAGE_SIZE)) : (produtos.slice(startIndex, startIndex + PAGE_SIZE));


    //ordenacao


    useEffect(() => {
        axios.all([
            axios.get((`${baseURL}/pagination/${currentPage}`)),
            axios.get((`${baseURL}/count`)),
            axios.get(`${baseURL}`)

        ])
            .then(axios.spread((responseData, responseCount, responseDataFilter) => {
                setProdutos(responseData.data)
                setTotalProducts(responseCount.data)
                setProductsFilter(responseDataFilter.data)
                setLoad(false)

            }))
            .catch((error) => {
                console.error(error);
            });

    }, [currentPage]);

    // useEffect(() => {
    //        axios.get(`${baseURL}/pagination/${currentPage}`)
    //         .then((response) => {
    //             setProdutos(response.data)
    //             setTotalProducts(response.data)
    //             setLoad(false)
    //             //count()
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });

    // }, []);



    useEffect(() => {
        filterProducts();
        setCurrentPage(1);
    }, [desc, ref, fab])

    function filterProducts() {
        const filterProduct = productsFilter.filter((produto) => {
            // if (desc === "" && ref === "" && fab === "") {
            //     return false;
            // }
            if (desc && !produto.nome.toLowerCase().includes(desc.toLowerCase())) {
                return false;
            }
            if (ref && !produto.referencia.toLowerCase().includes(ref.toLowerCase())) {
                return false;
            }
            if (fab && !produto.fabricante.toLowerCase().includes(fab.toLowerCase())) {
                return false;
            }
            return true;
            
        });
        setFilterProduct(filterProduct);
    }
    const clearFilter = () => {
        setDesc('')
        setFab('')
        setRef('')
    }

    //Deletar Produto
    function deleteProdutos(id) {
        if (window.confirm('Tem certeza que deseja deletar este Produto?')) {
            console.log(baseURL)
            axios.delete(`${baseURL}/${id}`)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <Box
        >
            <Flex justifyContent='space-between' m='10px' p='10px'>
                <Heading as='h3'>Produtos:</Heading>
                <Link to='/Produtos/Criar_Produto'><Button>Adicionar Produto</Button></Link>
            </Flex>
            <Flex
                justifyContent='space-between'
                border='1px solid black'
                borderRadius='lg'
                m='10px'
                p='10px'>

                <FormLabel w='312px'>
                    Descrição:
                    <Input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </FormLabel>
                <FormLabel w='312px'>
                    Referência:
                    <Input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                </FormLabel>
                <FormLabel w='312px'>
                    Fabricante:
                    <Input type="text" value={fab} onChange={(e) => setFab(e.target.value)} />
                </FormLabel>

                <Button mt='22px' onClick={clearFilter}>Limpar Filtros</Button>
            </Flex>

            {load && <Center>
                <CircularProgress isIndeterminate color='green.300' size='250px'>
                    <CircularProgressLabel>Aguarde</CircularProgressLabel>
                </CircularProgress>
            </Center>}
            {!load && <Box
                border='1px solid black'
                borderRadius='lg'
                m='10px'
                p='10px'
            >
                <Table
                >
                    <Thead>
                        <Tr>
                            <Th >Imagem</Th>
                            <Th>Nome do Produto</Th>
                            <Th>Referência</Th>
                            <Th /*onClick={() => ordernar(This, true)}*/> <span> Valor de Venda</span></Th>
                            <Th>Fabricante</Th>
                            <Th /*onClick={() => ordernar(This, true)}*/>Estoque</Th>
                            <Th> <FaListUl /> <BsFillGridFill /> </Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {productsToDisplay.map(produto => (
                            <Tr
                                key={produto.id}

                                borderRadius='8px'
                                _hover={{
                                    bg: 'cyan.400',
                                    color: 'white',
                                    bd: "lg",
                                }}
                            >
                                <Td><Image src={produto.imagemProduto} alt="Imagem do Produto" h='64px' w='64px' /></Td>
                                <Td>{produto.nome}</Td>
                                <Td>{produto.referencia}</Td>
                                <Td>{produto.valorVenda}</Td>
                                <Td>{produto.fabricante}</Td>
                                <Td>{produto.estoque} {produto.unidadeMedida}</Td>
                                <Td><Flex alignItems="center">
                                    <Link to={`/Produtos/Editar_Produto/${produto.id}`}>
                                        <FiEdit style={{ width: '22px', height: '22px', color: 'brown', margin: '5px' }} />
                                    </Link>
                                    <RiDeleteBin7Fill style={{ width: '22px', height: '22px', color: 'red', pd: '5px', cursor: 'pointer' }} onClick={() => deleteProdutos(produto.id)} />
                                    <Spacer />
                                </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <div>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button key={page}
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}>
                            {page}
                        </Button>
                    ))}
                </div>
            </Box>}
        </Box>
    )
}

export default RenderListProduct