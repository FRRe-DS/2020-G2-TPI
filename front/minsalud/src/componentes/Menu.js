import React, { Fragment } from "react";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './css/menu.css';
const Menu = () => {
    return ( 
    <div className="menu">
    <Nav defaultActiveKey="/peticiones" className="flex-column">
    <div>Menu</div>
    <Nav.Link href="/centrosmedicos" className="menu-item">Centros Hospitalarios</Nav.Link>
    <Nav.Link href="/recursos" className="menu-item">Recursos disponibles</Nav.Link>
    <Nav.Link href="/historial" className="menu-item">Historial de envios</Nav.Link>
    <NavDropdown title="Peticiones" id="nav-dropdown" >
        <NavDropdown.Item className="menu-item-drop" href="/peticiones">Notificaciones</NavDropdown.Item>
        <NavDropdown.Item className="menu-item-drop" href="/gestion-envios">Gestion</NavDropdown.Item>
    </NavDropdown>
    

  </Nav> 
  </div>
  );
}
 
export default Menu;