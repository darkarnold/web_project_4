import FormValidator from "./FormValidation.js";
import initialCards from "./cardData.js";
import Card from "./Card.js";
import Section from "./Section.js";
import { pageContainer, openModal, closeModal } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_value_save",
  inactiveButtonClass: "button_value_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// profile section
const profile = pageContainer.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");

// edit buttons
const editButton = profileInfo.querySelector(".button_value_edit");
const addPlaceButton = profile.querySelector(".button_value_add");

//popup section
const editPopupModal = pageContainer.querySelector(".popup_type_edit-profile");

const editProfilePopupForm = pageContainer.querySelector(
  ".popup__form_type_edit-profile"
);
const addPlacePopupFormSelector = pageContainer.querySelector(
  ".popup__form_type_add-place"
);

// close modal buttons
const editCloseButton = editPopupModal.querySelector(".button_value_close");

// select the input fields
const nameFormInput = editProfilePopupForm.querySelector(
  ".popup__input_val_name"
);
const jobFormInput = editProfilePopupForm.querySelector(
  ".popup__input_val_job"
);
const titleFormInput = pageContainer.querySelector(".popup__input_val_title");
const linkFormInput = pageContainer.querySelector(".popup__input_val_link");

// select the profile section fields
const profileName = profileInfo.querySelector(".profile__info-name");
const profileTitle = profileInfo.querySelector(".profile__info-subtitle");

const popupModals = Array.from(pageContainer.querySelectorAll(".popup"));

popupModals.forEach((popup) => {
  // close popup by clicking the overlay
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

//  edit profile submit  function
function formSubmitHandler(evt) {
  evt.preventDefault();

  // change content of the profile section
  profileName.textContent = nameFormInput.value;
  profileTitle.textContent = jobFormInput.value;

  // call to close the modal
  closeModal(editPopupModal);
}

// Open the edit-profile modal
editButton.addEventListener("click", () => {
  openModal(editPopupModal);
  // Read content of the profile section and store it as the value for the form
  nameFormInput.value = profileName.textContent;
  jobFormInput.value = profileTitle.textContent;
});

// Close the popup modal
editCloseButton.addEventListener("click", () => {
  closeModal(editPopupModal);
});

// Saving edit profile popup form content
editProfilePopupForm.addEventListener("submit", formSubmitHandler);

// class for image container
const places = ".places__grid";

const placeSelector = document.querySelector(places);
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

// form Validation
const editProfileValidator = new FormValidator(settings, editProfilePopupForm);
const addPlaceValidator = new FormValidator(
  settings,
  addPlacePopupFormSelector
);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
