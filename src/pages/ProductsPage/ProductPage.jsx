import React from 'react'
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Products from '../../components/Products';

const ProductPage = () => {
    return (
        <>
            <Navbar />
            <h1 style={{marginLeft: "1rem", marginTop: "3rem", color: "#FF9989"}}>All Products</h1>
            <Products />
            <Footer />
        </>
    )
}

export default ProductPage