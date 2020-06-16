import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import './css/tarjeta.css'
class CardPeticion extends Component {
    render() {
    const peticion = this.props.peticion.Peticion
    console.log(peticion)
    let estadoPeticion = peticion.respondidaCompletamente
    let estado = 'Pendiente'
    let colorAlerta ='warning'
    if(estadoPeticion === true){
      estado = 'Resuelta'
      colorAlerta = 'success'
    }
      return (
          <div className="tarjeta">
        <Card >
        <Card.Header as="h5">Centro num: {peticion.idCentro}</Card.Header>
        <Card.Body>
            <Card.Title>Ciudad</Card.Title>
            <Card.Text>
            <ul>
            <li>Fecha: 2/2/2020</li>
            <li>Hora: 22:30</li>
            <br/>
            <Alert variant={colorAlerta}>
            Estado: {estado}
            </Alert>
            </ul>
            </Card.Text>
            <Button variant="primary" href="/peticion/:id">Ver detalles</Button>
        </Card.Body>
        </Card>
        <br/>
        </div>
      );
    }
  
  }
  
  export default CardPeticion;