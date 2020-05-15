import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Centro from './Centro';

class TablaCentros extends Component{
    render(){
        return <Table striped bordered hover className="tabla-centros table table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.centros.map( centro => <Centro centro={centro} key={centro.idCentro}/>)
        }
        </tbody>
      </Table>
    }
}

export default TablaCentros;