import {addDoc, collection} from "firebase/firestore";
import {useState} from "react";
import InputField from "../components/InputField";
import validator from "validator"
import db from "../firebase/db";
import Select from "../components/Select";


const RegisterForm = function (){
  const defaultValues = {
    role: "",
    isActive: false
  }
  const [formData, setFormData] = useState({
    ...defaultValues
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [wasValidated, setWasValidated] = useState(false);
  const [isFormSentSuccess, setIsFormSentSuccess] = useState(false);

  const validators = {
    fullName: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      }
    ],
    email: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      },
      {
        fn: isValidEmail,
        errorMessage: "Nem megfelelő email cím formátum"
      }
    ],
    role: [
      {
        fn: isNotEmpty,
        errorMessage: "Választani kötelező"
      }
    ]
  };

  function isNotEmpty(name = "") {
    return name !== "";
  }

  function isValidEmail(email = "") {
    return validator.isEmail(email);
  }

  function reportFieldValidity(inputName) {
    const inputValue = formData[inputName];
    const inputValidators = validators[inputName];
    const inputValidationResults = inputValidators.map((inputValidator) => {
      const {fn: validatorFn, errorMessage: validatorErrorMessage} = inputValidator;
      const isValid = validatorFn(inputValue);
      return (isValid) ? "" : validatorErrorMessage;
    }).filter((errorMessage) => errorMessage !== "");

    setErrorMessages((prevState) => (
      {...prevState, [inputName]: inputValidationResults}
    ));

    const isInputValid = inputValidationResults.length === 0;
    if (isInputValid) {
      setErrorMessages((prevState) => (
        {...prevState, [inputName]: []}
      ));
    }

    return isInputValid;
  }

  function reportFormValidity() {
    const inputFieldNames = Object.keys(validators);
    const inputValidations = inputFieldNames.map((inputFieldName) => reportFieldValidity(inputFieldName));
    let isValid = inputValidations.every((isValid) => isValid);
    setWasValidated(true);
    return isValid;
  }

  function handleOnChange(event) {
    const inputElement = event.target;
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value
    });
  }

  function handleOnCheckboxChange(event) {
    const isChecked = event.target.checked;
    setFormData({
      ...formData,
      "isActive": isChecked
    });
  }
  
  function handleOnSubmit(event) {
    event.preventDefault();

    const formIsValid = reportFormValidity();

    if (formIsValid) {
      addDoc(collection(db, "registrations"), formData).then(ref => {
        setFormData({
          ...defaultValues
        });
        setIsFormSentSuccess(true);
      });
    } else {
      setIsFormSentSuccess(false);
    }
  }

  return (
    <main className="container">
      <h1>Regisztráció</h1>
      <form onSubmit={handleOnSubmit} noValidate>
        <InputField
          type="text"
          name="fullName"
          id="fullName"
          label="Név"
          errorMessages={errorMessages.fullName}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.fullName}
        />
        <InputField
          type="email"
          name="email"
          id="email"
          label="Email cím"
          errorMessages={errorMessages.email}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.email}
        />
        <Select
          name="role"
          id="role"
          errorMessages={errorMessages.role}
          label="Kategória"
          options={["admin", "vendég", "regisztrált felhasználó"]}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.role}
        />
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="isActive" id="isActive" onChange={handleOnCheckboxChange}/>
          <label className="form-check-label" htmlFor="isActive">Aktív</label>
        </div>
        <button className="btn btn-primary mb-3">Regisztráció</button>
      </form>
      { isFormSentSuccess &&
        <div className="alert alert-success" role="alert">
          Sikeres mentés
        </div>
      }
    </main>
  );
};

export default RegisterForm
