import "../pages/index.css";

import { createCard } from "./cards.js";
import { enableValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards-template.js";

//
//
// поп-ап - изображение
const imagePopup = document.querySelector(".popup_type_image");
const imageImage = imagePopup.querySelector(".popup__image");
const imageCloseButton = imagePopup.querySelector(".popup__close");
const imageCaption = document.querySelector(".popup__caption");

imageCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

//
//
// поп-ап - редактирование профиля
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profilePopup.querySelector(".popup__close");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

profileCloseButton.addEventListener("click", function () {
  closeModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profilePopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);


//
//
// карточки
const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardPlacesList = document.querySelector(".places__list");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");
const cardCloseButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardPlacesList.prepend(createCard(cardTitleInput.value, cardLinkInput.value));
  closeModal(cardPopup);
}

cardAddButton.addEventListener("click", function () {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
});

cardCloseButton.addEventListener("click", function () {
  closeModal(cardPopup);
});

cardForm.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((item) =>
  cardPlacesList.append(createCard(item.name, item.link))
);

cardPlacesList.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    imageImage.setAttribute("src", "");
    imageImage.setAttribute("src", evt.target.src);
    imageCaption.textContent = evt.target.alt;
    openModal(imagePopup);
  }
});

//
//
// анимации
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

// Создание объекта с настройками валидации

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(validationSettings);
