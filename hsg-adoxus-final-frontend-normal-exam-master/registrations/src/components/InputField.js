import {getValidationClassName} from "./util";

function InputField(
  {
    id,
    name,
    handleOnChange,
    type,
    errorMessages = [],
    label,
    wasValidated = false,
    value = ""
  }
) {

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
        <input onChange={handleOnChange}
               name={name}
               type={type}
               className={"form-control " + getValidationClassName(errorMessages, wasValidated)}
               id={id}
               value={value}
        />
      <div className={"invalid-feedback"}>
        {errorMessages.length === 1 ?
          <>{errorMessages[0]}</>
        :
          <ul>
            {errorMessages.map((errorMessage) => (
              <li key={errorMessage}>{errorMessage}</li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default InputField;