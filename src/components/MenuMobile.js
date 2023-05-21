import React from "react";
import { Link } from "react-router-dom";

function MenuMobile({isOpen, onClick, email, title, link}) {
  return (
    <div className={`${isOpen ? "autorize__wrapper_opened": "autorize__wrapper"}`}>
        <div className="autorize__mobile">
            <span className="autorize__email">{email}</span>
            <Link to={link} onClick={onClick} className="autorize__exit link-hover">{title}</Link>
        </div>
    </div>

  )
}

export default MenuMobile;
