import { deleteCardApi, addLikeCard, deleteLikeCard } from "./api.js";
import { closeModal } from "./modal.js";
import { popupImage, bigImageCaption, popupTypeImage ,openModalImage} from "./index.js";

//переключатель лайка
export function isLiked(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export function deleteCard(cardClone, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardClone.remove();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
}

export function createCard(data, userId, openModalImage, deleteCard, isLiked ) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeToggle = cardClone.querySelector('.card__like-button');
  const likeCounter = cardClone.querySelector(".card__like-counter");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardData = cardClone.querySelector(".card__image");

  cardData.src = data.link;
  cardData.alt = data.name;
  cardData.textContent = data.name
  //likeCounter.textContent = data.likes.length;
  cardClone.querySelector(".card__title").textContent = cardData.alt;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardClone);
  });
 
  cardData.addEventListener('click', () => {
    openModalImage(cardData);
  });

  likeToggle.addEventListener('click', () => {
    isLiked(likeToggle);
  });

  return cardClone;
}