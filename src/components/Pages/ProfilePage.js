import ProfileSection from '../ProfileSection/ProfileSection';
import PageMainContent from '../PageMainContent/PageMainContent';
import InfoPopup from '../InfoPopup/InfoPopup';

const ProfilePage = (props) => {
  const {
    isLoading,
    onUpdateUser,
    serverErrorMsg,
    resetServerErrorMsg,
    onSignoutButtonClick,
    isPopupOpen,
    onClosePopup,
    result,
  } = props;

  return (
    <>
      <PageMainContent>
        <ProfileSection
          isLoading={isLoading}
          onUpdateUser={onUpdateUser}
          serverErrorMsg={serverErrorMsg}
          resetServerErrorMsg={resetServerErrorMsg}
          onSignoutButtonClick={onSignoutButtonClick}
        />
      </PageMainContent>
      <InfoPopup
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        result={result}
      />
    </>
  );
}

export default ProfilePage;
