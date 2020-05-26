import React, { Component, Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Login from "./componentes/Login";
import CargaHospitales from './componentes/CargaHospitales'
// importar informacion a cerca de los centros hospitalarios
import centros from "./ejemplos/centrosHospitalarios.json";

import LineGraph from "./componentes/Grafico"


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
                <div className="app-container">
                  <Menu />
                  <LineGraph/>
                  <TablaCentros centros={this.state.centros} />
                </div>
              );
            }}
          />
          <Route 
          path="/login"
          render={() => {
            return <Login/>
          }}
          />
          <Route 
          path="/cargaHospitales"
          render={() => {
            return <CargaHospitales/>
          }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
