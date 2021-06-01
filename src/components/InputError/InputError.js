import './InputError.css';

const InputError = ({ inputName, children }) => {
  return (
    <span
      id={`${inputName}-error`}
      className='input-error'
    >
      {children}
    </span>
  );
};

export default InputError;
