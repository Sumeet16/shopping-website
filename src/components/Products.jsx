import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios("http://localhost:8080/getProduct", {
        method: "GET",
      });
      setProducts(res.data.product);
    };
    getProducts();
  }, []);

  return (
    <Container>
      {products.map((elem, index) => {
        return (
          <Product item={elem} key={elem.id} />
        )
      })}
    </Container>
  );
};

export default Products;
