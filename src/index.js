import "./index.css";
import { initialCards } from "./components/cards.js";
import { imagePopup, openPopup } from "./components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const newElement = document.forms["new-place"];
const placeName = newElement.elements["place-name"];
const placeLink = newElement.elements.link;


function deleteCard(cardClone) {
  cardClone.remove();
}

function isLiked(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
} 
 
function createCard(item, { deleteCard, isLiked }) {
  const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeToggle = cardClone.querySelector('.card__like-button');
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const popupPict = document.querySelector(".popup__image");
  const cardData = cardClone.querySelector(".card__image");

  cardClone.querySelector(".card__title").textContent = item.name;

  cardData.src = item.link;
  cardData.alt = item.name;

  likeToggle.addEventListener('click', isLiked);

  cardData.addEventListener("click", (evt) => {
    const img = evt.target;
    popupPict.src = img.src;
    popupPict.alt = img.alt;
    imagePopup.classList.add("popup_is-opened");
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardClone);
  });
  return cardClone;
}

initialCards.forEach((item) => {
  const newCard = createCard(item, { deleteCard, newCardCreate, isLiked});
  placesList.appendChild(newCard);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

function newCardCreate(evt) {
  evt.preventDefault();

  const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardDescription = cardClone.querySelector(".card__description");

  cardTitle.textContent = placeName.value;
  cardDescription.textContent = placeLink.value;

  const newItem = {
    name: placeName.value,
    link: placeLink.value,
  };

  const newCardItem = createCard(newItem, { deleteCard, isLiked });
  placesList.prepend(newCardItem);

  closePopup();
}

newElement.addEventListener("submit", newCardCreate);

function closePopup() {
  openPopup.forEach(popup => {
  popup.classList.remove("popup_is-opened");
  });

  formElement.reset();
  newElement.reset();
  }
  
  formElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  closePopup();
  });
  
  newElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  closePopup();
  });

