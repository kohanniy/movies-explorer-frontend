const Section = ({ additionalClass, children }) => {
  return (
    <div className={`section ${additionalClass}`}>
      {children}
    </div>
  );
}

export default Section;
