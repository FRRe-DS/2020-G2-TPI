import React, {Component} from 'react';
import './css/peticion.css'
import Button from 'react-bootstrap/Button'
import BotonModal from './Modal'

class Peticion extends Component {
  constructor(props) {
    super(props);
    this.state = {
  recursos: [],
  medicos: {},
  idPeticion:'',
  estado:{},
  rechazada:false,
  activo:false
}
}


traerData(){
//Traigo el id desde la url para hacer un ruteo comodo 
let idPeticionURL = window.location.href.replace(`http://fronthealthministry.s3-website-sa-east-1.amazonaws.com/peticion/`,'');

this.setState({idPeticion: idPeticionURL});
const url = `${this.props.url}encontrarPeticion?idPeticion=${idPeticionURL}`;
fetch(url, {
  method: "GET"
}).then(resp=>resp.json())
.then(data => 
  { 

    
    //agrego un if para separar del json los medicos y la peticion en si
    
    if(data.Peticion.hasOwnProperty('medicos')){
    
    let {medicos, respondidaCompletamente, ...peticion} = data.Peticion
    this.setState({
      recursos:peticion,
      medicos:medicos,
      estado:respondidaCompletamente
      
    })

  } else{
    let {respondidaCompletamente, ...peticion} = data.Peticion
  
  
    this.setState({
      recursos:peticion,
      estado:respondidaCompletamente
      
    })
  }
  
  //destructuring para sacar el atributo de rechazo en caso de tenerlo
  if(this.state.recursos.hasOwnProperty("rechazada")){
    let{rechazada, ...peticion} = this.state.recursos
    this.setState({
      recursos:peticion,
      rechazada
      
    })
    
  }
  
  if(this.state.estado || this.state.rechazada){
    this.setState({activo:true})
  }
  
  })
  
.catch(error => console.log(error))
}
//ESTO ES TRAERME UNA PETICION PORQUE TODAVIA NO TENGO ID DE PETICIONES
//se usa este hook para poder colocar los datos despues del renderizado

  componentDidMount() {
      if(this.state.recursos.length === 0 ){
        this.traerData()
        
        
      }
    }   
  render() {
    
      return (
        <div id="container-peticion">
          <h3>Peticion: {this.state.idPeticion.substr(-5)}</h3>
            <ul>

            {
              //Parseo para escribir atributos y valores sin estructura definida
                Object.keys(this.state.recursos).map((peti)=><li>{
                  
                  `${peti}: ${this.state.recursos[peti]}`
                  
                  
                  
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
            <Button className='boton' variant="secondary" size="lg" href="/peticiones" > Volver</Button >
            <BotonModal className='boton' boton="Rechazar Peticion" url={this.props.url} head="Rechazo de peticion" idPeticion={this.state.idPeticion} estadoBoton={this.state.activo}/>
            <Button className='boton' variant="primary" size="lg" disabled={this.state.activo} href={`/envio/${this.state.idPeticion}`}>Responder peticion</Button >
            </div> 
               
        </div>
      );
    }
  }
  
  export default Peticion;