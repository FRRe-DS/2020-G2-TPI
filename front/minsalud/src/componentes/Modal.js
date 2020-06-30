import React, {useState, setShow} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom'
import Alert from 'react-bootstrap/Alert'
function BotonModal(props) {
    const [show, setShow] = useState(false);
    let idPeticion = props.idPeticion
    console.log('peticion:' + idPeticion)
    const url = `${props.url}rechazarPeticion?idPeticion=${idPeticion}`
    const handleClose = () => {
      
      fetch(url, {
        method: "GET",
      }).then(resp=>resp.json())
      .then(data=>{
        console.log(data)
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
    
    
    return (
      <>
        <Button variant="warning" onClick={handleShow} size="lg">
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
            <Button variant="primary" onClick={handleClose}>
                Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

  export default BotonModal;