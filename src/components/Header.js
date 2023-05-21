import React from "react";
import logo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header({onClick, email, title, link, openMenuMobile, closeMenuMobile, isOpen}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Изображение логотипа"
      />
      <div className="autorize">
        <span className="autorize__email">{email}</span>
        <Link to={link} onClick={onClick} className="autorize__entry link-hover">{title}</Link>
      </div>
      <button onClick={openMenuMobile} className={`${isOpen ? "menu-mobile_disactive": "menu-mobile link-hover"}`}>
        <hr className="menu-mobile__line"></hr>
        <hr className="menu-mobile__line"></hr>
        <hr className="menu-mobile__line"></hr>
      </button>
      <button onClick={closeMenuMobile} className={`${isOpen ? "autorize__closed": "autorize__closed_disactive"}`}>
      </button>
    </header>
  )
}

export default Header;
