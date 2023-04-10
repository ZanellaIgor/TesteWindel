import {useState, useEffect} from 'react'

const DashboardProdutos = () => {
    const baseURL = "https://homologacao.windel.com.br:3000/teste-front"
   
    useEffect(() => {
        axios.get(`${baseURL}`)
            .then((response) => {
                const produtos = response.data
                alterInputsProducts(produtos)
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);
    return (

        <div>
            <h3>Valores totais para vendas</h3>
            
        </div>
    )
}

export default DashboardProdutos