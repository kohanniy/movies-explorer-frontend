import './Section.css';

const Section = ({ isAuthPage, additionalClass, children }) => {
  let sectionClasses = 'section';

  isAuthPage ? sectionClasses += ' section_pages_auth' : sectionClasses += ' section_pages_all';

  return (
    <div className={`${sectionClasses} ${additionalClass}`}>
      {children}
    </div>
  );
};

export default Section;
