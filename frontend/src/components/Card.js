import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onConfirmPopupOpen, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const {name, link, likes} = card;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onConfirmPopupOpen(card);
  }

  return (
    <li className="photo-gallery__element">
      <article className="photo-gallery__card">
        <img className="photo-gallery__image" alt={name} src={link} onClick={handleClick}/>
        <div className="photo-gallery__figcaption">
          <h2 className="photo-gallery__title">{name}</h2>
          <div className="photo-gallery__like-container">
            <button
              type="button"
              onClick={handleLikeClick}
              className={`photo-gallery__button photo-gallery__button_action_like
               ${isLiked && 'photo-gallery__button_active'}`}
            />
            <span className="photo-gallery__likes-number">{likes.length}</span>
          </div>
        </div>
        {isOwn && (
          <button
            type="button"
            className="photo-gallery__button photo-gallery__button_action_trash"
            onClick={handleDeleteClick}
          />
        )}
      </article>
    </li>
  );
};

export default Card;
