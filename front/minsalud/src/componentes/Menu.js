import React, { Fragment } from "react";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './css/menu.css';
const Menu = () => {
    return ( 
    <div className="menu">
    <Nav defaultActiveKey="/peticiones" className="flex-column">
    <div><b>Menu</b></div>
    <Nav.Link href="/centrosmedicos" className="menu-item">Centros Hospitalarios</Nav.Link>
    <Nav.Link href="/recursos" className="menu-item">Recursos disponibles</Nav.Link>
    
    <Nav.Link href="/peticiones" className="menu-item">Gestion de peticiones</Nav.Link> 
    <Nav.Link href="/historial" className="menu-item">Historial de envios</Nav.Link>
    
    

  </Nav> 
  </div>
  );
}
 
export default Menu;