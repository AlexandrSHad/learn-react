import { useState } from "react";

const useInput = (validateValueFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isEnteredValueValid = validateValueFn(enteredValue);
  const hasError = !isEnteredValueValid && isTouched;

  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  }

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    enteredValue,
    hasError,
    changeHandler,
    blurHandler,
    reset
  };
};

export default useInput;