import React, {Component} from 'react';
import './css/envio.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
class RealizarEnvio extends Component {
    constructor(props) {
		super(props);
		this.state = {
            recursos: [],
            peticion:{},
            centrosAPI: [],
            centroPeticion:{
                id:0, 
                nombre:""},
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

    //Emparejar un envio con un centro
    let idPeticionURL = window.location.href.replace('http://localhost:3000/envio/','');
   if(idPeticionURL===":id"){
        //
        //
        console.log("estamos tratando un envio sin una peticion asociada")
        //
        //
    }else{
        
        //este es el caso en el un envio se genere porque tenia una peticion asociada
        fetch(`${this.props.url}encontrarPeticion?idPeticion=${idPeticionURL}`,{
            method:"GET"


        }).then(resp=>resp.json())
        .then(data => {
            this.setState({peticion:data})
            this.obtenerCentroHosp()
    })
        .catch(error=>console.log(error))    

    }


    



}

  //se usa este hook para poder colocar los datos despues del renderizado
  componentWillMount() {
    if(this.state.recursos.length ===0 || this.state.centrosAPI.length ===0){
      this.traerData()

    }
    

}


    obtenerCentroHosp(){
    
        const urlCentrosMedicosID = `${this.props.url}centroHospitalarioId?idCentro=${this.state.peticion.Peticion.idCentro}`;
        fetch(urlCentrosMedicosID, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => {
        
        //Con esto hacemos que el administrador solo pueda enviar recursos para la peticion que esta respondiendo

        if(data.CentroHospitalario[0]!==undefined && data.CentroHospitalario[0].hasOwnProperty("idCentro")){
        this.setState({centroPeticion:data.CentroHospitalario[0]})
        
    ReactDOM.render(<option value={this.state.centroPeticion.idCentro}>{this.state.centroPeticion.nombre}</option>, document.getElementById('select-envio-centros'))
    }    
}
        )
    
}

    controlMinimo(recurso){
        if(parseInt(recurso, 10)>0) {
            return "1"
        }else{
            return "0"
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
                    <Form.Label column="lg" >Centro Hospitario</Form.Label>
                            
                      
                    <Form.Control as="select" className="form-envio" id="select-envio-centros">
                    <option></option>
                    {
                    this.state.centrosAPI.map( centro => <option value={centro.idCentro}>{centro.nombre}</option>)
                    }
                    </Form.Control>
                    
                    
                </Form.Group>

                {/*Campo para las camillas */ }
                <Form.Group>
                    <Form.Label column="lg">Camillas</Form.Label>
                            
                      
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["camillasDisponible"]} min={this.controlMinimo('camillasDisponible')} />
                    
                    
                </Form.Group>
                
                {/*Campo para los jabones */ }
                <Form.Group>
                    <Form.Label column="lg">Jabon en litros</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jabonLitrosDisponible"]} min={this.controlMinimo('jabonLitrosDisponible')} />

                    
                </Form.Group>
                
                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Litros de alcohol en gel</Form.Label>
                    
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["alcoholLitrosDisponible"]} min={this.controlMinimo('alcoholLitrosDisponible')} />
                    

                </Form.Group>

                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Barbijos</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["barbijosDisponible"]} min={this.controlMinimo('barbijosDisponible')} />
                    

                </Form.Group>

                    {/*Campo para jeringas */ }
                <Form.Group>
                    <Form.Label column="lg">Jeringas</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jeringasDisponible"]} min={this.controlMinimo('jeringasDisponible')} />

                    

                </Form.Group>

                    {/*Campo para jeringas */ }
                <Form.Group>
                    <Form.Label column="lg">Cofias</Form.Label>

                    <Form.Control className="form-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={this.controlMinimo('cofiasDisponible')} />
                    

                </Form.Group>

                <br />

                <div className="botones-envio">
                <Button  className="boton" variant="primary" onClick={this.enviarPeticion}>
                    Realizar Envio
                </Button>
                <Button  className="boton" variant="secondary" href="/peticiones">
                    Regresar
                </Button>
                </div>
            </Form>
            


        </div>

    );
}
  }


export default RealizarEnvio;