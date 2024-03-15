export const openPopup = document.querySelectorAll(".popup");

const closeButton = document.querySelectorAll(".popup__close");

const editButton = document.querySelector(".profile__edit-button");
const cardCreate = document.querySelector(".popup_type_new-card");

const addButton = document.querySelector(".profile__add-button");
const editProfile = document.querySelector(".popup_type_edit");

export const imagePopup = document.querySelector('.popup_type_image');

editButton.addEventListener("click", function () {
    openCard(editProfile);
  });
  
  addButton.addEventListener("click", function () {
    openCard(cardCreate);
  });
  
  openPopup.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup || evt.target.classList.contains("popup__close")) {
        closeCard(popup);
      }
    });
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        closeCard(popup);
      }
    });
  });
  
  export function openCard(card) {
    card.classList.add("popup_is-opened");
  }
  
  export function closeCard(card) {
    card.classList.remove("popup_is-opened");
  }
  