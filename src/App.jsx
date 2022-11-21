import React, { useState } from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom'
import Checkout from './pages/Checkout/Checkout'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import Order from './pages/Order/Order'
import Product from './pages/Product/Product'
import ProductPage from './pages/ProductsPage/ProductPage'
import Register from './pages/Register/Register'


const App = () => {
  return (
    <div className='main-app'>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product/:category' element={<Product />} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order' element={<Order />} />
            <Route path='*' element={<><h1>404 Page Not Found</h1></>} />
          </Routes>
        </>
      </BrowserRouter>
    </div>

  )
}

export default App