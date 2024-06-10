export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const doArray = (parent, element) => {
  return Array.from(parent.querySelectorAll(element));
};

export const clearValidation = (formElement, validationConfig) => {
  const formButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  const inputList = doArray(formElement, validationConfig.inputSelector);
  inputList.forEach((input) => {
    hideInputError(input, formElement, validationConfig);
  });
  toggleButtonState(inputList, formButton, validationConfig);
};

const showInputError = (
  formInput,
  formElement,
  errorMessage,
  validationConfig
) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  errorText.classList.add(validationConfig.errorClass);
  errorText.textContent = errorMessage;
};

const hideInputError = (formInput, formElement, validationConfig) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass);
  errorText.classList.remove(validationConfig.errorClass);
  errorText.textContent = "";
  formInput.setCustomValidity("");
};

const isValid = (formInput, formElement) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(
      formInput,
      formElement,
      formInput.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formInput, formElement, validationConfig);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((formInput) => !formInput.validity.valid);
}

function toggleButtonState(inputList, formButton, validationConfig) {
  if (hasInvalidInput(inputList)) {
    formButton.classList.add(validationConfig.inactiveButtonClass);
    formButton.disabled = true;
  } else {
    formButton.classList.remove(validationConfig.inactiveButtonClass);
    formButton.disabled = false;
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = doArray(formElement, validationConfig.inputSelector);
  const formButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(input, formElement);
      toggleButtonState(inputList, formButton, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const formList = doArray(document, validationConfig.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
