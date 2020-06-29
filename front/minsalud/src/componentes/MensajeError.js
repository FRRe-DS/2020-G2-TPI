import Alert from 'react-bootstrap/Alert'
import React from 'react';


const MensajeAlerta = (props) => {
    return (  
        <Alert variant="danger">Los {props.mensaje} no pudieron ser cargados</Alert>
    );
}
 
export default MensajeAlerta;