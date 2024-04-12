import "../index.css";
import { formEditProfile, formNewPlace, avatarFormElement, deleteCardForm, placesList, formElement, popupList, popupImage, popupTypeImage, bigImageCaption, avatarForm, avatarPopup, avatarImage, newAvatarForm, avatarInput, nameInput, jobInput, profileTitle, profileDescription, nameInputForm, jobInputForm, inputNameFormPlace, inputNameFormLink, popupButton, closeButtonList, addButton, editButton, popupNewCard,cardNameInput, cardLinkInput, popupEditProfile, buttonTextNormal, buttonTextWhileLoading, saveAvatarButton, saveProfileButton, saveCardButton,validationConfig } from "./constants.js";
import { enableValidation, clearValidation } from "./validation.js";
import { openModal, closeModal,} from "./modal.js";
import { createCard } from "./card.js";
import { renderLoading } from "./utils.js";
import { getInitialCards, addNewCard, getUserInfo, patchUserInfo,  newAvatar } from './api.js'
import { data } from "jquery";

// IMAGE //РАБОТАЕТ
export function openModalImage(data) {
  popupImage.src = data.link;// картинка
  popupImage.alt = data.alt;// alt в html
  bigImageCaption.textContent = data.name;// подпись при открытии картинки
  openModal(popupTypeImage);
}

// Функция открытия модального окна "редактировать профиль" //переделано
function openProfileEdit() {
  openModal(popupEditProfile);
  clearValidation(popupEditProfile, validationConfig);
  nameInputForm.value = profileTitle.textContent;
  jobInputForm.value = profileDescription.textContent;
}

// Функция открытия модального окна "добавить карточку" //переделано
function openProfileAddPopup() {
  openModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
}
// Функция открытия модального окна "редактировать аватар" //переделано
function openAvatarEdit() {
  openModal(avatarForm);
  clearValidation(avatarForm, validationConfig);
}

// PLACE SUBMIT //РАБОТАЕТ
function placeFormSubmit(evt) {
evt.preventDefault();
renderLoading(true, saveCardButton);
addNewCard(inputNameFormPlace.value, inputNameFormLink.value)
  .then((data) => {
    const card = createCard( data, data.owner, openModalImage );
    placesList.prepend(card);
    closeModal(popupNewCard);
    formNewPlace.reset();
  })
  .catch((error) => console.error("Ошибка при добавлении карточки:", error))
  .finally(() => (renderLoading(false, saveCardButton)));
}

// USER SUBMIT //РАБОТАЕТ
function profileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true,saveProfileButton)
  patchUserInfo(nameInput.value, jobInput.value)
  .then ((profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    closeModal(popupEditProfile);
  })
  .catch((error) => {
    console.log(error)
  })
  .finally (() => {renderLoading(false, saveProfileButton)})
}

// AVATAR SUBMIT //РАБОТАЕТ
function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, saveAvatarButton)
  newAvatar(avatarInput.value) 
  .then ((profile) => {
    avatarImage.style.backgroundImage = `url(${profile.avatar})`;
    closeModal(avatarForm); 
    avatarFormElement.reset();
  })
  .catch ((error) => {console.log(error)})
  .finally (() => {renderLoading(false, saveAvatarButton)})
}

// получения информации о пользователе и карточек на страницу //переделано
Promise.all([getUserInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    avatarImage.style.backgroundImage = `url(${profile.avatar})`
    
    cards.forEach(function(item) {
      const card = createCard(item, profile, openModalImage);   
      placesList.append(card)

    });
  })
  .catch((err) => {
    console.error(err);
  });

// Запуск валидации
enableValidation(validationConfig); 

editButton.addEventListener('click', openProfileEdit);// "редактировать профиль"
formElement.addEventListener('submit', profileFormSubmit)// "редактировать профиль" submit

addButton.addEventListener("click", openProfileAddPopup);// "новая карточка"
formNewPlace.addEventListener("submit", placeFormSubmit);// "новая карточка" submit

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