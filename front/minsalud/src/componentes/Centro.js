import React, { Component } from "react";

class Centro extends Component {
  render() {
    const { idCentro, nombre, ciudad, tipo } = this.props.centro;

    return (
      <tr>
        <td>{idCentro}</td>
        <td>{nombre}</td>
        <td>{ciudad}</td>
        <td>{tipo}</td>
      </tr>
    );
  }

}

export default Centro;
