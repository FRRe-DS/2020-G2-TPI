import React, {Component} from 'react';

class Peticion extends Component {
    render() {
    let idCentro, nombre, recurso, cantidad; 
  
      return (
        <tr>
          <td>{idCentro}</td>
          <td>{nombre}</td>
          <td>{recurso}</td>
          <td>{cantidad}</td>
        </tr>
      );
    }
  
  }
  
  export default Peticion;