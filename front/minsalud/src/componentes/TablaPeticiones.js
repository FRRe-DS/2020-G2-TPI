import React from 'react';
import Table from 'react-bootstrap/Table';
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