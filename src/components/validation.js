function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.error_messege);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList, buttonElement)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_disabled');
  };
};

function setEventListeners (formElement)  {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
  });
};

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) =>
    hideError(formElement, inputElement, validationConfig)
  );
  toggleButtonState(inputList,buttonElement, validationConfig);
}