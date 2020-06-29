import React, { Component } from "react";

class Recurso extends Component {
    constructor(props) {
		super(props);
		this.state = {
      recursos: props.recurso,
      cantidad:props.cantidad
    }}
    //pasar de camelCase a Frase Normal los recursos
    traduccionGramatical(frase){
        return frase.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
    }
    render() {
    
        
        
    return (
      <tr>
        <td>{this.traduccionGramatical(this.state.recursos)+'s'}</td>
        <td>{this.state.cantidad}</td>

      </tr>
    );
  }

}

export default Recurso;