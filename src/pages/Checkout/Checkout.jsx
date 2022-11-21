import React from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    margin-top: 2rem;
    
    &:hover {
      background-color: #f8f4f4;
    }
`;

const Checkout = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const amount = urlParams.get('amt');
    const cproductTitle = urlParams.get('name');

    const handleClick = async (e) => {
        e.preventDefault();

        const userName = localStorage.getItem("userName")
        const email = localStorage.getItem("email")


        const res = await fetch("http://localhost:8080/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount, productId, cproductTitle, userName, email
            })
        })
        const result = await res.json();

        if (result.message == "Payment Successfull") {
            navigate("/order", { replace: true })
        }
    }

    useEffect(() => {
        const access = localStorage.getItem("token");
        if (!access) {
            navigate("/login", { replace: true })
        }
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignContent: "center" }}>
                <div>
                    <img src="src/assets/upi_1668959799044.png" alt="img" style={{ width: "85%", height: "75vh", marginTop: "2rem" }} />
                    <p style={{ fontWeight: "bold" }}>After Successful payment send the screenshot of payment to 1234567890.</p>
                    <Button onClick={handleClick}>Confirm Order</Button>
                </div>
            </div>
        </>
    )
}

export default Checkout