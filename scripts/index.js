// Переменные

const cardList = document.querySelector('.places__list');

const cardAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

const cardTemplate = document.querySelector('#card-template').content;


// Функции создания карточки


function createCard(cardContent, deleteCard, likeCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;
    cardTitle.textContent = cardContent.name;
    
    cardItem.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt));
    
    cardItem.querySelector('.card__like-button').addEventListener('click', (evt) => likeCard(evt));

    cardImage.addEventListener('click', () => handleZoom(cardImage, cardTitle));

    return(cardItem);
}

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }


// Функция открытия модального окна

function openModal(modal){
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
  }

// Функция закрытия модального окна

  
function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
  }
  
// Закрытие модалок по Esc

  function keyHandler(evt) {
    if (evt.key === 'Escape'){
      closeModal(document.querySelector('.popup_is-opened'))
      };
  }


  //Слушатели открытия модалок

  profileEditButton.addEventListener('click', () => {
    openModal(popupEditProfile);
    profileValue();
    }
  );

  function profileValue() {
    formProfile.name.value = inputProfileName.textContent;
    formProfile.description.value = inputProfileJob.textContent;
  }
  
  cardAddButton.addEventListener('click', () => {
    openModal(popupAddCard);
    }
  );


//Слушатели на крестике и оверлее для всех модалок

const popupsAll = document.querySelectorAll('.popup');

popupsAll.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(popup);
      }
    }
  );
})

// Плавное открытие/закрытие всех попапов

popupsAll.forEach(popup => popup.classList.toggle('popup_is-animated'));

// Форма профиля

const formProfile = document.forms.edit_profile;

const inputProfileName = document.querySelector(".profile__title");
const inputProfileJob = document.querySelector(".profile__description");

function handleFormProfile(evt) {
    evt.preventDefault();
    inputProfileName.textContent = formProfile.name.value;
    inputProfileJob.textContent = formProfile.description.value;
    closeModal(popupEditProfile);
    formProfile.reset();
}

formProfile.addEventListener('submit', handleFormProfile); 

// Форма карточки

const formCard = document.forms.new_place;

const inputCardName = formCard.elements.place_name;
const inputCardLink = formCard.elements.link;


function handleFormCard(evt) {
    evt.preventDefault();

    const cardContent = {};

    cardContent.name = inputCardName.value;
    cardContent.link = inputCardLink.value;

    const newCard = createCard(cardContent, deleteCard, likeCard);
    cardList.prepend(newCard);
  
    formCard.reset();
    closeModal(popupAddCard);
  }

  formCard.addEventListener('submit', handleFormCard); 



// Открытие карточки по клику

const popupImage = document.querySelector('.popup__image');
const popupImageCaption= document.querySelector('.popup__caption');
const popupImageZoom = document.querySelector('.popup_type_image');


function handleZoom(image, title) {
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupImageCaption.textContent = title.textContent;

    openModal(popupImageZoom);
  }

  
// Вывод массива карточек на страницу

function renderCards() {
    initialCards.forEach(cardContent => {
        cardList.append(createCard(cardContent, deleteCard, likeCard));
    });
}

renderCards();