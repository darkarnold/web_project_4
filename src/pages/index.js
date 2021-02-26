import "./index.css";
import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  addPlaceButton,
  nameFormInput,
  jobFormInput,
  titleFormInput,
  linkFormInput,
  placeSelector,
  places,
  editProfilePopupForm,
  addPlacePopupFormSelector,
  settings,
  initialCards,
} from "../utils/utils.js";

// Display image popup
const imagePopup = new PopupWithImage(".popup_type_display-image");
imagePopup.setEventListeners();

/* create the cards and iterate over array of cards 
and render the cards on the page */

const cards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", () => {
        imagePopup.open(item.name, item.link);
      });

      const cardElement = card.createCard();

      cards.addItem(cardElement);
    },
  },
  places
);

// render cards on the page
cards.renderElements();

// create and render new card and prepend to initial cards
function preRenderCard() {
  const newPlaceTitle = titleFormInput.value;
  const newPlaceURL = linkFormInput.value;

  // New place card object
  const newPlaceObject = {
    name: newPlaceTitle,
    link: newPlaceURL,
  };

  // create and render new card
  const card = new Card(newPlaceObject, ".card-template", () => {
    imagePopup.open(newPlaceObject.name, newPlaceObject.link);
  });
  const cardElement = card.createCard();

  placeSelector.prepend(cardElement);
}

// create Add-place popup form
const addPlacePopupForm = new PopupWithForm(".popup_type_add-place", () => {
  preRenderCard();

  addPlacePopupForm.close();
});

addPlacePopupForm.setEventListeners();

//open Add-place modal
addPlaceButton.addEventListener("click", () => {
  addPlacePopupForm.open();
});

// Edit profile section
const profileData = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-subtitle",
});

const editPopupForm = new PopupWithForm(".popup_type_edit-profile", () => {
  profileData.setUserInfo(nameFormInput.value, jobFormInput.value);

  editPopupForm.close();
});

editPopupForm.setEventListeners();

editButton.addEventListener("click", () => {
  editPopupForm.open();
  const { name, job } = profileData.getUserInfo();
  nameFormInput.value = name;
  jobFormInput.value = job;
});

// form Validation
const editProfileValidator = new FormValidator(settings, editProfilePopupForm);
const addPlaceValidator = new FormValidator(
  settings,
  addPlacePopupFormSelector
);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
