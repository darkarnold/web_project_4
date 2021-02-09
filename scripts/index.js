import FormValidator from "./FormValidation.js";
import initialCards from "./cardData.js";
import Card from "./Card.js";
import {
  pageContainer,
  displayImageModal,
  openModal,
  closeModal,
} from "./utils.js";

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
const placeModal = pageContainer.querySelector(".popup_type_add-place");

const editProfilePopupForm = pageContainer.querySelector(
  ".popup__form_type_edit-profile"
);
const addPlacePopupForm = pageContainer.querySelector(
  ".popup__form_type_add-place"
);

// close modal buttons
const editCloseButton = editPopupModal.querySelector(".button_value_close");
const closePlaceModal = placeModal.querySelector(".button_value_close");
const closeDisplayImageModal = displayImageModal.querySelector(
  ".button_value_close"
);

// select the input fields
const nameFormInput = editProfilePopupForm.querySelector(
  ".popup__input_val_name"
);
const jobFormInput = editProfilePopupForm.querySelector(
  ".popup__input_val_job"
);
const titleFormInput = addPlacePopupForm.querySelector(
  ".popup__input_val_title"
);
const linkFormInput = addPlacePopupForm.querySelector(".popup__input_val_link");

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

//open add place modal
addPlaceButton.addEventListener("click", () => {
  openModal(placeModal);
});

// Open the edit-profile modal
editButton.addEventListener("click", () => {
  openModal(editPopupModal);
  // Read content of the profile section and store it as the value for the form
  nameFormInput.value = profileName.textContent;
  jobFormInput.value = profileTitle.textContent;
});

// close the add-place modal
closePlaceModal.addEventListener("click", () => {
  closeModal(placeModal);
});

// Close the popup modal
editCloseButton.addEventListener("click", () => {
  closeModal(editPopupModal);
});

// close display image modal
closeDisplayImageModal.addEventListener("click", () => {
  closeModal(displayImageModal);
});

// Saving edit profile popup form content
editProfilePopupForm.addEventListener("submit", formSubmitHandler);

const places = pageContainer.querySelector(".places__grid");
//iterate over array of cards
initialCards.forEach((data) => {
  const card = new Card(data, ".card-template");

  //render cards
  places.append(card.createCard());
});

// add new place -image function
function addPlaceSubmitHandler(evt) {
  evt.preventDefault();

  const newPlaceTitle = titleFormInput.value;
  const newPlaceURL = linkFormInput.value;

  // New place card object
  const newPlaceObject = {
    name: newPlaceTitle,
    link: newPlaceURL,
  };

  // create and render new card
  const card = new Card(newPlaceObject, ".card-template");
  places.prepend(card.createCard());

  closeModal(placeModal);
}

addPlacePopupForm.addEventListener("submit", addPlaceSubmitHandler);

// form Validation
const editProfileValidator = new FormValidator(settings, editProfilePopupForm);
const addPlaceValidator = new FormValidator(settings, addPlacePopupForm);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
