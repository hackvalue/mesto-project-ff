const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardContent, deleteCard, likeCard, handleZoom) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardImage.src = cardContent.link;
    cardImage.alt = cardContent.name;
    cardTitle.textContent = cardContent.name;
    
    cardItem.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt));
    
    cardItem.querySelector('.card__like-button').addEventListener('click', (evt) => likeCard(evt));

    cardImage.addEventListener('click', () => handleZoom (cardImage, cardTitle));

    return(cardItem);
}

export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }