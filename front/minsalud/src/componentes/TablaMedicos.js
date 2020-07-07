import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Medico from './Medico'

class TablaRecursos extends Component{
  constructor(props) {
		super(props);
		this.state = {
      medicos: []
    }}


    traerData(){
    const url = `${this.props.url}medicos`;
    fetch(url, {
      method: "GET"
    }).then(resp=>resp.json())
    .then(meds => this.setState({medicos: meds[0].Medicos}))
  
  }
  //se usa este hook para poder colocar los datos despues del renderizado
  componentDidMount() {
    if(this.state.medicos.length ===0 ){
      this.traerData()
    }
  }   
  render(){
        
        return (
          <>
        <Table striped bordered hover className="tabla-centros table table-dark">
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>Cantidad disponible</th>
          </tr>
          </thead>
            <tbody>
            {
              //Parseo para escribir atributos y valores sin estructura definida
                Object.keys(this.state.medicos).map((med)=><Medico especialidad={this.state.medicos[med].especialidad} cantidad={this.state.medicos[med].cantidad} />)
            }
        </tbody>
          
        
        <tbody>
        
        </tbody>
      </Table>
      </>
      )
    }
}

export default TablaRecursos;