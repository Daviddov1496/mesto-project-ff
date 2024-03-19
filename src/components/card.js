//УДАЛЕНИЕ
export function deleteCard(cardClone) { 
    cardClone.remove();
  }
  //ЛАЙК
  export function isLiked(evt) { 
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
  }
  //СОЗДАНИЕ
  export function createCard(item, { deleteCard, isLiked, openModalImage }) { 
    const cardTemplate = document.querySelector("#card-template").content;
    const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);
    const likeToggle = cardClone.querySelector('.card__like-button');
    const deleteButton = cardClone.querySelector(".card__delete-button");
    const cardData = cardClone.querySelector(".card__image");
  
    cardClone.querySelector(".card__title").textContent = item.name;
    cardData.src = item.link;
      
  
    cardData.addEventListener('click', () => {
      openModalImage(cardData)
    });
  
    likeToggle.addEventListener('click', isLiked);
  
    deleteButton.addEventListener("click", () => {
      deleteCard(cardClone);
    });
    
    return cardClone;
  }