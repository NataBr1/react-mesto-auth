import React from "react";


function InfoTooltip ({ imgResAuth, textResAuth }) {
  return (
    <div className="popup__autorize" >
        <div className="popup__container">
          <img className="autorize__res-img"
            src={imgResAuth}
            alt={textResAuth}
          />
          <h2 className="autorize__res-text">{textResAuth}</h2>
          <button
            className="popup__closed link-hover"
            type="button"
            aria-label="Закрыть"
          />
        </div>
    </div>
  );
}

export default InfoTooltip ;
