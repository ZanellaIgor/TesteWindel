//stiles
import styles from "./RenderListProducts.module.css"
import {
    Input, Flex, FormLabel, Heading, Image, Box, Spacer, Button, CircularProgress, CircularProgressLabel, Center, Alert, AlertIcon
} from '@chakra-ui/react'

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


//icons

import { RiDeleteBin7Fill } from 'react-icons/ri';

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

    //load
    const [load, setLoad] = useState(true)

    //alert
    const [showAlert, setShowAlert] = useState(false);

    const handlePageChange = (pageNumber) => {
        setLoad(true);
        setCurrentPage(pageNumber);
        inputRef.current.focus();
        setOrderedProducts("")
    };
    //const sortedProducts = produtos.sort((a, b) => a.name.localeCompare(b.name));

    const totalPages = filterProduct.length > 0 ? Math.ceil(filterProduct.length / PAGE_SIZE) : Math.ceil(totalProducts / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const productsToDisplay = filterProduct.length > 0 ? (filterProduct.slice(startIndex, startIndex + PAGE_SIZE)) : (produtos);

    // const totalPages = filterProduct.length >1 ? Math.ceil(filterProduct.length / PAGE_SIZE) : Math.ceil(produtos.length / PAGE_SIZE);
    // const startIndex = (currentPage - 1) * PAGE_SIZE;
    // const productsToDisplay = filterProduct.length >1 ? (filterProduct.slice(startIndex, startIndex + PAGE_SIZE)) : (produtos.slice(startIndex, startIndex + PAGE_SIZE));


    //ordenacao
    const [orderedProducts, setOrderedProducts] = useState([]);

    //condição de render
    const produtosRender = (orderedProducts.length > 0) ? orderedProducts : productsToDisplay

    const orderBy = (field, order) => {
        const sortedProducts = [...productsToDisplay].sort((a, b) => {
            if (field === 'valorVenda') {
                return order === 'asc' ? parseFloat(a.valorVenda - b.valorVenda) : parseFloat(b.valorVenda - a.valorVenda);
            }
            if (field === 'estoque') {
                return order === 'asc' ? a.estoque - b.estoque : b.estoque - a.estoque;
            }
            return 0;
        });
        setOrderedProducts(sortedProducts);
    };


    const handleSort = (field) => {
        const isAsc = orderedProducts.length > 0 && orderedProducts[0][field] < orderedProducts[orderedProducts.length - 1][field];
        const order = isAsc ? 'desc' : 'asc';
        orderBy(field, order);
    };


    /*onClick={() => handleSort('valorVenda')}*/
    // URL
    const baseURL = "https://homologacao.windel.com.br:3000/teste-front"

    const inputRef = useRef(null)

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

    }, [currentPage], [produtos]);

    useEffect(() => {
        filterProducts();
        setOrderedProducts("")
        setCurrentPage(1);
    }, [desc, ref, fab])


    function filterProducts() {
        const filterProduct = productsFilter.filter((produto) => {
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
        inputRef.current.focus()
        setDesc('')
        setFab('')
        setRef('')
        setOrderedProducts("")
    }

    //Deletar Produto
    function deleteProdutos(id) {
        if (window.confirm('Tem certeza que deseja deletar este Produto?')) {

            axios.delete(`${baseURL}/${id}`)
                .then(response => {
                    console.log(response.data)
                    inputRef.current.focus()
                    setProdutos(produtos.filter(produto => produto.id !== id))
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false)
                    }, 10000);
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <Box>
            <Flex justifyContent='space-between' m='10px' p='10px'>
                <Heading as='h3'>Produtos:</Heading>
                <Link to='/Produtos/Criar_Produto'><Button colorScheme='green'>Adicionar Produto</Button></Link>
            </Flex>

            <Flex
                justifyContent='space-between'
                border='1px solid black'
                borderRadius='lg'
                m='10px'
                p='10px'>

                <FormLabel maxW='312px'>
                    Descrição:
                    <Input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} ref={inputRef} />
                </FormLabel>
                <FormLabel maxW='312px'>
                    Referência:
                    <Input type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
                </FormLabel>
                <FormLabel maxW='312px'>
                    Fabricante:
                    <Input type="text" value={fab} onChange={(e) => setFab(e.target.value)} />
                </FormLabel>

                <Button mt='22px' onClick={clearFilter} colorScheme='red'>Limpar Filtros</Button>

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
                <table width="100%" tableLayout="auto"
                >
                    <thead className={styles.containerHead}>
                        <tr className={styles.containerCabecalho}>
                            <th >Imagem</th>
                            <th>Nome do Produto</th>
                            <th>Referência</th>
                            <th onClick={() => handleSort('valorVenda')}> <span> Valor de Venda</span></th>
                            <th>Fabricante</th>
                            <th onClick={() => handleSort('estoque')}>Estoque</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showAlert && (
                            <Alert status="success" mb={4}>
                                <AlertIcon />
                                Produto deletado com sucesso!
                            </Alert>
                        )}
                        {/* {(orderedProducts.length > 0 ? orderedProducts : productsToDisplay).map(produto => ( */}
                        {produtosRender.map(produto => (
                            <tr className={styles.containerProduto}
                                key={produto.id}
                            >
                                <td><Image src={produto.imagemProduto} alt="Imagem do Produto" h='64px' w='64px' /></td>
                                <td maxLength='6'>{produto.nome}</td>
                                <td>{produto.referencia}</td>
                                <td>R$ {parseFloat(produto.valorVenda).toFixed(2)}</td>
                                <td>{produto.fabricante}</td>
                                <td className={styles.tdValor}>{produto.estoque} {produto.unidadeMedida}</td>
                                <td><Flex alignItems="center">
                                    <Link to={`/Produtos/Editar_Produto/${produto.id}`}>
                                        <FiEdit style={{ width: '22px', height: '22px', color: 'brown', margin: '5px' }} />
                                    </Link>
                                    <RiDeleteBin7Fill style={{ width: '22px', height: '22px', color: 'red', pd: '5px', cursor: 'pointer' }} onClick={() => deleteProdutos(produto.id)} />
                                    <Spacer />
                                </Flex>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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