import React from "react";
import Alert from 'react-bootstrap/Alert'


export const FormErrors = ({ formErrors, ingreso }) => {

  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <>
            <br/>
            <Alert key={i} variant='danger' className="w-50">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {formErrors[fieldName]}
              </Alert>
              </>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default FormErrors;