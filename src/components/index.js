import "../index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { isLiked, createCard, deleteCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getInitialInfo, getInitialCards, postNewCard, deleteCardApi, getUser, patchUser, addLikeCard, deleteLikeCard, patchAvatar } from './api.js'

//Формы из DOM
export const formEditProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];
export const avatarFormElement = document.forms["edit-avatar"];
export const deleteCardForm = document.forms["delete-card"];
//Сприсок мест 
const placesList = document.querySelector(".places__list");
//Изображене и его попап
export const popupImage = document.querySelector(".popup__image");
export const popupTypeImage = document.querySelector('.popup_type_image');
const popupList = document.querySelectorAll(".popup");
export const bigImageCaption = document.querySelector('.popup__caption')
//Аватар
export const avatarImage = document.querySelector(".profile__image");
export const avatarForm = document.querySelector(".popup_type_avatar");
//Карточка профиля
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.description;
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
//Карточка места
const inputNameFormPlace = formNewPlace.elements["place_name"];
const inputNameFormLink = formNewPlace.elements.link;
//Кнопки
export const popupButton = document.querySelectorAll(".button");
const closeButtonList = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
//Попап карточек
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");

//Формы для валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

// IMAGE
export function openModalImage(img) {
  popupImage.src = img.src;
  popupImage.alt = img.alt;
  bigImageCaption.textContent = img.alt;
  openModal(popupTypeImage);
}
// PROFILE
export function profileFormSubmit(evt) {
  evt.preventDefault();
  closeModal(popupEditProfile);
}

formEditProfile.addEventListener("submit", function(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile.querySelector(".popup__button"));
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formEditProfile.reset();
  closeModal(popupEditProfile);
});
export function handleFormSubmit(evt) {
  // Функция для выполнения запроса на сервер для обновления данных профиля
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    // Выполнение запроса на сервер
    return patchUser(name, about)
      .then((dataUser) => {
        // Обновление данных профиля
        profileTitle.textContent = dataUser.name;
        profileDescription.textContent = dataUser.about;
        console.log(name, about);
        // Установка начальных значений в форме редактирования профиля
        setInitialEditProfileFormValues();
        // Закрытие попапа после успешного обновления профиля
        //closePopup(evt.target.closest(".popup_is-opened"));
        closeModal(popupEditProfile);
      });
  }
}
// PLACE
export function placeFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile.querySelector(".popup__button"));
  const placeName = inputNameFormPlace.value
  const placeLink = inputNameFormLink.value
  const newCard = createCard({ name: placeName, link: placeLink }, { deleteCard, isLiked, openModalImage });
  placesList.prepend(newCard);
  closeModal(popupNewCard);
}
formNewPlace.addEventListener("submit", function(evt) {
  evt.preventDefault();
  placeFormSubmit(evt)
  formNewPlace.reset();
  closeModal(formNewPlace);
});

// Слушатели кликов
editButton.addEventListener("click", function () {
  const name = profileTitle.textContent;
  const job = profileDescription.textContent;
  nameInput.value = name;
  jobInput.value = job;
  clearValidation(formEditProfile)
  openModal(popupEditProfile);
});

addButton.addEventListener("click", function () {
  clearValidation(formNewPlace)
  openModal(popupNewCard);
});
//АВАТАР // файл с настройкой аватара удален, попробуй другой вариант
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm);
  openModal(avatarForm);
});

popupList.forEach((popup) => {
popup.addEventListener("mousedown", (evt) => {
  if (evt.target === popup || evt.target.classList.contains("popup__close")) {
    closeModal(popup);
  }
});
});
//ДОБАВЛЕНИЕ
// Функция для установки информации о пользователе на страницу
let userId = "";

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    getProfileInfo(userInfo);
    renderInitialCard(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });
// Выполнение асинхронных запросов на сервер для получения информации о пользователе и карточек
Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    cards.forEach(card => {
      const cardElement = createCard(card, openModalImage, isLiked, userId);
      placesList.appendChild(cardElement);
    });
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });