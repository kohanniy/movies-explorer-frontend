import './Container.css';

const Container = ({ isAuthPage, additionalClass, children }) => {
  let containerClasses = 'container';

  isAuthPage
    ? containerClasses += ' container_pages_auth'
    : containerClasses += ' container_pages_all';

  return (
    <div className={`${containerClasses} ${additionalClass}`}>
      {children}
    </div>
  );
};

export default Container;
