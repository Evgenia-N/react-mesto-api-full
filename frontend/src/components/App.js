import React from 'react';
import { Routes, Route, Navigate, useNavigate, } from 'react-router-dom';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import RequireAuth from "./RequireAuth";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth';

export default function App() {
  const [loggedIn, setLoggedin] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const navigate = useNavigate();
  // const location = useLocation();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);
  const [isSuccessful, setisSuccessful] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const onRegister = (email, password) => {
    auth.register(email, password)
    .then((res)=> {
      console.log(res)
      if (res) {
        setisInfoTooltipOpen(true)
        setisSuccessful(true);
        setTimeout(() => {
          navigate('/sign-in');
          setisInfoTooltipOpen(false)}, 3000);
      }
    })
    .catch((err) => {
      setisInfoTooltipOpen(true)
      setisSuccessful(false);
      console.log(`${err}`)
    })
  }
  
  const onLogin = (email, password) => {
    auth.authorize(email, password)
    .then((data) => {
      if (!email || !password) {
        return;
      }
      // localStorage.setItem("token", data.token);
      setLoggedin(true);
      // auth.checkToken(localStorage.getItem("token")).then((res) => {
      //   if (res) {
      setUserData({ email });
       // }
      navigate("/");
      //});
    })
    .catch((err) => {
      setisInfoTooltipOpen(true)
      setisSuccessful(false);
      console.log(`${err}`)
    })
  }

  const handleLogout = () => {
  //  localStorage.removeItem('token');
    setUserData('');
    setLoggedin(false);
    navigate('/sign-in')
  }

//  const handleTokenCheck = (path) => {
//    if (localStorage.getItem('token')) {
 //     auth.checkToken(localStorage.getItem('token')).then((res) => {
  //      if(res) {
   //       setLoggedin(true);
 //         navigate(path);
 //         setUserData({email: res.email})
 //       }
  //    })
  //    .catch((err) => { 
  //      console.log(`${err}`) 
  //    }) 
  //  }
 // };

  //React.useEffect(() => {
  //  handleTokenCheck(location.pathname);
  //}, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((err) =>
        console.log(`${err}`))
    }
  }, [loggedIn]);

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    document.addEventListener('click', handleOverlayClick);
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    }
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    Api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`${err}`))
  }

  function handleUpdateAvatar({ avatar }) {
    Api.editProfilePic({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`${err}`))
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`${err}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const pressLike = isLiked ? Api.removeLike(card._id) : Api.addLike(card._id)
    pressLike.then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) =>
        console.log(`${err}`))
  } 

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) =>
      console.log(`${err}`))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setisInfoTooltipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleLogout} userData={userData} />
        <Routes>
          <Route 
            exact path='/' 
            element={
              <RequireAuth loggedIn={loggedIn}> 
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards} /> 
              </RequireAuth> 
            }
          />
          <Route 
            path='/sign-up' 
            element={<Register onRegister={onRegister}/>}
          />
          <Route 
            path='/sign-in' 
            element={<Login onLogin={onLogin}/>}
          />
          <Route 
            path='*' 
            element={<Navigate to='/' />}
          />
        </Routes>
        <Footer />
        <InfoTooltip isOpen={isInfoTooltipOpen} isSuccessful={isSuccessful} onClose={closeAllPopups}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
