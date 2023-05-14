import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import ConfirmDeleteCard from './ConfirmDeleteCard';
import Login from './Login';
import Register from './Register';
//import InfoTooltip from './InfoTooltip ';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/Api";
import * as auth from '../utils/auth.js';
import success from '../images/success.svg'
import error from '../images/error.svg'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isViewPhoto, setIsViewPhoto] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    api.getInitialCards()
      .then(cardData => {
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }, []);

  function handleRegister (password, email) {
    auth.register(password, email)
      .then(() => {
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function handleLogin () {
    setLoggedIn(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    } else {
      api.removeLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
      });
    }
  }

 //удаление карточки
 function handleCardDelete(card) {
  api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  //изменение данных о пользователе
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  //смена аватара
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardClick(card) {
    setIsViewPhoto(true)
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsViewPhoto(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Header title="Регистрация" link="/sign-up"/>
              <Login handleLogin={handleLogin} />
            </>
          } />
          <Route path="/sign-up" element={
            <>
              <Header title="Войти" link="/sign-in"/>
              <Register handleRegister={handleRegister} />
            </>
          } />
          <Route path="/" element={<ProtectedRoute element={
            <>
              <Header email="email@mail.ru" title="Выйти" />
              <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  cards={cards} />
              <Footer />
            </>
          } loggedIn={loggedIn} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
        </Routes>

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />
        <PopupWithForm name="deletecard" title="Вы уверены?" buttonTitle="Да" />
        <ImagePopup
            isOpen={isViewPhoto}
            onClose={closeAllPopups}
            card={selectedCard}/>
        <ConfirmDeleteCard
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading}/>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;