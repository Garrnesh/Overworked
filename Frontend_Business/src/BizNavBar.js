import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, useNavigate } from "react-router-dom";
import logo from './thriftCrop.png';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



import { auth } from "./Config/Firebase";

import AddNewListing from "./AddNewListing";
import BizViewListing from "./BizViewListing";

const BizNavBar = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        auth.signOut()
            .then(() => {
                localStorage.removeItem("username");
                localStorage.removeItem("authenticated");
                navigate("/");
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
                    <Nav.Link href="/addnewlisting" element = {<AddNewListing />}>Add New Listing</Nav.Link>
                    <Nav.Link href="/viewlisting" element = {<BizViewListing />}>View Listings</Nav.Link>
                </Nav>
                <Nav>
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

export default BizNavBar;
