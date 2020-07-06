import React from 'react';
import Overlay from 'react-bootstrap/Overlay'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'


function InfoPeticion(props) {
    var med;
    var peticionMostrar
    var medMostrar={}
    
    if(props.peticion.Peticion !== undefined){
        
        if(props.peticion.Peticion.hasOwnProperty('medicos')){
    
            let {medicos, respondidaCompletamente, ...peticion} = props.peticion.Peticion
             med = medicos;
             peticionMostrar = peticion
             
        
          } else{
            let {respondidaCompletamente, ...peticion} = props.peticion.Peticion
            peticionMostrar = peticion
            
          }
          
          //destructuring para sacar el atributo de rechazo en caso de tenerlo
          if(props.peticion.Peticion.hasOwnProperty("rechazada")){
            let{rechazada, ...peticion} = props.peticion.Peticion
              peticionMostrar = peticion
              
          }
        if(med.length>0){
        
        med.forEach(elem=>{
            medMostrar[elem.especialidad] = elem.cantidad

        })
        
        }
        peticionMostrar = JSON.stringify(peticionMostrar)
        medMostrar = JSON.stringify(medMostrar)
        }
    
    
   

    
    
    
    const popover = (
        
        <Popover id="popover-basic">
          <h3>Peticion</h3>
          <Popover.Content>
              
            <h5>Recursos</h5>
            <h6>{peticionMostrar}</h6>
            <br/>
            <h5>Medicos</h5>
            <h6>{medMostrar}</h6>
          </Popover.Content>
        </Popover>
      );
      
      const Info = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button variant="success"  style={{"margin-left":"80%"}}>Mostrar peticion</Button>
        </OverlayTrigger>
      );
    
    return ( <Info /> );
}
 
export default InfoPeticion;
