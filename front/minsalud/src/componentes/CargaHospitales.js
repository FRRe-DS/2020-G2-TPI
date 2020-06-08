import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
class CargaHospitales extends Component {
    render() { 
        return (  

<Form>
  <Form.Group>
    <Form.Label>Nombre</Form.Label>
    <Form.Control  placeholder="Ingrese nombre de la institucion" />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Ciudad</Form.Label>
    <Form.Control as="select" value="Choose...">
        <option>Elija ciudad por favor</option> /* Agregar un iterador con ciudades */
        <option>...</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
    <Form.Label>Direccion</Form.Label>
    <Form.Control  placeholder="Ingrese calle " />
  </Form.Group>
  <Form.Group>
    <Form.Label>Numero</Form.Label>
    <Form.Control  placeholder="Ingrese altura  " />
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Seleccione tipo 
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Hospital"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Sanatorio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="Veterinaria"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>
  </fieldset>

  <Button variant="primary" type="submit">
    Enviar
  </Button>
</Form>


        );
    }
}
 
export default CargaHospitales;