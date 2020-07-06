import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserImg from './img/usuario.png'
import Container from "react-bootstrap/Container";
import Logo from "./img/ministerio-logo.png"

class Header extends Component {
  render() {
    return (
      <Container fluid className="header">
        <Navbar expand="lg" >
          
          <Navbar.Brand href="/home" className="container-foto-head">
          <img src={Logo} width="200" height="50" alt="logo-ministerio" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            
            <img src={UserImg} width="50" height="50"  alt="logo-ministerio" />
            
              <Button variant="outline-light">Cerrar sesion</Button>
            
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
