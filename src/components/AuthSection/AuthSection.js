import { Link } from 'react-router-dom'
import './AuthSection.css';
import Title from '../Title/Title';
import Container from '../Container/Container';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';


const AuthSection = (props) => {
  const { isAuthPage, inputsData, sectionData } = props

  return (
    <section className='auth'>
      <Container
        additionalClass='auth__container'
        isAuthPage={isAuthPage}
      >
        <Title
          titleClassName='auth__title'
        >
          Рады видеть!
        </Title>
        <Form
          name='login'
          formClassName='auth__form'
          buttonClassName='auth__submit'
          buttonText={sectionData.buttonText}
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
                defaultValue={item.defaultValue}
                placeholder={item.placeholder}
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
