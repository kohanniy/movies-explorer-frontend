import './CloseButton.css';

const CloseButton = ({classes, handleCloseNavButtonClick}) => {
  return (
    <button
      onClick={handleCloseNavButtonClick}
      className={`close-button ${classes}`}
      type='button'
      aria-label='закрыть'
    >
      <span className='close-button__x'></span>
      <span className='close-button__x'></span>
    </button>
  );
}

export default CloseButton;
