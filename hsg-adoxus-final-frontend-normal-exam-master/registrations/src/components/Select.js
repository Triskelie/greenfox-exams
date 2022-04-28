import {getValidationClassName} from "./util";

function Select({
                  id,
                  options = [],
                  name,
                  handleOnChange,
                  errorMessages = [],
                  label,
                  wasValidated = false,
                  value = ""
                }) {

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select name={name}
              id={id}
              className={"form-select " + getValidationClassName(errorMessages, wasValidated)}
              onChange={handleOnChange}
              value={value}
      >
        <option value={""}>Válassz!</option>
        {options.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
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

export default Select;