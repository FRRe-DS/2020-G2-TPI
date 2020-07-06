import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const BotonGeneracion = (props) => {
    let url = props.url;


    const generarMed = (e)=>{
        e.preventDefault();
        fetch(`${url}generarMedicos`,{
			method: 'POST',
			//headers: { 'Content-Type': 'application/json' },
			
        }).then(resp=>resp.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
    }

    const generarRec= (e)=>{
        e.preventDefault();
        fetch(`${url}generarRecursos`,{
			method: 'POST',
			//headers: { 'Content-Type': 'application/json' },
			
        }).then(resp=>resp.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
    }

    return (<div id="boton-aleatorio">
        <ButtonGroup>
        <Button variant="outline-info" onClick={e=>generarMed(e)}>Generar Medicos</Button>
        <Button variant="outline-info" onClick={e=>generarRec(e)}>Generar Recursos</Button>
        </ButtonGroup>
        </div> 
     );
}
 
export default BotonGeneracion;