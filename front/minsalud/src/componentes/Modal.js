import React, {useState, setShow} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function BotonModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
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