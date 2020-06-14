import React, { Component, Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./componentes/Header";
import Menu from "./componentes/Menu";
import TablaCentros from "./componentes/TablaCentros";
import Login from "./componentes/Login";

import Peticiones from './componentes/Peticiones';
import TablaRecursos from './componentes/TablaRecursos';
import Peticion from './componentes/Peticion'
// importar informacion a cerca de los centros hospitalarios
import centros from "./ejemplos/centrosHospitalarios.json";



class App extends Component {
	state = {
    centros: centros,
    url:"http://localhost:5000/"
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
                  <TablaCentros url={this.state.url} />
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
        <Peticiones url={this.state.url} />
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
 <Route 
          exact path="/peticion/:id"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
        <Peticion/>
        
			  </div>
			);
		  }}
          
          />
 <Route 
          exact path="/gestion/:id"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
        <h2>ACA HAY QUE COLOCAR EL ENVIO DE UN ENVIO</h2>
        
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
