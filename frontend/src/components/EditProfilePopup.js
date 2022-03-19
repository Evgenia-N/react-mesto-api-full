import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name='edit-profile' 
      title='Редактировать профиль' 
      buttonText='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}>
      <input 
        className="popup__input popup__input_type_name" 
        id="name-input" 
        type="text" 
        name="name" 
        placeholder="ФИО" 
        minLength="2" 
        maxLength="40" 
        value={name || '' }
        onChange={handleNameChange} 
        required />
      <span className ="popup__error name-input-error" id="name-input-error"></span>
      <input 
        className="popup__input popup__input_type_about-self" 
        id="job-input" 
        type="text" 
        name="about" 
        placeholder="О себе" 
        minLength="2" 
        maxLength="200" 
        value={description || '' }
        onChange={handleDescriptionChange} 
        required />
      <span className ="popup__error job-input-error" id="job-input-error"></span>
    </PopupWithForm>
  );
}
