import './Form.css';

const Form = (props) => {
  const {
    name,
    formClassName,
    buttonClassName,
    buttonText,
    children,
  } = props;

  return (
    <form
      className={`form ${formClassName}`}
      name={name}
      noValidate
    >
      {children}
      <button
        type='submit'
        className={`form__submit ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
