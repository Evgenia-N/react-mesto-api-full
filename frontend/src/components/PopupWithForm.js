import React from 'react';

export default function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <form className="popup__form" name={name} action="#" method="post" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

