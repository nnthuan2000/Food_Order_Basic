import React, { useState } from "react";

type Validatable = (value: string) => boolean;

const useInput = (initialValue: string, validate: Validatable) => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const enteredValueIsValid = validate(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const resetHandler = () => {
    setEnteredValue(initialValue);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    error: hasError,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};

export default useInput;
