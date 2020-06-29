import React, {Component, Fragment} from 'react';
import CardPeticion from './CardPeticion';


class Peticiones extends Component{
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
      .then(data => this.setState({peticiones: data}))
      .catch(error => console.log(error))
    }
    //se usa este hook para poder colocar los datos despues del renderizado
      
        componentDidMount() {
            if(this.state.peticiones.length ===0 ){
              this.traerData()
            }
          } 
        
    render() {
        
          return(
            <Fragment>
            {
              this.state.peticiones.map( peticion => <CardPeticion peticion={peticion}  />)
          }
          </Fragment>
          );
        
        
        }
    
    
    }

    export default Peticiones;