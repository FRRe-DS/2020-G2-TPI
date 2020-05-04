import React, { Component, Fragment } from "react";
// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./componentes/Header";
import TablaCentros from "./componentes/TablaCentros";
import Centros from "./componentes/Centros";
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
              return <TablaCentros centros={this.state.centros} />;
            }}
          />
          <Route path="/otra-url" component={Centros} />
        </Switch>
      </Router>
    );
  }
}

export default App;
