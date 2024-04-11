//Конфиг
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-10",
  headers: {
      authorization: "be3dd40c-3b77-451d-bdeb-8be5f599fce5",
      "Content-Type": "application/json",
  }
}
 
/* Проверка получения данных */
function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция выгрузки карточек
function getInitialCards () {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then (checkResponse)
  }

// Функция отправки карточки на сервер
function addNewCard (place, url) {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify ({
      name: `${place}`,
      link: `${url}`,
    })
  })
  .then (checkResponse)
}

// Функция удаления карточки с сервера
function deleteCardApi (id) {
  return fetch (`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers,
  })
    .then (checkResponse)
}

 // Функция выгрузки данных для профиля
 function getUserInfo () {
  return fetch (`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then (checkResponse) 
  }

// Функция редактирования профиля на сервере
function patchUserInfo (name, description) {
  return fetch (`${config.baseUrl}/users/me`,  {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      name: `${name}`,
      about: `${description}`,
    }),
  })
  .then (checkResponse)
 }

// Функция отправки лайка карточки на сервер
function addLikeCard (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
  method: 'PUT',
  headers: config.headers,
  })
    .then (checkResponse)
}

function deleteLikeCard (id) {
  return fetch (`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
})
    .then (checkResponse)
}    

// Функция отправки на сервер ссылки на новый аватар
function newAvatar (avatar) {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify ({
      avatar: `${avatar}`
    })
  })
    .then (checkResponse)
}

export {
  getInitialCards,
  addNewCard,
  deleteCardApi,
  getUserInfo,
  patchUserInfo,
  addLikeCard,
  deleteLikeCard,
  newAvatar
};