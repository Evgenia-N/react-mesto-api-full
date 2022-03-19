import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
    <section className="profile section page__profile">
      <img src={currentUser.avatar} alt="Фото профиля" className="profile__pic" />
      <button onClick={onEditAvatar} className="profile__pic-edit-button"></button>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>
      <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить фото"></button>
    </section>
    
    <section className="elements section page__elements">
      {cards.map(
        (card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        )
      )}
    </section>
  </main>
  )
}