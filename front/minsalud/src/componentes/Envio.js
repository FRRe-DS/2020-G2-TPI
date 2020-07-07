import React, {Component} from 'react';

import './css/peticion.css'
import Button from 'react-bootstrap/Button'

class Envio extends Component {
  constructor(props) {
    super(props);
    this.state = {
  recursos: [],
  medicos: {},
  idEnvio:''
}
}


traerData(){
//Traigo el id desde la url para hacer un ruteo comodo 
let idEnvioURL = window.location.href.replace('http://fronthealthministry.s3-website-sa-east-1.amazonaws.com/mostrarEnvio/','');
this.setState({idEnvio: idEnvioURL});


const url = `${this.props.url}envioId?idEnvio=${idEnvioURL}`;
fetch(url, {
  method: "GET"
 
}).then(resp=>resp.json())
.then(data => 
  { 
    
    //agrego un if para separar del json los medicos y el envio en si
    
    if(data.Envio.hasOwnProperty('medicos')){
    
    let {medicos, ...envio} = data.Envio
    this.setState({
      recursos:envio,
      medicos:medicos,
      
    })

  } else{
    
  
    this.setState({
      recursos:data.Envio
      
  })

    
  }
  
  
  })
  
.catch(error => console.log(error))
}
//ESTO ES TRAERME UNA PETICION PORQUE TODAVIA NO TENGO ID DEL ENVIO
//se usa este hook para poder colocar los datos despues del renderizado

  componentDidMount() {
      if(this.state.recursos.length === 0 ){
        this.traerData()
        
        
      }
    }   
  render() {
        
      return (
        <div id="container-peticion">
          <h3>ENVIO: {this.state.idEnvio.substr(-5)}</h3>
            <h4>Recursos enviados</h4>
            <ul>

            {
              //Parseo para escribir atributos y valores sin estructura definida
                Object.keys(this.state.recursos).map((rec)=><li>{
                  
                  `${rec}: ${this.state.recursos[rec]}`
                  
                  
                  
                  }</li>)


                
            }
            <br/>
            <br/>

            <h4>Medicos</h4>
            
            {
              Object.keys(this.state.medicos).map((meds)=><li>{
                  
                `${this.state.medicos[meds].especialidad}s: ${this.state.medicos[meds].cantidad}`
                
                
                
                }</li>)
            }


            

            </ul>
            <div className="botones-peticion">
            <Button className='boton' variant="secondary" size="lg" href="/historialEnvios" > Volver</Button >
    
           
            </div> 
               
        </div>
      );
    }
  }
  
  export default Envio;