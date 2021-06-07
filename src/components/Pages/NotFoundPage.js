import NotFound from '../NotFound/NotFound';
import PageMainContent from '../PageMainContent/PageMainContent';

const NotFoundPage = ({ onButtonClick }) => {
  return (
    <PageMainContent>
      <NotFound
        onButtonClick={onButtonClick}
      />
    </PageMainContent>
  )
};

export default NotFoundPage;

