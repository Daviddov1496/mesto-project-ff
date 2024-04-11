import "../index.css";
import { initialCards } from "./cards.js";
import { enableValidation, clearValidation } from "./validation.js";
import { openModal, closeModal, closeModalOnEsc, closePopupOnOverlay } from "./modal.js";
import { isLiked, createCard, deleteCard } from "./card.js";

import { getInitialCards, addNewCard, deleteCardApi, getUserInfo, patchUserInfo, addLikeCard, deleteLikeCard, newAvatar } from './api.js'
import { data } from "jquery";

//Формы из DOM
export const formEditProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];
export const avatarFormElement = document.forms["edit-avatar"];
export const deleteCardForm = document.forms["delete-card"];

//Сприсок мест 
const placesList = document.querySelector(".places__list");
const formElement = document.querySelector('.popup__form');

//Изображене и его попап
export const popupImage = document.querySelector(".popup__image");
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupList =  Array.from(document.querySelectorAll('.popup'));
export const bigImageCaption = document.querySelector('.popup__caption')

//Аватар
export const avatarPopup = document.querySelector('.popup_type_new-avatar') 
export const avatarImage = document.querySelector(".profile__image");
export const avatarForm = document.querySelector(".popup_type_avatar");
//export const newAvatarForm = document.forms.edit_avatar;
export const avatarInput = avatarFormElement.elements.avatar;
//Карточка профиля
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.description;
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");

//Карточка места
export const inputNameFormPlace = formNewPlace.elements["place_name"];
export const inputNameFormLink = formNewPlace.elements.link;

//Кнопки
export const popupButton = document.querySelectorAll(".button");
const closeButtonList = Array.from(document.querySelectorAll('.popup__close'));
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

//Попап карточек
const popupNewCard = document.querySelector(".popup_type_new-card");
const cardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
const cardLinkInput =  popupNewCard.querySelector(".popup__input_type_url");
const popupEditProfile = document.querySelector(".popup_type_edit");

//renderLoading
const buttonTextWhileLoading = 'Сохранение...'
const buttonTextNormal = 'Сохранить'




//Формы для валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// IMAGE //переделано
export function openModalImage(item) {
  popupImage.link = item.link;// картинка
  popupImage.alt = item.alt;// alt в html
  bigImageCaption.textContent = item.name;// подпись при открытии картинки
  openModal(popupTypeImage);
}

// Функция обработки загрузки //переделано
function renderLoading(isFetching, button) {
  if (isFetching) {
    button.textContent = buttonTextWhileLoading;
    button.setAttribute('disabled', true);
  }
  else {
    button.textContent = buttonTextNormal
    button.removeAttribute('disabled');
  }
}
// Функция открытия модального окна "редактировать профиль" //переделано
function openProfileEdit() {
  nameInput.value = profileTitle.name;
  jobInput.value = profileDescription.about;
  openModal(popupEditProfile);
  clearValidation(popupEditProfile);
}
// Функция открытия модального окна "добавить карточку" //переделано
function openProfileAddPopup() {
  openModal(popupNewCard);
  clearValidation(popupNewCard);
}
// Функция открытия модального окна "редактировать аватар" //переделано
function openAvatarEdit() {
  openModal(avatarForm);
  clearValidation(avatarPopup);
}

// PLACE SUBMIT //переделано
function placeFormSubmit(evt) {
evt.preventDefault();
renderLoading(true, popupButton);
addNewCard(cardNameInput.value, cardLinkInput.value)
  .then((data) => {
    const card = createCard( data, data.owner, openModalImage );
    placesList.prepend(card);
    closeModal(popupNewCard);
    formNewPlace.reset();
  })
  .catch((error) => console.error("Ошибка при добавлении карточки:", error))
  .finally(() => (renderLoading(false, popupButton)));
}

// USER SUBMIT// //переделано
function profileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButton)
  patchUserInfo(profileTitle.value, profileDescription.value)
  .then ((profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
      closeModal(popupEditProfile);
  })
  .catch((error) => {
    console.log(error)
  })
  .finally (() => {renderLoading(false, popupButton)})
}

// AVATAR SUBMIT //переделано
function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButton)
  newAvatarAvatar(avatarInput.value)
  .then ((profile) => {
    avatarImage.style.backgroundImage = `url(${profile.avatar})`,
    closeModal(avatarPopup);
    avatarFormElement.reset();
  })
  .catch ((error) => {console.log(error)})
  .finally (() => {renderLoading(false, popupButton)})
}

// получения информации о пользователе и карточек на страницу //переделано
Promise.all([getUserInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name
    profileDescription.textContent = profile.about
    avatarImage.style.backgroundImage = `url(\\${profile.avatar})`;
    
    cards.forEach(function(item) {
      const card = createCard(item, profile, openModalImage);   
      placesList.append(createCard(card));
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Запуск валидации
enableValidation();//enableValidation(validationConfig); 

editButton.addEventListener('click', openProfileEdit);// "редактировать профиль"
formElement.addEventListener('submit', profileFormSubmit)// "редактировать профиль" submit

addButton.addEventListener("click", openProfileAddPopup);// "новая карточка"
formNewPlace.addEventListener("click", placeFormSubmit);// "новая карточка" submit

avatarImage.addEventListener('click', openAvatarEdit); // "обновить аватар"
avatarForm.addEventListener('submit', handleAvatarEditSubmit);// "обновить аватар" submit

// Обработчик слушателя с функцией закрытия на все кнопки закрытия //переделано
closeButtonList.forEach (function (button) {
  button.addEventListener('click', function () {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
})

// Закрытие окна на оверлей //переделано
popupList.forEach((popup) => {
popup.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(popup);
  }
});
});