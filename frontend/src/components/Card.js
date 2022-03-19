import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = 
    (`${isOwn 
      ? 'elements__delete-button' 
      : 'elements__delete-button_hidden'}`
    ); 

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = 
    (`elements__like-button ${isLiked ? 'elements__like-button_active' : ''}`
    ); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <div className="elements__card">
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото" onClick={handleDeleteClick}></button>
      <div className = "elements__photo-container">
        <img className="elements__photo" src={card.link} alt={card.name} onClick={handleClick}/>
      </div>
      <div className="elements__container">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Отметить понравившееся фото"></button>
          <span className="elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}