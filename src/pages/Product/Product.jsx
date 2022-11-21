import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Button = styled.a`
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

const Product = () => {
  const navigate = useNavigate();
  const [link, setlink] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const id = location.pathname.split("/")[2];

    const getProduct = async () => {
      const res = await fetch("http://localhost:8080/getProductById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      })

      const result = await res.json();
      const data = result.product;
      setProduct(data)
      setlink(`/checkout?id=${data._id}&amt=${data.price}&name=${data.title.replaceAll(' ', '')}`)
    }

    const getProductById = async (id) => {
      const res = await fetch("http://localhost:8000/getCourseById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      })
  
      const result = await res.json();
      const data = result.course;
      
    }

    getProduct();
    getProductById();
  }, []);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.productImage} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>RS {product.price}</Price>
          <AddContainer>
            <Button style={{ textDecoration: "none", color: "black" }} href={link}>BUY NOW</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
