import PageMainContent from '../PageMainContent/PageMainContent';
import AuthSection from '../AuthSection/AuthSection';
import { loginInputsData, additionalInputDataForRegistration, registerSectionData } from '../../utils/constants';

const registerInputsData = [additionalInputDataForRegistration, ...loginInputsData];

const RegisterPage = ({ isAuthPage }) => {
  return (
    <PageMainContent>
      <AuthSection
        isAuthPage={isAuthPage}
        inputsData={registerInputsData}
        sectionData={registerSectionData}
      />
    </PageMainContent>
  );
}

export default RegisterPage;
