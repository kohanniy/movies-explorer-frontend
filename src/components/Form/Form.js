import React from 'react';
import './Form.css';

const Form = (props) => {
  const {
    name,
    formClassName,
    buttonClassName,
    buttonText,
    children,
    onSubmit,
    isDisabled,
    serverErrorMsg,
    isLoading,
  } = props;

  let buttonClasses = `form__submit ${buttonClassName}`;

  if (isDisabled) buttonClasses += ' form__submit_disabled';

  return (
    <form
      onSubmit={onSubmit}
      className={`form ${formClassName}`}
      name={name}
      noValidate
    >
      {children}
      <p className='form__server-err'>
        {serverErrorMsg}
      </p>
      <button
        type='submit'
        className={buttonClasses}
        disabled={isDisabled || isLoading}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
