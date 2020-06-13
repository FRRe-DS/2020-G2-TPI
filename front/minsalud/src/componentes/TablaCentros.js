import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import Centro from './Centro';

class TablaCentros extends Component{
  constructor(props) {
		super(props);
		this.state = {
      centrosAPI: ""
    }}


    traerData(){
    const url = `${this.props.url}CentrosHospitalarios`;
    fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"
      }
    }).then(resp=>resp.json())
    .then(data => this.setState({centrosAPI: data}))
  
  }

      
      
  render() {
      if(!this.state.centrosAPI){
        this.traerData()
        console.log(this.state.centrosAPI)
      }
        return(
          <Table striped bordered hover className="tabla-centros table table-dark">
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
         //this.state.centrosAPI.map( centro => <Centro centro={centro} key={centro.idCentro}/>)
        }
        </tbody>
      </Table>
        )}
      
      }

  
export default TablaCentros;