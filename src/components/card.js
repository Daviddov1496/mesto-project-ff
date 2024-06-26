import { addLikeCard, deleteCardApi, deleteLikeCard } from "./api";

//УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(button) { 
  const deleteIcon = button.closest('.card');
  deleteIcon.remove();
}
//ДОБАВЛЕНИЕ ЛАЙКА
function isLiked(icon) { 
  icon.classList.add('card__like-button_is-active');
}
//УДАЛЕНИЕ ЛАЙКА
function unLiked(icon) {
  icon.classList.remove('card__like-button_is-active');
}

//ОТПРАВКА ЛАЙКА НА СЕРВЕР
function likeToggle(icon, data, counter) {
  if (!icon.classList.contains('card__like-button_is-active')) {
    addLikeCard(data._id)
    .then((response) => {
      isLiked(icon)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
  else {
    deleteLikeCard(data._id)
    .then((response) => {
      unLiked(icon)
      counter.textContent = response.likes.length
    })
    .catch ((error) => {
      console.log(error)
    })
  }
}
//ПОИСК ЛАЙКНУТЫХ КАРТОЧЕК
function hasLike (likes, profile) {
  return likes.some(function(like) {
    return like['_id'] === profile['_id']
  })
}

// Функция создания карточки
function createCard(data, profile, openModalImage) { 
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardClone.querySelector(".card__image");

  const cardTitle = cardClone.querySelector(".card__title");

  const deleteButton = cardClone.querySelector(".card__delete-button");

  const likeButton = cardClone.querySelector('.card__like-button');
  const likeCounter = cardClone.querySelector('.card__like-count');
  
  const dataId = data._id;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeCounter.textContent = data.likes.length;

    if (data.owner['_id'] !== profile['_id']) {
      deleteButton.classList.add('card__delete-button_disabled')
      deleteButton.setAttribute('disabled', true)
      deleteButton.style.display = "none";
    }
    else {
      deleteButton.classList.remove('card__delete-button_disabled')
      deleteButton.removeAttribute('disabled');
      deleteButton.addEventListener('click', () => {
        deleteCardApi(dataId)
        .then (() => {
          deleteCard(deleteButton)
        })
        .catch ((error) => {
          console.log(error)
        })
    })
  }

  cardImage.addEventListener('click', ()=>{
    openModalImage(data);
  });
  if (hasLike(data.likes, profile)) { 
    isLiked(likeButton)
  }

  likeButton.addEventListener('click', ()=> {
    likeToggle(likeButton, data, likeCounter)
  });

  return cardClone;
}

export { createCard };