//
//
// создание карточки

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, userID) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeAmount = cardElement.querySelector(".card__like-amount");

  cardTitle.textContent = card.name;
  cardLikeAmount.textContent = card.likes.length;
  cardElement.setAttribute("id", card._id);
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name.toLowerCase());

  if (card.owner._id !== userID) {
    cardDeleteButton.remove();
  }

  if (card.likes.some((item) => item._id === userID)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
}
