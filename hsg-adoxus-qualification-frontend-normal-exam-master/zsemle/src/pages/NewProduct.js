import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import InputField from "../components/InputField";
import db from "../firebase/db";
import Select from "../components/Select";
import {categories} from "../utils";

const NewProduct = () => {
  const defaultValues = {
    name: "",
    category: ""
  }
  const [formData, setFormData] = useState({
    ...defaultValues
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [wasValidated, setWasValidated] = useState(false);
  const [isFormSentSuccess, setIsFormSentSuccess] = useState(false);

  const validators = {
    name: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      },
      {
        fn: isLongerThan2,
        errorMessage: "Leglább 2 karakter hosszú legyen"
      }
    ],
    category: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      }
    ],
    price: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      },
      {
        fn: isBiggerThanZero,
        errorMessage: "Nem lehet negatív"
      }
    ],
    count: [
      {
        fn: isNotEmpty,
        errorMessage: "Kitöltése kötelező"
      },
      {
        fn: isBetweenOneAndTen,
        errorMessage: "1 és 10 közötti érték legyen"
      }
    ]
  };

  function isNotEmpty(name = "") {
    return name !== "";
  }

  function isLongerThan2(name = "") {
    return name.length > 2;
  }

  function isBiggerThanZero(number) {
    return number > 0;
  }

  function isBetweenOneAndTen(number) {
    return number >= 1 && number <= 10;
  }

  function reportFieldValidity(inputName) {
    const inputValue = formData[inputName];
    const inputValidators = validators[inputName];
    const inputValidationResults = inputValidators.map((inputValidator) => {
      const { fn: validatorFn, errorMessage: validatorErrorMessage } = inputValidator;
      const isValid = validatorFn(inputValue);
      return (isValid) ? "" : validatorErrorMessage;
    }).filter((errorMessage) => errorMessage !== "");

    setErrorMessages((prevState) => (
      { ...prevState, [inputName]: inputValidationResults }
    ));

    const isInputValid = inputValidationResults.length === 0;
    if (isInputValid) {
      setErrorMessages((prevState) => (
        { ...prevState, [inputName]: [] }
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

  function handleOnSubmit(event) {
    event.preventDefault();

    const formIsValid = reportFormValidity();

    if (formIsValid) {
      addDoc(collection(db, "zsemle"), formData).then(ref => {
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
      <h1 className="mt-3">Új termék felvitele</h1>
      <form onSubmit={handleOnSubmit} noValidate>
        <InputField
          type="text"
          name="name"
          id="name"
          label="Termék"
          errorMessages={errorMessages.name}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.name}
        />
        <Select
          name="category"
          id="category"
          errorMessages={errorMessages.category}
          label="Kategória"
          options={Object.values(categories)}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.category}
        />
        <InputField
          type="number"
          name="price"
          id="price"
          label="Egységár"
          errorMessages={errorMessages.price}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.price}
        />
        <InputField
          type="number"
          name="count"
          id="count"
          label="Darab"
          errorMessages={errorMessages.count}
          wasValidated={wasValidated}
          handleOnChange={handleOnChange}
          value={formData.count}
        />
        <button className="btn btn-primary mb-3">Mentés</button>
      </form>
      {isFormSentSuccess &&
        <div className="alert alert-success" role="alert">
          Sikeres mentés
        </div>
      }
      {wasValidated && !isFormSentSuccess &&
        <div className="alert alert-danger" role="alert">
          Sikertelen mentés
        </div>
      }
    </main>
  );
};

export default NewProduct;
