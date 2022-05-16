import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    hasError: nameInputHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim().length > 0);

  const {
    enteredValue: enteredEmail,
    hasError: emailInputHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.indexOf('@') > 0);

  const isFormInvalid = nameInputHasError || emailInputHasError;

  const submitHandler = (event) => {
    event.preventDefault();

    nameBlurHandler(true);
    emailBlurHandler(true);

    if (isFormInvalid) {
      return;
    }

    console.log({ name: enteredName, email: enteredEmail });

    resetNameInput();
    resetEmailInput();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputHasError ? 'form-control invalid' : 'form-control'}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name should not be empty</p>}
      </div>
      <div className={emailInputHasError ? 'form-control invalid' : 'form-control'}>
        <label htmlFor='name'>E-mail</label>
        <input type='text' id='email'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>E-mail should be valid address</p>}
      </div>
      <div className="form-actions">
        <button disabled={isFormInvalid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
