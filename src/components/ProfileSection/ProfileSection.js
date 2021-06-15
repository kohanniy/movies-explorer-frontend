import React from 'react';
import './ProfileSection.css';
import Container from '../Container/Container';
import Title from '../Title/Title';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';
import { editProfileInputsData, formNames } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProfileSection = (props) => {
  const {
    isLoading,
    onUpdateUser,
    serverErrorMsg,
    resetServerErrorMsg,
    onSignoutButtonClick,
  } = props;

  const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useFormAndValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [resetForm, currentUser, setValues, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  function handleFocus(e) {
    e.preventDefault();
    resetServerErrorMsg();
  }

  return (
    <section className='profile'>
      <Container
        additionalClass='profile__section'
      >
        <Title titleClassName='profile__title'>
          {`Привет, ${currentUser.name}`}
        </Title>
        <Form
          name={formNames.editProfile}
          formClassName='profile__form'
          buttonClassName='profile__button profile__button_type_submit'
          buttonText={isLoading ? 'Данные отправляются...' : 'Редактировать'}
          onSubmit={handleSubmit}
          isDisabled={!isValid || (currentUser.name === values.name && currentUser.email === values.email) || isLoading}
          serverErrorMsg={serverErrorMsg}
        >
          {
            editProfileInputsData.map((item, index) => (
              <FormLabel
                key={index}
                labelClassName='profile__label'
                labelTextClassName='profile__label-text'
                labelText={item.labelText}
                inputType={item.inputType}
                inputName={item.inputName}
                inputClassName='profile__input'
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
        <button
          className='profile__button profile__button_type_signout'
          type='button'
          onClick={onSignoutButtonClick}
        >
          Выйти из аккаунта
        </button>
      </Container>
    </section>
  );
};

export default ProfileSection;
