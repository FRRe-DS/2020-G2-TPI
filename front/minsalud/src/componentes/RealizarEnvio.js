import React, {Component} from 'react';
import './css/envio.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class RealizarEnvio extends Component {
    constructor(props) {
		super(props);
		this.state = {
            recursos: [],
            peticion:"",
            centrosAPI: [],
      envio:{}
    }}
    traerData(){
    const urlRecursos = `${this.props.url}recursos`;
    fetch(urlRecursos, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(recu => this.setState({recursos: recu[0].Recursos}))
    
    const urlCentros = `${this.props.url}centroshospitalarios`;
    fetch(urlCentros, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => this.setState({centrosAPI: data.CentrosHospitalarios}))

  }
  //se usa este hook para poder colocar los datos despues del renderizado
  componentWillMount() {
    if(this.state.recursos.length ===0 || this.state.centrosAPI.length ===0){
      this.traerData()
    }
    

}
    
    controlMinimo(recurso){
        if(parseInt(recurso, 10)>0) {
            return 1
        }else{
            return 0
        } 
    }
    
    enviarPeticion(){
        console.log("Soy un envio")
    }
   

        
    render(){
        
        return (
        <div className="envio-container">
            <h2>Generacion de un envio</h2>
            <Form>
                {/* COMO PLACEHOLDER ESTARIA BUENO TRAER LOS DATOS DEL ENVIO*/}
            <Form.Group>
                    <Form.Label column="lg" placeholder="{this.props.envio.nombre}">Centro Hospitario</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control as="select">
                    <option></option>
                    {
                    this.state.centrosAPI.map( centro => <option>{centro.nombre}</option>)
        
                    }
                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>

                {/*Campo para las camillas */ }
                <Form.Group>
                    <Form.Label column="lg">Camillas</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["camillasDisponible"]} min={this.controlMinimo('camillasDisponible')}>
                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>
                
                {/*Campo para los jabones */ }
                <Form.Group>
                    <Form.Label column="lg">Jabon en litros</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["jabonLitrosDisponible"]} min={this.controlMinimo('jabonLitrosDisponible')}>

                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>
                
                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Litros de alcohol en gel</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["alcoholLitrosDisponible"]} min={this.controlMinimo('alcoholLitrosDisponible')}>
                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>

                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Barbijos</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["barbijosDisponible"]} min={this.controlMinimo('barbijosDisponible')}>
                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>

                    {/*Campo para jeringas */ }
                <Form.Group>
                    <Form.Label column="lg">Jeringas</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["jeringasDisponible"]} min={this.controlMinimo('jeringasDisponible')}>

                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>

                    {/*Campo para jeringas */ }
                    <Form.Group>
                    <Form.Label column="lg">Cofias</Form.Label>
                    {        
                    <Form.Group>  
                    <Form.Control type="number" max={this.state.recursos["cofiasDisponible"]} min={this.controlMinimo('cofiasDisponible')}>
                    </Form.Control>
                    </Form.Group>
                    }
                </Form.Group>

                <br />


                <Button  className="boton" variant="primary" onClick={this.enviarPeticion}>
                    Realizar Envio
                </Button>
                <Button  className="boton" variant="secondary" href="/peticiones">
                    Regresar
                </Button>
            </Form>
            


        </div>

    );
}
  }


export default RealizarEnvio;