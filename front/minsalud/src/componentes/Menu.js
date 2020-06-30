import React from "react";
import Nav from 'react-bootstrap/Nav'
import './css/menu.css';

const Menu = () => {
    return ( 
    <div className="menu">
    <Nav className="flex-column">
    <div><h3>Menu</h3></div>
    <Nav.Link href="/centrosmedicos" className="menu-item">Centros Hospit.</Nav.Link>
    <Nav.Link href="/recursos" className="menu-item">Recursos disponibles</Nav.Link>
    
    <Nav.Link href="/peticiones" className="menu-item">Gestion de peticiones</Nav.Link> 
    <Nav.Link href="/historial" className="menu-item">Historial de envios</Nav.Link>
    
    

  </Nav> 
  </div>
  );
}
 
export default Menu;