import './FormLabel.css';
import InputError from '../InputError/InputError';
import { regExpForCheckInputName } from '../../utils/constants';

const FormLabel = (props) => {
  const {
    labelClassName,
    labelTextClassName,
    labelText,
    inputType,
    inputName,
    placeholder,
    inputClassName,
    minLength,
    maxLength,
    errors,
    handleChange,
    values,
    onFocus,
  } = props;

  return (
    <label className={labelClassName}>
      <span className={labelTextClassName}>
        {labelText}
      </span>
      <input
        type={inputType}
        name={inputName}
        id={inputName}
        required
        autoComplete='on'
        className={`input ${inputClassName}`}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[inputName] || ''}
        pattern={inputName === 'name' ? regExpForCheckInputName : null}
        title={inputName === 'name' ? 'Имя должно содержать только латиницу, кириллицу, дефисы и пробелы' : null}
        onFocus={onFocus}
      />
      <InputError
        inputName={inputName}
        errors={errors}
      />
    </label>
  );
};

export default FormLabel;
