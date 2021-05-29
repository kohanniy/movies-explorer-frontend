import './MoreButton.css';

const MoreButton = ({ additionalClass }) => {
  return (
    <button type='button' className={`more-button ${additionalClass}`} aria-label='показать другие фильмы'>
      Ещё
    </button>
  );
};

export default MoreButton;
