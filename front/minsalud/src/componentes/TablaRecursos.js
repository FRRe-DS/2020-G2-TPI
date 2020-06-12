import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
//import Centro from './Centro';

class TablaRecursos extends Component{
    render(){
        return <Table striped bordered hover className="tabla-centros table table-dark">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Cantidad</th>

          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </Table>
    }
}

export default TablaRecursos;