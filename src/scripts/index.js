// Импорты

import '../pages/index.css';
import {initialCards} from "./dataCards.js";
import {createCard, deleteCard, likeCard} from "./card.js";
import {openModal, closeModal, handlePopupClose} from './modal.js';

// Переменные

const cardList = document.querySelector('.places__list');

const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

const allPopups = document.querySelectorAll('.popup');

const formProfile = document.forms.edit_profile;
const inputProfileName = document.querySelector(".profile__title");
const inputProfileJob = document.querySelector(".profile__description");

const formCard = document.forms.new_place;
const inputCardName = formCard.elements.place_name;
const inputCardLink = formCard.elements.link;

const popupImage = document.querySelector('.popup__image');
const popupImageCaption= document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup_type_image');

//Слушатели открытия модалок

profileEditButton.addEventListener('click', () => {
    openModal(popupEditProfile);
    fillProfileInputs();
})

function fillProfileInputs() {
    formProfile.name.value = inputProfileName.textContent;
    formProfile.description.value = inputProfileJob.textContent;
}
  
cardAddButton.addEventListener('click', () => {
    openModal(popupAddCard);
})

//Слушатели на крестике и оверлее для всех модалок

allPopups.forEach(handlePopupClose);

// Плавное открытие/закрытие всех попапов

allPopups.forEach(popup => popup.classList.toggle('popup_is-animated'));

// Функция редактирования формы профиля

function handleFormProfile(evt) {
    evt.preventDefault();
    inputProfileName.textContent = formProfile.name.value;
    inputProfileJob.textContent = formProfile.description.value;
    closeModal(popupEditProfile);
    formProfile.reset();
}

formProfile.addEventListener('submit', handleFormProfile); 

// Функция редактирования формы карточки

function handleFormCard(evt) {
    evt.preventDefault();

    const cardContent = {};
    cardContent.name = inputCardName.value;
    cardContent.link = inputCardLink.value;

    const cardPaste = createCard(cardContent, deleteCard, likeCard, handleZoom);
    cardList.prepend(cardPaste);
  
    formCard.reset();
    closeModal(popupAddCard);
}

formCard.addEventListener('submit', handleFormCard); 

// Функция открытия изображения

function handleZoom(image, title) {
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupImageCaption.textContent = title.textContent;

    openModal(popupImageZoom);
}

// Вывод массива карточек на страницу

function renderCards() {
    initialCards.forEach(cardContent => {
        cardList.append(createCard(cardContent, deleteCard, likeCard, handleZoom));
    });
}

renderCards();