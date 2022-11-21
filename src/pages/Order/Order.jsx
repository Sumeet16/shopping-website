import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    max-width: 320px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
  
    &:hover ${Info}{
      opacity: 1;
    }
`;

const MainContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
`;


const Order = () => {
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [products2, setProduct2] = useState([]);


    const getProduct = async (elem) => {
        const id = elem
        const response = await axios.post("http://localhost:8080/getProductById", {
            id
        })
        setProduct(products => [...products, response.data.product])
    }

    const getProduct2 = async (elem) => {
        const id = elem
        const response = await axios.post("http://localhost:8080/getProductById", {
            id
        })
        setProduct2(products2 => [...products2, response.data.product])
    }

    const getUser = async () => {
        const userName = localStorage.getItem("userName")

        const response = await axios.post("http://localhost:8080/getUser", {
            userName
        })

        const newArray = response.data.user.corder
        newArray.forEach((elem) => {
            getProduct(elem)
        })

        const newArray2 = response.data.user.porder
        newArray2.forEach((elem) => {
            getProduct2(elem)
        })
    }

    useEffect(() => {
        const access = localStorage.getItem("token");
        if (!access) {
            navigate("/login", { replace: true })
        }
        getUser()
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ width: "100%", height: "90vh" }}>
                <h1 style={{ marginLeft: "1rem", marginTop: "3rem" }}>Delivered Order</h1>
                {products.length > 0 ?
                    <>
                        <MainContainer>
                            {products.map((elem, index) => {
                                return (
                                    <>
                                        <Container>
                                            <Circle />
                                            <Image src={elem.productImage} />
                                            <Info>
                                                <Icon>
                                                    <Link to={`/product/${elem._id}`}>
                                                        <SearchOutlined />
                                                    </Link>
                                                </Icon>
                                            </Info>
                                        </Container>
                                    </>
                                )
                            })}
                        </MainContainer>
                    </>
                    : <><p style={{ marginLeft: "1.5rem", marginTop: "3rem" }}>NO PRODUCT AT TIME.</p></>}
                <h1 style={{ marginLeft: "1rem", marginTop: "3rem" }}>On Way Order</h1>
                {products2.length > 0 ?
                    <>
                        <MainContainer>
                            {products2.map((elem, index) => {
                                return (
                                    <>
                                        <Container>
                                            <Circle />
                                            <Image src={elem.productImage} />
                                            <Info>
                                                <Icon>
                                                    <Link to={`/product/${elem._id}`}>
                                                        <SearchOutlined />
                                                    </Link>
                                                </Icon>
                                            </Info>
                                        </Container>
                                    </>
                                )
                            })}
                        </MainContainer>
                        <Footer/>
                    </>
                    : <><p style={{ marginLeft: "1.5rem", marginTop: "3rem" }}>NO PRODUCT AT TIME.</p></>}
            </div>
        </>
    )
}

export default Order