import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Recurso from './Recurso'

class TablaRecursos extends Component{
  constructor(props) {
		super(props);
		this.state = {
      recursos: []
    }}


    traerData(){
    const url = `${this.props.url}recursos`;
    fetch(url, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(recu => this.setState({recursos: recu[0].Recursos}))
  
  }
  //se usa este hook para poder colocar los datos despues del renderizado
  componentDidMount() {
    if(this.state.recursos.length ===0 ){
      this.traerData()
    }
  }   
  render(){
    
        return (
          <>
        <Table striped bordered hover className="tabla-centros table table-dark">
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Cantidad</th>
          </tr>
          </thead>
            <tbody>
            {
              //Parseo para escribir atributos y valores sin estructura definida
                Object.keys(this.state.recursos).map((recu)=><Recurso recurso={recu} cantidad={this.state.recursos[recu]}></Recurso>)
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