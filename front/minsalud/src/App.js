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
import RealizarEnvio from './componentes/RealizarEnvio'



class App extends Component {
	state = {
    
    url:"http://localhost:5000/"
	};

  render() {
    return (
      <Router>
        <Header />
        <Switch>
         
         {/* Ruta de la tabla de centros medicos */}
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
          {/* Ruta Login */}
          <Route 
          exact path="/"
          
          component={Login}
          
          />

          {/* Ruta para ver todas las peticiones */}
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
  {/* Ruta para ver la tabla de recursos disponibles*/}  
      <Route 
          exact path="/recursos"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
        <TablaRecursos url={this.state.url}/>
        
			  </div>
			);
		  }}
          
          />

          {/* Ruta de una paticion en particular, el envio de id se hace desde /peticiones */}
 <Route 
          exact path="/peticion/:id"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu />
        <Peticion url={this.state.url}/>
        
			  </div>
			);
		  }}
          
          />
          
          {/* Ruta para generar un envio con una id en particular */}
 <Route 
          exact path="/envio/:id"
          
          render={() => {
			return (
			  <div className="app-container">
				
				<Menu/>
        <RealizarEnvio url={this.state.url}/>
        
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
