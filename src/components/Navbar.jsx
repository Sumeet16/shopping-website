import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  height: 60px;
  margin-bottom: 2rem;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")

  const signOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    localStorage.removeItem("userName");
    navigate("/", { replace: true })

    window.reload();
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}><Logo>YOURCHOICE.</Logo></Link>
        </Left>
        <Right>
          {!userId ?
            <>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/register"}><MenuItem>REGISTER</MenuItem></Link>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/login"}><MenuItem>LOGIN</MenuItem></Link>
            </> :
            <>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/products"}><MenuItem>PRODUCT</MenuItem></Link>
              <Link style={{ textDecoration: "none", color: "black" }} to={"/order"}><MenuItem>MY ORDER</MenuItem></Link>
              <MenuItem onClick={signOutUser}>LOG OUT</MenuItem>
            </>
          }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
