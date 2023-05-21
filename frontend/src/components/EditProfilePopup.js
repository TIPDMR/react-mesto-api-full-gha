import {useEffect,useContext, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useValidation from '../hooks/useValidation';

const EditProfilePopup = ({ isOpen, onClose, onCloseClickOverlay, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [formValid, setFormValid] = useState(false);
  const classError = `modal__input-error ${!formValid ? 'modal__error_visible' : ''}`;
  const name = useValidation();
  const description = useValidation();

  useEffect(() => {
    if (!isOpen) return;
    name.setValue(currentUser.name);
    description.setValue(currentUser.about);
    name.setInputValid(true);
    description.setInputValid(true);
    return () => {
      name.setValue('');
      name.setInputError('');
      description.setValue('');
      description.setInputError('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(
    (e) => {
      if (!isOpen) return;
      if (name.inputValid && description.inputValid) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    },
    [name.inputValid, description.inputValid, isOpen]
  );

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name.value, description.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonDisable={!formValid}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_name"
        pattern="^((?!\s{2}).)*$"
        type="text"
        name="user-name"
        id="user-name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name.value}
        onChange={name.handleChange}
        required
      />
      <span className={classError}>{name.inputError}</span>
      <input
        className="modal__input modal__input_name_about"
        pattern="^((?!\s{2}).)*$"
        type="text"
        name="user-about"
        id="user-about"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={description.value}
        onChange={description.handleChange}
        required
      />
      <span className={classError}>{description.inputError}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
