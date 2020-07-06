import React, {Component, Fragment} from 'react';
import CardEnvio from './CardEnvio';


class HistorialEnvios extends Component{
    constructor(props) {
          super(props);
          this.state = {
        envios: []
      }
    }
  
  
      traerData(){
      const url = `${this.props.url}envios`;
      fetch(url, {
        method: "GET"
       
      }).then(resp=>resp.json())
      .then(data => this.setState({peticiones: data}))
      .catch(error => {
        console.log(error)
        
      })
    }
    //se usa este hook para poder colocar los datos despues del renderizado
      
        componentDidMount() {
            if(this.state.envios.length ===0 ){
              this.traerData()
            }
          } 
        
    render() {
        
          return(
            <Fragment>
            {
              this.state.envio.map( envio => <CardEnvio envio={envio}  />)
          }
          
          </Fragment>
          );
        
        
        }
    
    
    }

    export default HistorialEnvios;