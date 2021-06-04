import './InputError.css';

const InputError = ({ inputName, errors }) => {
  return (
    <span
      id={`${inputName}-error`}
      className='input-error'
    >
      {errors[inputName] || ''}
    </span>
  );
};

export default InputError;
