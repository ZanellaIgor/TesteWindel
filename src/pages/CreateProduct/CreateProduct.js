import { useState } from 'react'
import axios from 'axios'
import { Heading, FormLabel, Input, Box, FormControl, Button, Grid, Flex, Spacer } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
    const [descProduto, setDescProduto] = useState("")
    const [vlrVenda, setVlrVenda] = useState("")
    const [refProduto, setRefProduto] = useState("")
    const [un, setUn] = useState("")
    const [fabProduto, setFabProduto] = useState("")
    const [estoqueProduto, setEstoqueProduto] = useState("")
    const [imagem, setImagem] = useState("")

    const navigate = useNavigate()
    const [error, setError] = useState("");

    const url = "https://homologacao.windel.com.br:3000/teste-front"
    
    const produto = {
        nome: descProduto,
        valorVenda: parseFloat(vlrVenda),
        referencia: refProduto,
        unidadeMedida: un,
        fabricante: fabProduto,
        estoque: parseInt(estoqueProduto),
        imagemProduto: imagem,
    }

    const handleClickForm = () => {
        setError("")
        console.log(produto)

        
        if (produto.nome.length == 0 || produto.nome.length >= 40) {
            return setError("O campo deve Descrição do Produto deve conter entre 1 a 40 caracteres")
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
        console.log('prefeito')
        axios.post(url, produto)
            .then(response => {
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    
    return (
        <Flex
            flexDirection='column'
            padding='10px'
        >
            <Heading as='h3' m='10px'
                p='10px'>Crie seu produto:</Heading>
             <Flex
                justifyContent='space-between'
                border='1px solid black'
                borderRadius='lg'
                m='10px'
                p='10px'>


            <form
                style={{ display: "flex", flexWrap: "wrap", alignItems: 'space-around' }}>

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
                {error && <p>{error}</p>}
                <FormControl
                    display='flex'
                    justifyContent="space-between">
                    <Button alignSelf="flex-end" type='button' onClick={handleClickForm}>Criar</Button>
                </FormControl>
            </form>
            </Flex>

        </Flex>
    )
}

export default CreateProduct