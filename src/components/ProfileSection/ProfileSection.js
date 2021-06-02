import './ProfileSection.css';
import Container from '../Container/Container';
import Title from '../Title/Title';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel'
import { editProfileInputsData } from '../../utils/constants';

const ProfileSection = () => {
  return (
    <section className='profile'>
      <Container
        additionalClass='profile__section'
      >
        <Title titleClassName='profile__title'>
          Привет, Виталий!
        </Title>
        <Form
          name='edit-profile'
          formClassName='profile__form'
          buttonClassName='profile__button profile__button_type_submit'
          buttonText='Редактировать'
        >
          {
            editProfileInputsData.map((item, index) => (
              <FormLabel
                key={index}
                labelClassName='profile__label'
                labelTextClassName='profile__label-text'
                labelText={item.labelText}
                inputDir='rtl'
                inputType={item.inputType}
                inputName={item.inputName}
                inputClassName='profile__input'
                minLength={item.minLength}
                maxLength={item.maxLength}
                defaultValue={item.defaultValue}
                placeholder={item.placeholder}
              />
            ))
          }
        </Form>
        <button
          className='profile__button profile__button_type_signout'
          type='button'
        >
          Выйти из аккаунта
        </button>
      </Container>
    </section>
  );
};

export default ProfileSection;
