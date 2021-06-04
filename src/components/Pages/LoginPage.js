import PageMainContent from '../PageMainContent/PageMainContent';
import AuthSection from '../AuthSection/AuthSection';
import { loginInputsData, loginSectionData } from '../../utils/constants';

const LoginPage = (props) => {
  const {
    isAuthPage,
    onLoginFormSubmit,
    isLoading,
    serverErrorMsg,
  } = props;

  return (
    <PageMainContent>
      <AuthSection
        isAuthPage={isAuthPage}
        inputsData={loginInputsData}
        sectionData={loginSectionData}
        isLoading={isLoading}
        onFormSubmit={onLoginFormSubmit}
        serverErrorMsg={serverErrorMsg}
      />
    </PageMainContent>
  );
}

export default LoginPage;
