import React, { Component } from "react";

class Recurso extends Component {
    constructor(props) {
		super(props);
		this.state = {
      especialidad: props.especialidad,
      cantidad:props.cantidad
    }}
    //pasar de camelCase a Frase Normal los recursos
    traduccionGramatical(frase){
        return frase.replace(/^./, (str) => str.toUpperCase())
    }
    render() {
    
        
     console.log(this.props)   
    return (
      <tr>
        <td>{this.traduccionGramatical(this.state.especialidad)}</td>
        <td>{this.state.cantidad}</td>

      </tr>
    );
  }

}

export default Recurso;