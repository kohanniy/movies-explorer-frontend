import PageMainContent from '../PageMainContent/PageMainContent';
import AuthSection from '../AuthSection/AuthSection';
import { loginInputsData, loginSectionData } from '../../utils/constants';

const LoginPage = ({ isAuthPage }) => {
  return (
    <PageMainContent>
      <AuthSection
        isAuthPage={isAuthPage}
        inputsData={loginInputsData}
        sectionData={loginSectionData}
      />
    </PageMainContent>
  );
}

export default LoginPage;
