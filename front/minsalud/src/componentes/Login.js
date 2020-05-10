import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <div className="form-login">
        <h1>Inicio de Sesión</h1>
        <div className="Login">
          <form>
            <FormGroup>
              <FormLabel>Hospital</FormLabel>
              <FormControl autoFocus />
            </FormGroup>
            <FormGroup>
              <FormLabel>Contraseña</FormLabel>
              <FormControl />
            </FormGroup>
            <Button block bsSize="large">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
