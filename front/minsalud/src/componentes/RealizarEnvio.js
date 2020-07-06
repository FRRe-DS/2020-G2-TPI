import React, {Component} from 'react';
import './css/envio.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import Alert from 'react-bootstrap/Alert'
import InfoPeticion from './infoPeticion'
import { withRouter } from 'react-router-dom';
class RealizarEnvio extends Component {
    constructor(props) {
		super(props);
		this.state = {
            recursos: [],
            peticion:{},
            centrosAPI: [],
            centroPeticion:{
                id:0, 
                nombre:""},
            envio:{},
            medicos:[],
            idDIVmedico:0,
            estadoCantMed:true,
            medicoEnvio:[]
    }}
    traerData(){
    const urlRecursos = `${this.props.url}recursos`;
    fetch(urlRecursos, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(recu => this.setState({recursos: recu[0].Recursos}))
    
    const urlMedicos = `${this.props.url}medicos`;
    fetch(urlMedicos, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => {this.setState({medicos: data[0].Medicos})})

    const urlCentros = `${this.props.url}centroshospitalarios`;
    fetch(urlCentros, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => this.setState({centrosAPI: data.CentrosHospitalarios}))

    //Emparejar un envio con un centro
    let idPeticionURL = window.location.href.replace('http://localhost:3000/envio/','');
   if(idPeticionURL !== ":id"){
        //este es el caso en el un envio se genere porque tenia una peticion asociada

        let cargaElemento = {};
            cargaElemento["idPeticion"] = idPeticionURL;
            this.setState({envio: cargaElemento}) 
        fetch(`${this.props.url}encontrarPeticion?idPeticion=${idPeticionURL}`,{
            method:"GET"


        }).then(resp=>resp.json())
        .then(data => {
            this.setState({peticion:data})
            this.obtenerCentroHosp()
        })    
        .catch(error=>console.log(error))
    }

    

    


    



}

  //se usa este hook para poder colocar los datos despues del renderizado
  componentWillMount() {
    if(this.state.recursos.length ===0 || this.state.centrosAPI.length ===0){
      this.traerData()
      
    }
    

}


    obtenerCentroHosp(){
    
        const urlCentrosMedicosID = `${this.props.url}centroHospitalarioId?idCentro=${this.state.peticion.Peticion.idCentro}`;
        fetch(urlCentrosMedicosID, {
      method: "GET"
      //,headers: {
      //  "x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR"}
    }).then(resp=>resp.json())
    .then(data => {
        
        //Con esto hacemos que el administrador solo pueda enviar recursos para la peticion que esta respondiendo

        if(data.CentroHospitalario[0]!==undefined && data.CentroHospitalario[0].hasOwnProperty("idCentro")){
        this.setState({centroPeticion:data.CentroHospitalario[0]})
        
    ReactDOM.render(<option value={this.state.centroPeticion.idCentro}>{this.state.centroPeticion.nombre}</option>, document.getElementById('select-envio-centros'))
            this.setState({envio:{"idPeticion": this.state.centroPeticion.idCentro}})
            
    }    
}
        )
    
}


    
    enviarPeticion(e){
        e.preventDefault()
        let envioDeMedicos = [];
        console.log("Soy un envio")
        let especialidad;
        let cant=0;
        let objMed={};
        let medAPI = this.state.medicos
        let cantidadMedicos = this.state.idDIVmedico;
        let envio = this.state.envio;
        
        //Lo primero a hacer es ver si ya tenemos asignado un centro hospitalario
        //Tambien hay que corroborar que tenga algun tipo de recurso
        if (this.state.envio.hasOwnProperty("idCentro") && Object.keys(this.state.envio).length>2){
            
            for (let i=0; i< cantidadMedicos + 1; i++){
                especialidad = document.getElementById(`otro-medico${i}`).getElementsByClassName("form-group")[0].getElementsByTagName("select")[0].value
                cant = parseInt(document.getElementById(`otro-medico${i}`).getElementsByClassName("form-group")[0].getElementsByTagName("input")[0].value)
                let cantEspecialista;
                cantEspecialista = medAPI.find(elem => elem.especialidad ===especialidad);
                if(cantEspecialista){
                cantEspecialista = cantEspecialista.cantidad
            }
                if(cant>0 && especialidad !==""){

                    //con este condicional vemos que no supere la cantidad disponible de cada especialista
                    if(cant<=cantEspecialista){
                        objMed["especialidad"]=especialidad;
                        objMed["cantidad"]=cant;
                        envioDeMedicos.push(objMed)
                        objMed={}
                    }else{
                        document.getElementById(`otro-medico${i}`).getElementsByClassName("form-group")[0].getElementsByTagName("input")[0].value = 0
                        
                        ReactDOM.render(<Alert variant="danger">Valor del especialista {especialidad} no disponible</Alert>, document.getElementById("error-medico"))
                    setTimeout(()=>{
                        ReactDOM.render(<div></div>, document.getElementById('error-medico'))	
                        
                    },2000)
                    }
                }else if(cant<0){
                    ReactDOM.render(<Alert variant="danger">Ingrese valores mayores a 0</Alert>, document.getElementById("error-medico"))
                setTimeout(()=>{
                    ReactDOM.render(<div></div>, document.getElementById('error-medico'));
                    document.getElementById(`otro-medico${i}`).getElementsByClassName("form-group")[0].getElementsByTagName("input")[0].value = 0	
                    
                },2000)
                }

            }
            
            if(envioDeMedicos.length>0){
                envio["medicos"] = envioDeMedicos
            }
            
            let ObjetoEnvio = {"Envio":envio}
            console.log(ObjetoEnvio)
            
            fetch(`${this.props.url}envios`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ObjetoEnvio)
            }).then(resp=>resp.json())
            .then(data=>{
                //Exito del envio
                //mensaje-peticion para renderizar el mensaje
                if(data.mensaje ==="Recursos ActualizadosEl envio se agrego correctamente"){
                    ReactDOM.render(<Alert variant="success">La peticion fue completamente respondida</Alert>, document.getElementById("mensaje-envio"))
                }
                else{ReactDOM.render(<Alert variant="success">{data.mensaje}</Alert>, document.getElementById("mensaje-envio"))
                }
                setTimeout(()=>{
                    ReactDOM.render(<div></div>, document.getElementById('mensaje-envio'))	
                    
                },3000)
            })
            .catch(error=>{
                ReactDOM.render(<Alert variant="danger">Error en el envio</Alert>, document.getElementById("mensaje-envio"))

                setTimeout(()=>{
                    this.props.history.push('/peticiones')	
                    
                },4000)
            })
    }else{

        ReactDOM.render(<Alert variant="danger">Recuerde que es obligatorio ingresar un centro y enviar recursos</Alert>, document.getElementById("error-incompleto"))
                setTimeout(()=>{
                    ReactDOM.render(<div></div>, document.getElementById('error-incompleto'))	
                    
                },3000)
        

    }
    }
    
    recursoPeticion(recurso){
        
        if(this.state.peticion.hasOwnProperty(`${recurso}`)){
            return(this.state.peticion.recurso)
        }else{
            return 0
        }
    }

    
    generacionMedico = (e)=> {
        let medicoID=this.state.idDIVmedico
        
        if(e.target.value !==""){
        medicoID = medicoID+1
        
        let medicoDIV =
        <>
        <Form.Group>
        <Form.Label column="lg">Especialidad</Form.Label>
        <Form.Control as="select" className="form-envio" onInput={e=>this.generacionMedico(e)} id={`select-med${medicoID}`}>
        <option></option>
        {
        this.state.medicos.map( med => <option value={med.especialidad}>{med.especialidad[0].toUpperCase() +  
            med.especialidad.slice(1)} - Disp: {med.cantidad}</option>)
        }
        </Form.Control>
        <Form.Label column lg="1.5">
            Cantidad: 
        </Form.Label>
        <Form.Control className="cant-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={0} defaultValue={0} style={{marginRight:"5%"}}/>
        <Button variant="danger" size="sm" onClick={e=>this.removerMedico(medicoID)}>X</Button>
        </Form.Group>

        < div id={`otro-medico${medicoID+1}`}></div>
        </>
        
        
        
    ReactDOM.render(medicoDIV, document.getElementById(`otro-medico${medicoID}`))
    this.setState({idDIVmedico:medicoID}) 
    }
    }
    

    removerMedico(id){
        let medicoID=id-1;
        ReactDOM.render(<div></div>, document.getElementById(`otro-medico${id}`))
    this.setState({idDIVmedico:medicoID})
    
    }

    agregarElemEnvio(e){
        e.preventDefault();
        let envioPrevio= this.state.envio
        let valorElemento = parseInt(e.target.value);
        let nombreElemento = e.target.name;
        let cargaElemento = envioPrevio;
        if(parseInt(e.target.value)<0){

            ReactDOM.render(<Alert variant="danger">No valores negativos por favor</Alert>, document.getElementById("error-negativo"))
            setTimeout(()=>{
                ReactDOM.render(<div></div>, document.getElementById('error-negativo'))	
                
              },2000)
              
              delete cargaElemento[nombreElemento]
              this.setState({envio: cargaElemento})
              return e.target.value = 0 
        }else{
        cargaElemento[nombreElemento] = valorElemento;
        this.setState({envio: cargaElemento})
    }


    
    }



    render(){
        
        return (
        <div className="envio-container">
            <h1>Generacion de un envio</h1>
            <Form>
                
                <Form.Group>
                    <Form.Label column="lg" >Centro Hospitario</Form.Label>
                            
                      
                    <Form.Control as="select" className="form-envio" id="select-envio-centros" onChange={e=>this.agregarElemEnvio(e)} name="idCentro" required>
                    <option value=""></option>
                    {
                    this.state.centrosAPI.map( centro => <option value={centro.idCentro}>{centro.nombre}</option>)
                    }
                    </Form.Control>
                    <InfoPeticion peticion={this.state.peticion}/>
                <div id="error-incompleto"></div>  
                <hr style={{color: "black", borderColor : '#000000' }}/>

                
                
            
                
                </Form.Group>
            <div className="grid-envio">
                <div className="recursos-envio">
                <h2 style={{color: "black", borderColor : '#000000' }}>Recursos</h2>
                <div id="error-negativo"></div>
                {/*Campo para las camillas */ }
                <Form.Group>
                    <Form.Label column="lg">Camillas</Form.Label>
                            
                      
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["camillasDisponible"]} min={0} defaultValue={this.recursoPeticion("camillas")} onChange={e=>this.agregarElemEnvio(e)} name="camillas" />
                    
                    
                </Form.Group>
                
                {/*Campo para los jabones */ }
                <Form.Group>
                    <Form.Label column="lg">Jabon en litros</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jabonLitrosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="jabonLitros"/>

                    
                </Form.Group>
               
                {/*Campo para el alcohol en gel*/ }
                <Form.Group>
                    <Form.Label column="lg">Litros de alcohol en gel</Form.Label>
                    
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["alcoholLitrosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="alcoholLitros"/>
                    

                </Form.Group>
        

           
                {/*Campo para barbijos*/ }
                <Form.Group>
                    <Form.Label column="lg">Barbijos</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["barbijosDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="barbijos"/>
                    

                </Form.Group>

                    {/*Campo para jeringas */ }
                <Form.Group>
                    <Form.Label column="lg">Jeringas</Form.Label>
 
                    <Form.Control className="form-envio" type="number" max={this.state.recursos["jeringasDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="jeringas"/>

                    

                </Form.Group>

                    {/*Campo para cofias*/ }
                <Form.Group>
                    <Form.Label column="lg">Cofias</Form.Label>

                    <Form.Control className="form-envio" type="number" max={this.state.recursos["cofiasDisponible"]} min={0} defaultValue={0} onChange={e=>this.agregarElemEnvio(e)} name="cofias"/>
                    

                </Form.Group>
                </div>

        <div className= "medicos-envio">
                    <h2>Medicos</h2>
                    <div id="error-medico"></div>
            <div id={"otro-medico0"}>
                <Form.Group>
                    
                         
                <Form.Label column="lg" >Especialidad</Form.Label>
                    <Form.Control as="select" className="form-envio" onChange={this.generacionMedico} 
                     name="especialidad">
                    <option></option>
                    <>{
                    this.state.medicos.map( med => <option value={med.especialidad}>{med.especialidad[0].toUpperCase() +  
                        med.especialidad.slice(1)} - Disp: {med.cantidad} </option>)
                    
                    }</>
                    </Form.Control>
                    <Form.Label column lg="1.5">
                        Cantidad: 
                    </Form.Label>
                    <Form.Control className="cant-envio" type="number" min={0} defaultValue={0} style={{marginRight:"5%"}}
                    name="cantidad-med"/>
                    

                </Form.Group>
                
                
            </div>
            <div id={"otro-medico1"}>

            </div>



        </div>
                    

        </div>
                <br />

                <div className="botones-envio">
                <Button  className="boton" variant="primary" onClick={e => this.enviarPeticion(e)}>
                    Realizar Envio
                </Button>
                <Button  className="boton" variant="secondary" href="/peticiones">
                    Regresar
                </Button>
                
                </div>
                
            </Form>
            < div id="mensaje-envio"></div>


        </div>

    );
}
  }


export default withRouter(RealizarEnvio);