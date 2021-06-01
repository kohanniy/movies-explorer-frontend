import './Title.css';

const Title = ({ titleClassName, children }) => {
  return (
    <h2 className={`title ${titleClassName}`}>
      {children}
    </h2>
  );
};

export default Title;
