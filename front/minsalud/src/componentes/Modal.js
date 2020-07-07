import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import Alert from 'react-bootstrap/Alert'
function BotonModal(props) {
    const [show, setShow] = useState(false);
    let idPeticion = props.idPeticion
    const url = `${props.url}rechazarPeticion?idPeticion=${idPeticion}`
    const handleConfirmacion = () => {
      
      fetch(url, {
        method: "GET",
        headers: {"x-api-key": "FTlS2bc9lo1OtmzHCBrju4ZL8PqFM5yr4JB775RR" },
      })
      .then(resp=>{
        resp.json()
        ReactDOM.render(           
          <Alert variant="success">
          Peticion rechazada
          </Alert>, document.getElementById('error-modal'))
              setTimeout(()=>{
                ReactDOM.render(<div></div>, document.getElementById('error-modal'))	
                setShow(false)
              },2100)
          
    })
      

      .catch(error=>{
        console.log(error)
        ReactDOM.render(           
          <Alert variant="danger">
          No se pudo rechazar la peticion
          </Alert>, document.getElementById('error-modal'))
      
      setTimeout(()=>{
        ReactDOM.render(<div></div>, document.getElementById('error-modal'))	
      },2500)

      })


    };
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)
    
    return (
      <>
        <Button variant="warning" onClick={handleShow} size="lg" disabled={props.estadoBoton}>
          {props.boton}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.head}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Esta seguro?</Modal.Body>
          <Modal.Body id="error-modal"></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={handleConfirmacion}>
                Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default BotonModal;