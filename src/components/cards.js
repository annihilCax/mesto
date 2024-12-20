//
//
// создание карточки

import { initialCards } from "./cards-template.js";

const cardTemplate = document.querySelector("#card-template").content;


export function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = name;

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name.toLowerCase());

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });

  cardDeleteButton.addEventListener("click", function (evt) {
    evt.target.closest(".places__item").remove();
  });

  return cardElement;
}


