'use client'
import React, { useEffect } from 'react';
import MainContainer from './components/containers/MainContainer';
import TransitionPage from './components/containers/TransitionPage';
import Header from './components/header/Header';
import ProductsMainSection from './components/ProductsMainSectio';
import PromocionesSection from './components/promociones/PromocionesSection';
import { useProductStore } from './store/productsStore';

const Home = ({seller}:{seller:string}) => {
    const { products, initialCharge } = useProductStore()
    
    useEffect(() => {
        if (!products.length) {
            initialCharge(seller)
        }
    }, [])


    return (
        <div>
            <MainContainer>
                <TransitionPage />
                <Header />
                <PromocionesSection />
                <ProductsMainSection />
            </MainContainer>
        </div>
    );
};

export default Home;