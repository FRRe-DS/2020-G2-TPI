import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Logo from "./img/ministerio-logo.png"

class Header extends Component {
  render() {
    return (
      <Container fluid className="header">
        <Navbar expand="lg" >
          
          <Navbar.Brand href="/centrosmedicos" className="container-foto-head">
          <img src={Logo} width="200" height="50" alt="logo-ministerio" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
