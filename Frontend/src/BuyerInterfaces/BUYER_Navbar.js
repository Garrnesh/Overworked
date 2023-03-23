import {LinkContainer} from 'react-router-bootstrap'
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../logo.png';
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import SearchBarSection from './BUYER_SearchBarSection';

const Navibar = () => {
  return (
<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><Image src = {logo} className = "img-responsive" height = "72" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="links">
          <Nav className="me-auto">

            <Nav.Link href="/">Home</Nav.Link>

            <LinkContainer to = '/donationpoints'>
            <Nav.Link>Browse Donation Points</Nav.Link>
            </LinkContainer>

            <LinkContainer to = '/thriftshops'>
            <Nav.Link>Browse Thrift Shops</Nav.Link>
            </LinkContainer>
          </Nav>
          </div>
          {/* insert search bar */}
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for clothes"
              className="me-2"
              aria-label="Search"
              // onChange = {(event) => setSearchTerm(event.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          {/* <SearchBarSection /> */}
          <LinkContainer to = '/search'>
            <Nav.Link>Search clothes</Nav.Link>
            </LinkContainer>
          <Nav className="me-auto">
            <Nav.Link href="#Cart"><BsFillCartFill size = {24}/></Nav.Link>
            <Nav.Link href="#Login"><BsPersonCircle size = {24}/></Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;