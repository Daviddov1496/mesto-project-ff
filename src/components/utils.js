import { buttonTextNormal, buttonTextWhileLoading } from "./constants.js"
// Функция обработки загрузки //переделано
export function renderLoading(isFetching, button) {
    if (isFetching) {
      button.textContent = buttonTextWhileLoading;
    }
    else {
      button.textContent = buttonTextNormal;
    }
  }