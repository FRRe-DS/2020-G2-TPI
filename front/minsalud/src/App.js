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

<<<<<<< HEAD
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/centrosmedicos"
            render={() => {
              return (
                <div className="app-container">
                  
                  <Menu />
                  <TablaCentros centros={this.state.centros} />
                </div>
              );
            }}
          />
          <Route 
          exact path="/"
          
          component={Login}
          
          />
        </Switch>
      </Router>
    );
  }
=======
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
									<TablaCentros centros={this.state.centros} />
									<LineGraph/>
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
>>>>>>> e7c18105dd78d7bc4c57f77963a07169c434da33
}

export default App;
