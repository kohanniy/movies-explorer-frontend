import React from 'react';
import { Link } from 'react-router-dom'
import './AuthSection.css';
import Title from '../Title/Title';
import Container from '../Container/Container';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';


const AuthSection = (props) => {
  const {
    isAuthPage,
    inputsData,
    sectionData,
    isLoading,
    onFormSubmit,
    serverErrorMsg,
    resetServerErrorMsg,
    formName,
  } = props;

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
    resetServerErrorMsg();
  }, [resetForm, resetServerErrorMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(values);
  }

  const handleFocus = (e) => {
    e.preventDefault();
    resetServerErrorMsg();
  }

  return (
    <section className='auth'>
      <Container
        additionalClass='auth__container'
        isAuthPage={isAuthPage}
      >
        <Title
          titleClassName='auth__title'
        >
          {sectionData.title}
        </Title>
        <Form
          name={formName}
          formClassName='auth__form'
          buttonClassName='auth__submit'
          onSubmit={handleSubmit}
          isDisabled={!isValid}
          buttonText={isLoading ? 'Данные отправляются...' : sectionData.buttonText}
          serverErrorMsg={serverErrorMsg}
        >
          {
            inputsData.map((item, index) => (
              <FormLabel
                key={index}
                labelClassName='auth__label'
                labelTextClassName='auth__label-text'
                labelText={item.labelText}
                inputType={item.inputType}
                inputName={item.inputName}
                inputClassName='auth__input'
                minLength={item.minLength}
                maxLength={item.maxLength}
                placeholder={item.placeholder}
                handleChange={handleChange}
                values={values}
                errors={errors}
                onFocus={handleFocus}
                isLoading={isLoading}
              />
            ))
          }
        </Form>
        <p className='auth__text'>
          {sectionData.text}&nbsp;
          <Link
            className='auth__link'
            to={sectionData.link}
          >
            {sectionData.linkText}
          </Link>
      </p>
      </Container>
    </section>
  );
};

export default AuthSection;
