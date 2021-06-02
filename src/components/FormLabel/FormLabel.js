import './FormLabel.css';
import InputError from '../InputError/InputError';

const FormLabel = (props) => {
  const {
    labelClassName,
    labelTextClassName,
    labelText,
    inputDir,
    inputType,
    inputName,
    placeholder,
    inputClassName,
    minLength,
    maxLength,
    defaultValue,
  } = props;

  return (
    <label className={labelClassName}>
      <span className={labelTextClassName}>
        {labelText}
      </span>
      <input
        dir={inputDir}
        type={inputType}
        name={inputName}
        id={inputName}
        required
        autoComplete='off'
        className={inputClassName}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      <InputError
        inputName={inputName}
      />
    </label>
  );
};

export default FormLabel;
