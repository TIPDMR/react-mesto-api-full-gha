import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

const EditAvatarPopup = ({ isOpen, onClose, onCloseClickOverlay, onUpdateAvatar, isLoading }) => {
  const inputAvatar = useRef(null);
  const [formValid, setFormValid] = useState(false);
  const avatar = useValidation();
  const classError = `modal__input-error ${!formValid ? 'modal__error_visible' : ''}`;

  useEffect(() => {
    if (!isOpen) return;
    return () => {
      avatar.setValue('');
      avatar.setInputError('');
      avatar.setInputValid(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (avatar.inputValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [avatar.inputValid, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputAvatar.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="avatar-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonDisable={!formValid}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_avatar-link"
        type="url"
        ref={inputAvatar}
        name="avatar-link"
        id="avatar-link"
        value={avatar.value}
        onChange={avatar.handleChange}
        placeholder="https://somewebsite.com/someimage.jpg"
        required
      />
      <span className={classError}>{avatar.inputError}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
