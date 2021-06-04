import PageMainContent from '../PageMainContent/PageMainContent';
import AuthSection from '../AuthSection/AuthSection';
import { loginInputsData, additionalInputDataForRegistration, registerSectionData } from '../../utils/constants';

const registerInputsData = [additionalInputDataForRegistration, ...loginInputsData];

const RegisterPage = (props) => {
  const {
    isAuthPage,
    onRegisterFormSubmit,
    isLoading,
    serverErrorMsg,
  } = props;

  return (
    <PageMainContent>
      <AuthSection
        isAuthPage={isAuthPage}
        inputsData={registerInputsData}
        sectionData={registerSectionData}
        isLoading={isLoading}
        onFormSubmit={onRegisterFormSubmit}
        serverErrorMsg={serverErrorMsg}
      />
    </PageMainContent>
  );
}

export default RegisterPage;
