import React, { Component, Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Centros from "./componentes/Centros";
import Login from "./componentes/Login"
// importar informacion a cerca de los centros hospitalarios
import centros from "./ejemplos/centrosHospitalarios.json";

class App extends Component {
  state = {
    centros: centros,
  };

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <Fragment>
                  <Menu />
                  <TablaCentros centros={this.state.centros} />
                </Fragment>
              );
            }}
          />
          <Route path="/otra-url" component={Centros} />
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
