//Формы для валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

//Формы из DOM
export const formEditProfile = document.forms["edit-profile"];
export const formNewPlace = document.forms["new-place"];
export const avatarFormElement = document.forms["edit-avatar"];
export const deleteCardForm = document.forms["delete-card"];

//Сприсок мест 
export const placesList = document.querySelector(".places__list");
export const formElement = document.querySelector('.popup__form');

//Изображене и его попап
export const popupList =  Array.from(document.querySelectorAll('.popup'))
export const popupImage = document.querySelector(".popup__image");
export const popupTypeImage = document.querySelector('.popup_type_image');
export const bigImageCaption = document.querySelector('.popup__caption')

//Аватар
export const avatarPopup = document.querySelector('.popup_type_new-avatar') 
export const avatarImage = document.querySelector(".profile__image");
export const avatarForm = document.querySelector(".popup_type_avatar");
export const newAvatarForm = document.forms.edit_avatar;
export const avatarInput = avatarFormElement.elements.avatar__input;

//Карточка профиля
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.description;
export const profileTitle = document.querySelector(".profile__title"); 
export const profileDescription = document.querySelector(".profile__description");
export const nameInputForm = formElement.querySelector('.popup__input_type_name');
export const jobInputForm = formElement.querySelector('.popup__input_type_description');

//Карточка места
export const inputNameFormPlace = formNewPlace.elements["place_name"];
export const inputNameFormLink = formNewPlace.elements.link;

//Кнопки
export const popupButton = document.querySelectorAll(".button");
export const saveAvatarButton = document.querySelector('.avatar_popup__button');
export const saveProfileButton = document.querySelector('.profile_popup__button');
export const saveCardButton = document.querySelector('.card_popup__button')
export const closeButtonList = Array.from(document.querySelectorAll('.popup__close'));
export const addButton = document.querySelector(".profile__add-button");
export const editButton = document.querySelector(".profile__edit-button");

//Попап карточек
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const cardNameInput = popupNewCard.querySelector(".popup__input_type_card-name");
export const cardLinkInput =  popupNewCard.querySelector(".popup__input_type_url");
export const popupEditProfile = document.querySelector(".popup_type_edit");

//renderLoading
export const buttonTextWhileLoading = 'Сохранение...';
export const buttonTextNormal = 'Сохранить';