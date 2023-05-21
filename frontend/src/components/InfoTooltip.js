import React from 'react';

const InfoTooltip = ({ isOpen, onClose, onCloseClickOverlay, image, text }) => (
  <div
    className={`modal modal__tooltip ${isOpen && 'modal_visible'}`}
    tabIndex="-1"
    role="dialog"
    onClick={onCloseClickOverlay}>
    <div className="modal__container modal__container_type_tooltip" role="document">
      <button
        type="button"
        className="modal__button modal__button_action_close"
        onClick={onClose}
      />
      <img className="modal__tooltip-img" src={image} alt={text} />
      <span className="modal__tooltip-text">{text}</span>
    </div>
  </div>
);

export default InfoTooltip;
