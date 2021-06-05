import PageMainContent from '../PageMainContent/PageMainContent';
import AuthSection from '../AuthSection/AuthSection';
import { loginInputsData, additionalInputDataForRegistration, registerSectionData, formNames } from '../../utils/constants';

const registerInputsData = [additionalInputDataForRegistration, ...loginInputsData];

const RegisterPage = (props) => {
  const {
    isAuthPage,
    onRegisterFormSubmit,
    isLoading,
    serverErrorMsg,
    resetServerErrorMsg,
  } = props;

  return (
    <PageMainContent>
      <AuthSection
        formName={formNames.register}
        isAuthPage={isAuthPage}
        inputsData={registerInputsData}
        sectionData={registerSectionData}
        isLoading={isLoading}
        onFormSubmit={onRegisterFormSubmit}
        serverErrorMsg={serverErrorMsg}
        resetServerErrorMsg={resetServerErrorMsg}
      />
    </PageMainContent>
  );
}

export default RegisterPage;
