import React from 'react';
import ProfileSection from '../ProfileSection/ProfileSection';
import PageMainContent from '../PageMainContent/PageMainContent';


const ProfilePage = ({ isLoading, onUpdateUser, serverErrorMsg, resetServerErrorMsg }) => {
  return (
    <PageMainContent>
      <ProfileSection
        isLoading={isLoading}
        onUpdateUser={onUpdateUser}
        serverErrorMsg={serverErrorMsg}
        resetServerErrorMsg={resetServerErrorMsg}
      />
    </PageMainContent>
  );
}

export default ProfilePage;
