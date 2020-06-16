import React, {Component} from 'react';
import './css/peticion.css'
import Button from 'react-bootstrap/Button'
class Peticion extends Component {
  constructor(props) {
    super(props);
    this.state = {
  peticiones: []
}
}


traerData(){
const url = `${this.props.url}peticiones`;
fetch(url, {
  method: "GET"
 
}).then(resp=>resp.json())
.then(data => this.setState({peticiones: data[0].Peticion}))
.catch(error => console.log(error))
}
//ESTO ES TRAERME UNA PETICION PORQUE TODAVIA NO TENGO ID DE PETICIONES
//se usa este hook para poder colocar los datos despues del renderizado

  componentDidMount() {
      if(this.state.peticiones.length === 0 ){
        this.traerData()
      }
    }   
  render() {
    
    console.log(this.state.peticiones)
      return (
        <div id="container-peticion">
          <h3>Peticion numero: </h3>
            <ul>

            {
              //Parseo para escribir atributos y valores sin estructura definida
                Object.keys(this.state.peticiones).map((peti)=><li>{`${peti}: ${this.state.peticiones[peti]}`}</li>)
            }
            

            </ul>
            <div className="botones-peticion">
            <Button className='boton' variant="secondary" size="lg" href="/peticiones">Volver</Button >
            <Button className='boton' variant="primary" size="lg" href="/hola">Responder peticion</Button >
            </div>    
        </div>
      );
    }
  }
  
  export default Peticion;