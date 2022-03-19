import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      name='edit-profile-pic' 
      title='Обновить аватар' 
      buttonText='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input popup__input_type_pic" 
        type="url" id="pic-input" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        ref={avatarRef} 
        required 
      />
      <span 
        className="popup__error pic-input-error" 
        id="pic-input-error">
      </span>
    </PopupWithForm>
  );
}
