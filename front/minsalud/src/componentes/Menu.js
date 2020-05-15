import React, { Fragment } from "react";
import './css/menu.css';

class Menu extends React.Component {
    render() {
        return (
    <div className="Menu">
        <b>Menu</b>
        <ul>
            <li>
            Centros Hospitalarios
            </li>
            <li>
            Recursos Disponibles
            </li>
            <li>
            Peticiones
            <ul>
                <li>Notificaciones</li>
                <li>Gestion</li>
            </ul>
            </li>
            <li>Historial de Envios</li>

        

        </ul>



    </div>  
    );
  }
}
 
export default Menu;