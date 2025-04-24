'use client'

import { useEffect } from "react";
import MainContainer from "./components/containers/MainContainer";
import Header from "./components/header/Header";
import ProductsMainSection from "./components/ProductsMainSectio";
import { useProductStore } from "./store/productsStore";
import TransitionPage from "./components/containers/TransitionPage";





export default function Home() {
  
  
  const { initialCharge, products } = useProductStore()

  useEffect(() => {

    if (!products.length) {
      initialCharge()
    }
    
  }, [])

  
  return (

    <MainContainer>
      <TransitionPage />
      <Header />
      <ProductsMainSection />
    </MainContainer>
  );
}

