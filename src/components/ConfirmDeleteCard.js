import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function ConfirmDeleteCard({ isOpen, onClose, isLoading, onDeleteCard, card}) {

  usePopupClose(isOpen, onClose);

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
      <div className={`popup popup_deletecard ${isOpen ? `popup_opened`: ""}`}>
          <div className="popup__container">
              <form
                  className="popup__form popup__form_delete"
                  name="popupFormDelete"
                  onSubmit={handleSubmit}
                  >
                  <h2 className="popup__title popup__title_deletecard">Вы уверены?</h2>
                  <button className="popup__button" type="submit" aria-label="Да">{isLoading ? 'Удаление...' : 'Да'}</button>
              </form>
              <button
                  className="popup__closed link-hover confirmation"
                  type="button"
                  aria-label="Закрыть"
                  onClick={onClose}
              />
          </div>
      </div>
  );
}

export default ConfirmDeleteCard;
