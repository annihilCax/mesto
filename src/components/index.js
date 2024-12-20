import "../pages/index.css";

import { createCard } from "./cards.js";
import { enableValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import {
  getProfileInfo,
  getInitialCards,
  editProfile,
  addCard,
  deleteCard,
  setLike,
  deleteLike,
  editAvatar,
} from "./api.js";

////////////////// ЗАГРУЗКА

//
//
// анимации

let userID;

getProfileInfo()
  .then((res) => {
    profile.textContent = res.name;
    jobprofile.textContent = res.about;
    avaprofile.style.backgroundImage = `url(${res.avatar})`;
    userID = res._id;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((res) => {
    cards.forEach((item) => cardsList.append(createCard(item, userID)));
  })
  .catch((err) => {
    console.log(err);
  });

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationSettings);

////////////////// ПОП-АПЫ

//
//
// поп-ап - изображение
const imagePopup = document.querySelector(".popup_type_image");

const imageImage = imagePopup.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

const imageCloseButton = imagePopup.querySelector(".popup__close");

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
const profileImage = document.querySelector(".profile__image");

const profileTitleInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profilePopup.querySelector(".popup__close");
const profileFormButton = profilePopup.querySelector(".popup__button");

////////
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const title = profileTitleInput.value;
  const description = profileDescriptionInput.value;
  profileFormButton.textContent = "Сохранение...";

  editProfile(title, description)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      closeModal(profilePopup);
      profileFormButton.textContent = "Сохранить";
    });

  closeModal(profilePopup);
}
////////

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

profileCloseButton.addEventListener("click", function () {
  closeModal(profilePopup);
});

//
//
// поп-ап - редактирование аватара

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");

const avatarUrlInput = avatarPopup.querySelector(".popup__input_type_avatar");

const avatarFormButton = avatarPopup.querySelector(".popup__button");
const avatarCloseButton = avatarPopup.querySelector(".popup__close");


////////
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatar = avatarUrlInput.value;
  avatarFormButton.textContent = "Сохранение...";

  editAvatar(avatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      closeModal(avatarPopup);
      avatarFormButton.textContent = "Сохранить";
    });

  closeModal(avatarPopup);
}
////////

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

profileImage.addEventListener("click", function () {
  openModal(avatarPopup);
});

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarPopup);
});

//
//
// карточки
const cardPopup = document.querySelector(".popup_type_new-card");
const cardForm = cardPopup.querySelector(".popup__form");

const cardTitleInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardPlacesList = document.querySelector(".places__list");

const cardAddButton = document.querySelector(".profile__add-button");
const cardCloseButton = cardPopup.querySelector(".popup__close");
const cardFormButton = cardPopup.querySelector(".popup__button");

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
