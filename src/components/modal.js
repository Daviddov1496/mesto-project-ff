export function openModal(popup) {
  //Открыть
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEsc);
}

export function closeModal(popup) {
  //Закрыть
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEsc);
}

export function closeModalOnEsc(evt) {
  //Закрыть на Esc
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function closePopupOnOverlay(popup) {
  // Закрыть на Overlay
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}
