// Импорты

import "../pages/index.css";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openModal, closeModal, handlePopupClose } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";
import {
  getProfileData,
  updateProfileData,
  getCardsData,
  postNewCard,
  editProfileAvatar,
} from "./api.js";

// Переменные

let userId;

const cardList = document.querySelector(".places__list");

const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageZoom = document.querySelector(".popup_type_image");

const allPopups = document.querySelectorAll(".popup");

const formProfile = document.forms.edit_profile;
const inputEditName = formProfile.elements["name"];
const inputEditJob = formProfile.elements["description"];
const inputProfileName = document.querySelector(".profile__title");
const inputProfileJob = document.querySelector(".profile__description");

const avatarImage = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_update_avatar");
const formEditAvatar = document.forms["update-avatar"];
const inputAvatar = formEditAvatar.elements["avatar-link"];

const formCard = document.forms.new_place;
const inputCardName = formCard.elements.place_name;
const inputCardLink = formCard.elements.link;

enableValidation(validationConfig);

// Отправки форм

function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

function handleSubmit(action, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);
  action()
    .then(() => evt.target.reset())
    .catch((err) => {
      console.log(`Ошибка отправки формы: ${err}`);
    })
    .finally(() => renderLoading(false, submitButton, initialText));
}

// Профиль

function fillProfile(profileInfo) {
  inputProfileName.textContent = profileInfo.name;
  inputProfileJob.textContent = profileInfo.about;
  userId = profileInfo._id;
  avatarImage.style = `background-image: url('${profileInfo.avatar}')`;
}

profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  clearValidation(formProfile, validationConfig);
  openModal(popupEditProfile);
});

function fillProfileInputs() {
  inputEditName.value = inputProfileName.textContent;
  inputEditJob.value = inputProfileJob.textContent;
}

function handleFormEdit(name, description) {
  inputProfileName.textContent = name;
  inputProfileJob.textContent = description;
  closeModal(popupEditProfile);
}

function handleProfileFormSubmit(evt) {
  function doRequest() {
    return updateProfileData(inputEditName.value, inputEditJob.value).then(
      (userData) => handleFormEdit(userData.name, userData.about)
    );
  }

  handleSubmit(doRequest, evt);
}

popupEditProfile.addEventListener("submit", handleProfileFormSubmit);

// Карточки

function renderCard(cardContent, method = "prepend") {
  const card = createCard(
    cardContent,
    deleteCard,
    toggleLike,
    handleZoom,
    userId
  );
  cardList[method](card);
}

function showCards(cardsData) {
  cardsData.forEach((data) => {
    renderCard(data, "append");
  });
}

function handleFormCard(cardInfo) {
  renderCard(cardInfo);
  closeModal(popupAddCard);
}

function handleCardFormSubmit(evt) {
  function doRequest() {
    return postNewCard(inputCardName.value, inputCardLink.value).then(
      (cardData) => handleFormCard(cardData)
    );
  }
  handleSubmit(doRequest, evt, "Сохранение...");
}

popupAddCard.addEventListener("submit", handleCardFormSubmit);

cardAddButton.addEventListener("click", () => {
  formCard.reset();
  clearValidation(formCard, validationConfig);
  openModal(popupAddCard);
});

/// Аватар

avatarImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
});

function handleFormAvatar(link) {
  avatarImage.style = `background-image: url('${link}')`;
  closeModal(popupEditAvatar);
}

function handleAvatarFormSubmit(evt) {
  function doRequest() {
    return editProfileAvatar(inputAvatar.value).then((avatarData) =>
      handleFormAvatar(avatarData.avatar)
    );
  }

  handleSubmit(doRequest, evt);
}

popupEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//Слушатели на крестике и оверлее для всех модалок
allPopups.forEach(handlePopupClose);

// Плавное открытие/закрытие всех попапов
allPopups.forEach((popup) => popup.classList.toggle("popup_is-animated"));

// Функция открытия изображения

function handleZoom(image, title) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupImageCaption.textContent = title.textContent;

  openModal(popupImageZoom);
}

// Получение исходных данных

Promise.all([getProfileData(), getCardsData()])
  .then(([profileData, cardsData]) => {
    fillProfile(profileData);
    showCards(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка на промисе: ${err}`);
  });
