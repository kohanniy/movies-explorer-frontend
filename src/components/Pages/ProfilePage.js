import React from 'react';
import ProfileSection from '../ProfileSection/ProfileSection';
import PageMainContent from '../PageMainContent/PageMainContent';


const ProfilePage = ({ isLoading, onUpdateUser, serverErrorMsg, resetServerErrorMsg, onSignoutButtonClick }) => {
  return (
    <PageMainContent>
      <ProfileSection
        isLoading={isLoading}
        onUpdateUser={onUpdateUser}
        serverErrorMsg={serverErrorMsg}
        resetServerErrorMsg={resetServerErrorMsg}
        onSignoutButtonClick={onSignoutButtonClick}
      />
    </PageMainContent>
  );
}

export default ProfilePage;
