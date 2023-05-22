import React from "react";
import logo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header({onClick, email, title, link, openMenuMobile, closeMenuMobile, isOpen, loggedIn}) {
  return (
    <>
      <div className={`${isOpen ? "autorize__wrapper_opened": "autorize__wrapper"}`}>
          <div className="autorize__mobile">
              <span className="autorize__email">{email}</span>
              <Link to={link} onClick={onClick} className="autorize__exit link-hover">{title}</Link>
          </div>
      </div>

      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <div className={`${loggedIn ? "autorize" : ""}`}>
          <span className="autorize__email">{email}</span>
            <Link to={link} onClick={onClick} className="autorize__entry link-hover">{title}</Link>
        </div>

        {loggedIn && (
          <>
            <button onClick={openMenuMobile} className={`${isOpen ? "menu-mobile_disactive": "menu-mobile link-hover"}`}>
              <hr className="menu-mobile__line"></hr>
              <hr className="menu-mobile__line"></hr>
              <hr className="menu-mobile__line"></hr>
            </button>
            <button onClick={closeMenuMobile} className={`${isOpen ? "autorize__closed": "autorize__closed_disactive"}`}>
            </button>
          </>
        )}

      </header>
    </>
  )
}

export default Header;
