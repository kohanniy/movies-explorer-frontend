import './FormLabel.css';
import InputError from '../InputError/InputError';
import { regExpForCheckInputName } from '../../utils/constants';

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
    errors,
    handleChange,
    values
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
        autoComplete='on'
        className={inputClassName}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[inputName] || ''}
        pattern={inputName === 'name' ? regExpForCheckInputName : null}
        title={inputName === 'name' ? 'Имя должно содержать только латиницу, кириллицу, дефисы и пробелы' : null}
      />
      <InputError
        inputName={inputName}
        errors={errors}
      />
    </label>
  );
};

export default FormLabel;
