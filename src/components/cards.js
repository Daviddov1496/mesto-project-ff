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