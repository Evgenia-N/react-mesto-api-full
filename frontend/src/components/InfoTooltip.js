import react from "react";
import success from "../images/successful.svg";
import fail from "../images/failed.svg"

export default function InfoTooltip({isOpen, onClose, isSuccessful}) {
  return (
    <div className={`popup popup_type_registration-check ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_registration-check`}>
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        {isSuccessful
        ? (
          <div className="popup__registration-container">
            <img src={success} alt="Регистрация прошла успешно" className="popup__registration-icon" />
            <p className="popup__registration-text">Вы успешно зарегистрировались!</p>
          </div>)
         : 
          (<div className="popup__registration-container">
            <img src={fail} alt="Регистрация не произошла" className="popup__registration-icon" />
            <p className="popup__registration-text"> Что-то пошло не так! Попробуйте ещё раз.</p>
          </div>
        )} 
      </div> 
    </div>
  )
}
