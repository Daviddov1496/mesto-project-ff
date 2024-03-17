import "./index.css";
import { isLiked, createCard, deleteCard, initialCards} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
//Изображене и его попап
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector('.popup_type_image');
const openPopup = document.querySelectorAll(".popup");
const popupCaption = document.querySelector('.popup__caption')
//Карточка профиля
const editProfile = document.forms["edit-profile"];
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
//Карточка места
const newPlace = document.forms["new-place"];
const inputNameFormPlace = newPlace.elements["place-name"];
const inputNameFormLink = newPlace.elements.link;
//Кнопки
const closeButtonList = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
//Попап карточек
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");

// фукции открытия и закрытия
export function openModalImage(img) {
  popupImage.src = img.src;
  popupImage.alt = img.alt;
  popupCaption.textContent = img.alt;
  openModal(popupTypeImage);
}

export function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

export function placeFormSubmit(evt) {
  evt.preventDefault();
  const placeName = inputNameFormPlace.value
  const placeLink = inputNameFormLink.value
  const newCard = createCard({ name: placeName, link: placeLink }, { deleteCard, isLiked, openModalImage, placeFormSubmit });
  placesList.prepend(newCard);
  closePopup();
}

export function closePopup() {
  openPopup.forEach(popup => {
  popup.classList.remove("popup_is-opened");
  });
  }
  
  editProfile.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;
  editProfile.reset();
  closePopup();
  });
  
  newPlace.addEventListener("submit", function(evt) {
  evt.preventDefault();
  placeFormSubmit(evt)
  newPlace.reset();
  closePopup();
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

openPopup.forEach((popup) => {
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
