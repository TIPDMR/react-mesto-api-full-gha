import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Preloader from './Preloader';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Api from '../utils/api';
import avatar from '../images/profile/ava.png';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCard from './ConfirmDeleteCard';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import errorImage from '../images/ui/error.svg';
import successImage from '../images/ui/success.svg';
import {register, authorize, checkToken, logout} from '../utils/Auth';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false});
  const [isPreloaderHide, setPreloaderHide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...', about: 'Загрузка...', avatar,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImage, setTooltipImage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getUserInfo(), Api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          console.log(typeof cards);
          setCards(cards);
        })
        .catch((err) => console.log(err))
        .finally(() => onPreloaderHide());
    } else {
      onPreloaderHide();
    }
  }, [loggedIn]);

  /**
   * Проверка токена
   */
  useEffect(() => {
    if (!loggedIn) {
      checkToken()
        .then((res) => {
          if (res && res.email) {
            setUserEmail(res.email);
            setLoggedIn(true);
            navigate('/', {replace: true});
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Выход
   */
  const handleExit = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        setUserEmail('');
        navigate('/sign-in', {replace: true});
      })
      .catch((res) => {
        setTooltipImage(errorImage);
        setTooltipText(res);
        setIsTooltipPopupOpen(true);
      });
  };

  /**
   * Авторизация
   * @param email
   * @param password
   */
  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.email) {
          setUserEmail(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((res) => {
        setTooltipImage(errorImage);
        setTooltipText(res);
        setIsTooltipPopupOpen(true);
      });
  };

  /**
   * Регистрация
   * @param email
   * @param password
   */
  const handleRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        setTooltipImage(successImage);
        setTooltipText('Вы успешно зарегистрировались!');
        navigate('/sign-in', {replace: true});
      })
      .catch((res) => {
        setTooltipImage(errorImage);
        setTooltipText(res);
      })
      .finally(() => setIsTooltipPopupOpen(true));
  };

  /**
   * Установка Like
   * @param card
   */
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const requestLiked = isLiked ? Api.delLike(card._id) : Api.setLike(card._id);

    requestLiked
      .then((newCard) => {
        setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch((err) => console.log(err));
  }

  /**
   * Удаление карточки
   * @param card
   */
  function handleCardDelete(card) {
    setIsLoading(true);
    Api.delCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Обновление данных
   * Пользователя
   * @param name
   * @param about
   */
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    Api.setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Обновление аватара
   * Пользователя
   * @param avatar
   */
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    Api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Добавление новой карточки
   * @param name
   * @param link
   */
  function handleAddPlace(name, link) {
    setIsLoading(true);
    Api.setCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onPreloaderHide() {
    setPreloaderHide(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleConfirmPopupOpen(card) {
    setSelectedCard({isOpen: false, ...card});
    setConfirmPopupOpen(!isConfirmPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen: true, ...card});
  }

  function closeAllPopups() {
    setConfirmPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false});
    setIsTooltipPopupOpen(false);
  }

  function onCloseClickOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (<CurrentUserContext.Provider value={currentUser}>
    <CardsContext.Provider value={cards}>
      <div className="page">
        <Header onExit={handleExit} userEmail={userEmail}/>
        <Routes>
          <Route
            path="/sign-up"
            element={<Register isLoading={isLoading} loggedIn={loggedIn} onRegister={handleRegister}/>}
            loggedIn={loggedIn}
          />
          <Route
            path="/sign-in"
            element={<Login isLoading={isLoading} loggedIn={loggedIn} onLogin={handleLogin}/>}
            loggedIn={loggedIn}
            handleLogin={handleLogin}
          />
          <Route
            path="/"
            element={<ProtectedRoute
              element={Main}
              path="/"
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onConfirmPopupOpen={handleConfirmPopupOpen}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />}
          />
        </Routes>
        <Footer/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ConfirmDeleteCard
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
          onClickConfirm={handleCardDelete}
          isLoading={isLoading}
          card={selectedCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
        />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          onCloseClickOverlay={onCloseClickOverlay}
          text={tooltipText} // "Что-то пошло не так! Попробуйте ещё раз."
          image={tooltipImage} // "Что-то пошло не так! Попробуйте ещё раз."
        />
        <Preloader isHide={isPreloaderHide}/>
      </div>
    </CardsContext.Provider>
  </CurrentUserContext.Provider>);
};

export default App;
