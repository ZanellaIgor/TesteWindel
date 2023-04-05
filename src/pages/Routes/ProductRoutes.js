import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../components/About';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import CreateProduct from '../CreateProduct/CreateProduct';
import EditProduct from '../EditProduct/EditProduct';
import RenderListProduct from '../RenderListProduct/RenderListProduct';

const ProductRoutes = () => {

    return (
        <BrowserRouter>
            <Grid
                h="100vh"
                templateRows="auto 1fr auto"
                templateColumns="180px auto"
                
            >
                <GridItem rowSpan={1} colSpan={2} bg = ' #B8D6FF '>
                    <Header />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} bg = ' #B8D6FF ' border='1px solid #B8D6FF' >
                    <Navbar/>
                </GridItem>
              
               
                <GridItem rowSpan={1} colSpan={1}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/About' element={<About />} />
                        <Route path='/Produtos' element={<RenderListProduct />} />
                        <Route path='/Produtos/Criar_Produto' element={<CreateProduct />} />
                        <Route path='/Produtos/Editar_Produto/:id' element={<EditProduct />} />
                    </Routes>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <Footer />
                </GridItem>
            </Grid>
        </BrowserRouter>
    )
}

export default ProductRoutes
