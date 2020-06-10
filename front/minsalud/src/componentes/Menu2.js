import React, { Fragment } from "react";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
const Menu2 = () => {
    return ( 
    
    <Nav defaultActiveKey="/peticiones" className="flex-column">
    <div>Menu</div>
    <Nav.Link href="/home">Centros Hospitalarios</Nav.Link>
    <Nav.Link eventKey="link-1">Recursos disponibles</Nav.Link>
    <Nav.Link eventKey="link-2">Historial de envios</Nav.Link>
    <NavDropdown title="Peticiones" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Notificaciones</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Gestion</NavDropdown.Item>
    </NavDropdown>
    

  </Nav> );
}
 
export default Menu2;