import {useEffect} from 'react';

const PopupWithForm = ({
  title,
  buttonText,
  name,
  isOpen,
  onClose,
  onCloseClickOverlay,
  children,
  onSubmit,
  isLoading,
  buttonDisable,
}) => {
  function handleEscClose(evn) {
    if (evn.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div
      className={`modal modal_form_${name} ${isOpen ? 'modal_visible' : ''}`}
      tabIndex="-1"
      role="dialog"
      onMouseDown={onCloseClickOverlay}>
      <div className="modal__container" role="document">
        <button
          type="button"
          className="modal__button modal__button_action_close"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        <form
          className={`modal__form modal__form-${name}`}
          name={`${name}__form`}
          onSubmit={onSubmit}
          action="#">
          {children}
          <button
            disabled={isLoading || buttonDisable}
            type="submit"
            className={`modal__button modal__button_action_save
            ${isOpen && (isLoading || buttonDisable) ? 'modal__button_disabled' : ''}`}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
