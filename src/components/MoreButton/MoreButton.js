import './MoreButton.css';

const MoreButton = ({ additionalClass, onMoreButtonClick, moreButtonShow }) => {
  return (
      moreButtonShow
        ? <button
            type='button'
            className={`more-button ${additionalClass}`}
            aria-label='показать другие фильмы'
            onClick={onMoreButtonClick}
          >
            Ещё
          </button>
        : null
  );
};

export default MoreButton;
