import './InfoPopup.css';
import { stopPropagation } from '../../utils/utils';

const InfoPopup = (props) => {
  const { isOpen, onClose, result } = props;

  return (
    <div onClick={onClose} className={`info-popup ${isOpen ? 'info-popup_opened' : 'info-popup_closed'}`}>
      <div onClick={stopPropagation} className='info-popup__container'>
        <div className='info-popup__icon'></div>
        <h3 className='info-popup__heading'>{result}</h3>
        <button
          onClick={onClose}
          type='button'
          aria-label='Закрыть' className='info-popup__close-btn'
        />
      </div>
    </div>
  );
}

export default InfoPopup;
