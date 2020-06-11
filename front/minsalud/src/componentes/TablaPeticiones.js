import React from 'react';
import Table from 'react-bootstrap/Table';
import Peticion from './Peticion' //vamos a usar el componente peticion para cargar cada dato de las peticiones en la tabla

const TablaPeticiones = () => {
    return ( <Table striped bordered hover className="tabla-centros table table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Centro Hospitalario</th>
            <th>Recursos</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </Table> );
}
 
export default TablaPeticiones;