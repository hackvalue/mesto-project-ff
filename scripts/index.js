// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const cardList = document.querySelector('.places__list');
// Функция создания карточки

function createCard(cardContent, deleteCard) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    cardItem.querySelector('.card__image').src = cardContent.link;
    cardItem.querySelector('.card__image').alt = cardContent.name;
    cardItem.querySelector('.card__title').textContent = cardContent.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt));

    return(cardItem);
}
// Функция удаления карточки

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

// Вывести карточки на страницу

function renderCards() {
    initialCards.forEach(cardContent => {
        cardList.append(createCard(cardContent, deleteCard));
    });
}

renderCards();