import { addLike, deleteLike, deleteOneCard } from "./api";

export function createCard(
  cardContent,
  deleteCard,
  toggleLike,
  handleZoom,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".like-count");
  const likeArray = cardContent.likes;

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  likeCounter.textContent = cardContent.likes.length;
  likeArray.forEach((like) => isLiked(like._id, userId, cardLikeButton));

  if (userId !== cardContent.owner._id) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.classList.add("visually-hidden");
  } else {
    cardDeleteButton.addEventListener("click", () =>
      deleteCard(cardContent._id, cardItem)
    );
  }

  cardLikeButton.addEventListener("click", () => {
    const checkLike = cardLikeButton.classList.contains(
      "card__like-button_is-active"
    )
      ? deleteLike
      : addLike;
    checkLike(cardContent._id)
      .then((res) => {
        toggleLike(cardLikeButton);
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  });

  cardImage.addEventListener("click", () => handleZoom(cardImage, cardTitle));

  return cardItem;
}

export function deleteCard(id, cardItem) {
  deleteOneCard(id)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function isLiked(likeId, userId, button) {
  if (likeId === userId) {
    button.classList.add("card__like-button_is-active");
  }
}

export function toggleLike(cardLikeButton) {
  cardLikeButton.classList.toggle("card__like-button_is-active");
}
