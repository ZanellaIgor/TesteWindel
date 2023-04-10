import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormLabel, Input, Box, FormControl, Button, Flex, Spacer, Heading, Image, Alert, AlertIcon } from '@chakra-ui/react'


const EditProduct = () => {
    const [descProduto, setDescProduto] = useState("");
    const [vlrVenda, setVlrVenda] = useState("");
    const [refProduto, setRefProduto] = useState("");
    const [un, setUn] = useState("");
    const [fabProduto, setFabProduto] = useState("");
    const [estoqueProduto, setEstoqueProduto] = useState("");
    const [imagem, setImagem] = useState("");

    const { id } = useParams();
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("");

    const alterInputsProducts = (produtos) => {
        const produto = produtos
        setDescProduto(produto.nome)
        setVlrVenda(produto.valorVenda)
        setRefProduto(produto.referencia)
        setUn(produto.unidadeMedida)
        setFabProduto(produto.fabricante)
        setEstoqueProduto(produto.estoque)
        setImagem(produto.imagemProduto)
        return produto
    }

    const handleEditProduct = () => {
        if (produto.nome.length == 0 || produto.nome.length >= 60) {
            return setError("O campo deve Descrição do Produto deve conter entre 1 a 60 caracteres")
        }
        if (produto.valorVenda.length == 0 || isNaN(produto.valorVenda)) {
            return setError("Favor informar o Valor de Venda")
        }
        if (produto.unidadeMedida.length == 0) {
            return setError("O campo Unidade de medida não ser cadastrado em branco")
        }
        if (produto.estoque.length == 0 || isNaN(produto.estoque)) {
            return setError("O campo Estoque não deve ir vazio")
        }
        setError("")

        
        axios.patch(`${baseURL}/${id}`, produto)
            .then(response => {
                console.log(response)
                setShowAlert(true)
                setTimeout(() => {
                    navigate("/Produtos")
                }, 1000);
            })
            .catch(error => {
                setError(error)
            })
        
    }
    const produto = {
        nome: descProduto,
        valorVenda: parseFloat(vlrVenda),
        referencia: refProduto,
        unidadeMedida: un,
        fabricante: fabProduto,
        estoque: parseInt(estoqueProduto),
        imagemProduto: imagem,
    }


    const baseURL = "https://homologacao.windel.com.br:3000/teste-front"

    useEffect(() => {
        axios.get(`${baseURL}/${id}`)
            .then((response) => {
                const produtos = response.data
                alterInputsProducts(produtos)
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <Flex
            flexDirection='column'
            padding='10px'
            
        >
            <Heading as='h3' m='10px'
                p='10px'>Edite seu produto:</Heading>
            <Flex
                justifyContent='space-between'
                border='1px solid black'
                borderRadius='lg'
                m='10px'
                p='10px'>


            <form
                style={{ display: "flex", flexWrap: "wrap", alignItems: 'space-around'}}>

                <FormLabel
                    width='312px'
                >
                    Descrição do Produto:
                    <Input
                        type="text"
                        onChange={(e) => setDescProduto(e.target.value)}
                        value={descProduto}
                    />
                </FormLabel>
                <FormLabel
                    width='312px'>
                    Valor de Venda:
                    <Input type="number"
                        step="0.01"
                        onChange={(e) => setVlrVenda(e.target.value)}
                        value={vlrVenda}
                    />
                </FormLabel>
                <FormLabel
                    width='312px'>
                    Referência:
                    <Input
                        type="text"
                        onChange={(e) => setRefProduto(e.target.value)}
                        value={refProduto}
                    />
                </FormLabel>
                <FormLabel
                    width='312px'>
                    Unidade de Medida:
                    <Input
                        type="text"
                        onChange={(e) => setUn(e.target.value)}
                        value={un}
                        required
                    />
                </FormLabel>
                <FormLabel
                    width='312px'>
                    Fabricante:
                    <Input
                        type="text"
                        onChange={(e) => setFabProduto(e.target.value)}
                        value={fabProduto}
                    />
                </FormLabel>
                <FormLabel
                    width='312px'>
                    Estoque Atual:
                    <Input
                        type="number"
                        onChange={(e) => setEstoqueProduto(e.target.value)}
                        value={estoqueProduto}
                    />
                </FormLabel>
                <FormLabel
                    width='635px'
                >Informe o Link da Imagem:
                    <Input
                        type="url"
                        onChange={(e) => setImagem(e.target.value)}
                        value={imagem} />
                </FormLabel>
                {/*{error && <p>{error}</p>}*/}
                <FormControl
                    display='flex'
                    justifyContent="space-between">
                    <Button alignSelf="flex-end" type='button' onClick={handleEditProduct} colorScheme='green'>Editar</Button>
                </FormControl>
               
                {error && <Alert status='error' mb={4}>
                        <AlertIcon /> {error}
                    </Alert>}
                    {showAlert && (
                        <Alert status="success" mb={4}>
                            <AlertIcon />
                            Produto criado com sucesso!
                        </Alert>
                    )}
                
            </form>
            <Image 
                display='flex'
                src={produto.imagemProduto} boxSize='200px' 
                border='1px solid black'
                borderRadius='8px'
                justifyContent='center'
                />
            </Flex>

        </Flex>
    )
}

export default EditProduct