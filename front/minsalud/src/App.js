import React, { Component, Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Login from "./componentes/Login";

import CardPeticion from './componentes/CardPeticion';
import TablaRecursos from './componentes/TablaRecursos';

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

		  <Route 
          exact path="/peticiones"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
				<CardPeticion/>
        <CardPeticion/>
        <CardPeticion/>
			  </div>
			);
		  }}
          
          />

      <Route 
          exact path="/recursos"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
        <TablaRecursos/>
        
			  </div>
			);
		  }}
          
          />


        </Switch>
      </Router>
    );
  }
}

export default App;
