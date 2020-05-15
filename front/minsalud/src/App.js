import React, { Component, Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Login from "./componentes/Login";

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
<<<<<<< HEAD
              <div className="app-container">
                
                <Menu />
                <TablaCentros centros={this.state.centros} />
                
              </div>
            )
=======
                <div className="app-container">
                  <Menu />
                  <TablaCentros centros={this.state.centros} />
                </div>
              );
>>>>>>> e55157b78d36d1f4934fb67b1f074567e601d858
            }}
          />
          <Route 
          path="/login"
          render={() => {
            return <Login/>
          }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
