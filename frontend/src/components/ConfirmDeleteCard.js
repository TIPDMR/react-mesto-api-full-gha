import PopupWithForm from './PopupWithForm';

const ConfirmDeleteCard = ({
  isOpen,
  onClose,
  onCloseClickOverlay,
  onClickConfirm,
  isLoading,
  card,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    onClickConfirm(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseClickOverlay={onCloseClickOverlay}
      isLoading={isLoading}
    />
  );
};

export default ConfirmDeleteCard;
