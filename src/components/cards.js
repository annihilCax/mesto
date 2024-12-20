//
//
// создание карточки

import { deleteCard, setLike, deleteLike } from "./api.js";

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

  cardImage.addEventListener("click", function () {
    imageImage.alt = card.name;
    imageImage.src = card.link;
    imageCaption.textContent = card.name;
    openModal(imagePopup);
  });

  cardLikeButton.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deleteLike(card._id)
        .then((card) => {
          cardLikeAmount.textContent = card.likes.length;
          evt.target.classList.remove("card__like-button_is-active");
        })
        .catch((err) => console.log(err));
    } else {
      setLike(card._id)
        .then((card) => {
          cardLikeAmount.textContent = card.likes.length;
          evt.target.classList.add("card__like-button_is-active");
        })
        .catch((err) => console.log(err));
    }
  });

  cardDeleteButton.addEventListener("click", function (evt) {
    deleteCard(card._id)
      .then(() => {
        evt.target.closest(".places__item").remove();
      })
      .catch((err) => console.log(err));
  });

  return cardElement;
}
