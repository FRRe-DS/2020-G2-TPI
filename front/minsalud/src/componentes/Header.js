import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";


class Header extends Component {
  render() {
    return (
      <Container fluid className="header">
        <Navbar expand="lg" >
          
          <Navbar.Brand href="#home">Ministerio de Salud</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/otra-url">Link</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
