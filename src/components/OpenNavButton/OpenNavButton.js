import './OpenNavButton.css';

const OpenNavButton = ({ handleOpenNavButtonClick, isHomePage }) => {
  let classes = 'open-button';

  if (isHomePage) classes += ' open-button_is-home';

  return (
    <button
      onClick={handleOpenNavButtonClick}
      type='button'
      aria-label='открыть меню'
      className={classes}
    />
  );
}

export default OpenNavButton;
