import React from "react";

export default function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_fullscreen ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__fullscreen">
                <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    );
}
