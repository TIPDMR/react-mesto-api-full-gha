import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import useValidation from '../hooks/useValidation';

const AddPlacePopup = ({isOpen, onClose, onCloseClickOverlay, onAddPlace, isLoading}) => {
  const [formValid, setFormValid] = useState(false);
  const name = useValidation();
  const image = useValidation();
  const classError = `modal__input-error ${!formValid ? 'modal__error_visible' : ''}`;

  useEffect(() => {
    if (!isOpen) return;

    return () => {
      name.setValue('');
      name.setInputError('');
      name.setInputValid(false);

      image.setValue('');
      image.setInputError('');
      image.setInputValid(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (name.inputValid && image.inputValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name.inputValid, image.inputValid, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name.value, image.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="img-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonDisable={!formValid}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_card-name"
        pattern="^((?!\s{2}).)*$"
        type="text"
        name="card-name"
        id="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={name.handleChange}
        value={name.value}
        required
      />
      <span className={classError}>{name.inputError}</span>
      <input
        className="modal__input modal__input_name_card-img"
        name="card-img"
        id="card-img"
        placeholder="Ссылка на картинку"
        onChange={image.handleChange}
        type="url"
        value={image.value}
        required
      />
      <span className={classError}>{image.inputError}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
