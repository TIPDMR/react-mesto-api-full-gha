const ImagePopup = ({ card, onClose, onCloseClickOverlay }) => {
  const { link, name } = card;
  return (
    <div
      className={`modal modal_zoom_in ${card.isOpen && 'modal_visible'}`}
      tabIndex="-1"
      role="dialog"
      onClick={onCloseClickOverlay}
    >
      <div className="modal__img-container" role="document">
        <button
          type="button"
          className="modal__button modal__button_action_close"
          onClick={onClose}
        />
        <figure className="modal__figure">
          <img src={link} className="modal__img" alt={name} />
          <figcaption className="modal__figcaption">{name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
