import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace}) {
  const placeRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: placeRef.current.value,
      link: linkRef.current.value
    });
  }
  
  return (
    <PopupWithForm name='add-image' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_place" id = "place-input" type="text" name="place" placeholder="Название"  minLength="2" maxLength="30" ref={placeRef} required />
      <span className ="popup__error place-input-error" id="place-input-error"></span>
      <input className="popup__input popup__input_type_url" id = "url-input" type="url" name="link" placeholder="Ссылка на картинку" ref={linkRef} required />
      <span className="popup__error url-input-error" id="url-input-error"></span>
    </PopupWithForm>
  );
}
