import "../index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { isLiked, createCard, deleteCard, } from "./card.js";
const placesList = document.querySelector(".places__list");
//Изображене и его попап
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector('.popup_type_image');
const popupList = document.querySelectorAll(".popup");
const bigImageCaption = document.querySelector('.popup__caption')
//Карточка профиля
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
//Карточка места
const formNewPlace = document.forms["new-place"];
const inputNameFormPlace = formNewPlace.elements["place-name"];
const inputNameFormLink = formNewPlace.elements.link;
//Кнопки
const closeButtonList = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
//Попап карточек
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");

// фукции открытия и закрытия
export function openModalImage(item) {
  popupImage.src = item.src;// картинка
  popupImage.alt = item.alt;// alt в html
  bigImageCaption.textContent = item.alt;// подпись при открытии картинки
  openModal(popupTypeImage);
}

export function profileFormSubmit(evt) {
  evt.preventDefault();
  closeModal(popupEditProfile);
}

export function placeFormSubmit(evt) {
  evt.preventDefault();
  const placeName = inputNameFormPlace.value
  const placeLink = inputNameFormLink.value
  const newCard = createCard({ name: placeName, link: placeLink }, { deleteCard, isLiked, openModalImage });
  placesList.prepend(newCard);
  closeModal(popupNewCard);
}
  
  formEditProfile.addEventListener("submit", function(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formEditProfile.reset();
  closeModal(popupEditProfile);
  });
  
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
  openModal(popupEditProfile);
});

addButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

popupList.forEach((popup) => {
popup.addEventListener("mousedown", (evt) => {
  if (evt.target === popup || evt.target.classList.contains("popup__close")) {
    closeModal(popup);
  }
});
});
//ДОБАВЛЕНИЕ
initialCards.forEach((item) => { 
  const newCard = createCard(item, { deleteCard, isLiked, openModalImage, placeFormSubmit });
  placesList.appendChild(newCard);
});
