const ArkhyzImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const ChelyabinskImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const IvanovoImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const KamchatkaImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const KholmogorskyImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const BaikalImg = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

export const initialCards = [
    {
      name: "Архыз",
      link: ArkhyzImg,
    },
    {
      name: "Челябинская область",
      link: ChelyabinskImg,
    },
    {
      name: "Иваново",
      link: IvanovoImg,
    },
    {
      name: "Камчатка",
      link: KamchatkaImg,
    },
    {
      name: "Холмогорский район",
      link: KholmogorskyImg,
    },
    {
      name: "Байкал",
      link: BaikalImg,
    }
];

export function deleteCard(cardClone) { //УДАЛЕНИЕ
  cardClone.remove();
}

export function isLiked(evt) { //ЛАЙК
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

export function createCard(item, { deleteCard, isLiked, openModalImage}) { //СОЗДАНИЕ
  const cardTemplate = document.querySelector("#card-template").content;
  const cardClone = cardTemplate.querySelector(".places__item").cloneNode(true);
  const likeToggle = cardClone.querySelector('.card__like-button');
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardData = cardClone.querySelector(".card__image");

  cardClone.querySelector(".card__title").textContent = item.name;
    cardData.src = item.link;
    cardData.alt = item.name;

  cardData.addEventListener('click', () => {
    openModalImage(cardData)
  });

  likeToggle.addEventListener('click', isLiked);

  deleteButton.addEventListener("click", () => {
    deleteCard(cardClone);
  });
  
  return cardClone;
}