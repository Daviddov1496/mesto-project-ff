//Конфиг
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-10",
  headers: {
      authorization: "be3dd40c-3b77-451d-bdeb-8be5f599fce5",
      "Content-Type": "application/json",
  }
}

// Получение всех карточек
const getInitialCards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};

// Добавление новой карточки
const postNewCard = async (cardData) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};

// Удаление карточки по идентификатору
const deleteCardApi = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};

// Получение информации о пользователе
const getUser = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};

// Обновление информации о пользователе
const patchUser = async (userProfileData) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};
// Добавление лайка карточке
const addLikeCard = async (cardId)  => {
  const res = await fetch(`${config.baseUrl}/cards/users/me/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};
// Удаление лайка с карточки
const deleteLikeCard = async (cardId) => {
  const res = await fetch(`${config.baseUrl}/cards/users/me/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};
// Обновление аватара пользователя
const patchAvatar = async (avatar) => {
  const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatar }),
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error: ${res.status}`);
};

const getInitialInfo = async () => {
  return Promise.all([getUser(), getInitialCards()]);
};

export {
  getInitialInfo,
  getInitialCards,
  postNewCard,
  deleteCardApi,
  getUser,
  patchUser,
  addLikeCard,
  deleteLikeCard,
  patchAvatar
};