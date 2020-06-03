import React from "react";

export const FormErrors = ({ formErrors, ingreso }) => {

  return (
    <div className="formErrors">
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return (
            <p key={i}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {formErrors[fieldName]}
            </p>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default FormErrors;