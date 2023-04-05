import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, useNavigate } from "react-router-dom";
import logo from './thriftitlogo.png';
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

import { auth } from "../Config/Firebase";

import BrowseThriftShops from "./pages/ThriftShop/BrowseThriftShops";
import Cart from "./pages/Cart/Cart2";
import Settings from "./pages/Settings/Settings";
import SearchBar from "./pages/SearchClothes/SearchClothes";
import BrowseProducts from "./pages/Products/BrowseProducts";

const PortalNavbar = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        auth.signOut()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
        }

    return (
        <React.Fragment>
        <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="/home"><img src={logo} className="img-responsive" height="72" /></Navbar.Brand>
            {/* <Navbar.Brand href="/home">ThriftIt</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                    <Nav.Link href="/home">Home</Nav.Link>
                    
                    <Nav.Link href="/thriftshops" element = {<BrowseThriftShops />}>Browse Thrift Shops</Nav.Link>
                    <Nav.Link href="/products" element = {<BrowseProducts />}>Browse Products</Nav.Link>
                </Nav>
                <Nav>    
                    <Nav.Link href="/cart" element = {<Cart />}><BsFillCartFill size={24} /></Nav.Link>
                    <Nav.Link href="/settings" element = {<Settings />}><BsPersonCircle size={24} /></Nav.Link>
                    <Nav.Link>
                        <Button className="back_button" onClick={logout}>Logout
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

    
    </React.Fragment>

    );
}

export default PortalNavbar;
