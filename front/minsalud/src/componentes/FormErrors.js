import React from "react";
import Alert from 'react-bootstrap/Alert'


export const FormErrors = ({ formErrors }) => {
  
  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <>
            <br/>
            <Alert key={i} variant='warning' className="w-50">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {formErrors[fieldName]}, por favor corrija esto
              
              </Alert>

              </>
          );
        }  else {
          return "";
        }
      })}



    </div>
  );
};

export default FormErrors;