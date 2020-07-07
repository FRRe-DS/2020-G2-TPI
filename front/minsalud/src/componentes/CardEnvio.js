import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import './css/tarjeta.css'

class CardEnvio extends Component {
    constructor(props) {
        super(props);
        this.state = {
      centroHosp: {"nombre":""}
    }
  }

  componentWillMount(){
    const url = `${this.props.url}centroHospitalarioId?idCentro=${this.props.envio.Envio.idCentro}`;
    fetch(url, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
     
    }).then(resp=>resp.json())
    .then(data =>{
      if(data.CentroHospitalario[0] !== undefined){
      this.setState({centroHosp:data.CentroHospitalario[0]}
        )}})
    .catch(error => console.log(error))
      
    }

    render() {
    var fecha = ""
    var hora = ""
    const envio = this.props.envio.Envio
    var idEnvio = this.props.envio._id
    if(this.props.envio.createdAt){
        fecha = this.props.envio.createdAt.split("T")[0]
        hora = this.props.envio.createdAt.split("T")[1].split(".")[0] 
    }

    
      return (
          <div className="tarjeta">
        <Card border="info">
        <Card.Header as="h5">Centro Hospitalario: {this.state.centroHosp.nombre}</Card.Header>
        <Card.Body>
      <Card.Title>Ciudad: {this.state.centroHosp.ciudad}</Card.Title>
            <Card.Text>
            <ul>
            <li>Fecha de envio: {fecha}</li>
            <li>Hora: {hora}</li>
            <br/>
            
            </ul>
            </Card.Text>
            <Button variant="primary" href={`/mostrarEnvio/${idEnvio}`}>Ver detalles</Button>
        </Card.Body>
        </Card>
        <br/>
        </div>
      );
    }
  
  }
  
  export default CardEnvio;