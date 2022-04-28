export function getValidationClassName(errorMessages, wasValidated) {
    let className = "";
    const isValid = errorMessages.length === 0;
    if (wasValidated) {
      if (isValid) {
        className = "is-valid";
      } else {
        className = "is-invalid";
      }
    }
    return className;
  }