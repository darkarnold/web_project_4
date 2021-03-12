import "./index.css";
import FormValidator from "../components/FormValidation.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../utils/Api.js";
import {
  editButton,
  addPlaceButton,
  nameFormInput,
  jobFormInput,
  titleFormInput,
  linkFormInput,
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

// create and render new card and prepend to initial cards

// Edit profile section
const profileData = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-subtitle",
});

// retrieve user data
api.getUserData().then((res) => {
  //console.log("res", res);
  profileData.setUserInfo(res.name, res.about);
});

// retrieve user cards
api.getInitialCards().then((cardInfo) => {
  console.log("res", cardInfo);
  function renderCard(data) {
    // create and render new card
    const card = new Card(data, ".card-template", () => {
      imagePopup.open(data.name, data.link);
    });
    const cardElement = card.createCard();

    cards.addItem(cardElement);
  }

  const cards = new Section(
    {
      items: cardInfo,
      renderer: (item) => {
        renderCard(item);
      },
    },
    places
  );

  // render cards on the page
  cards.renderElements();

  function addNewCards() {
    const newPlaceTitle = titleFormInput.value;
    const newPlaceURL = linkFormInput.value;

    // New place card object
    const newPlaceObject = {
      name: newPlaceTitle,
      link: newPlaceURL,
    };

    // Add new card to the server
    api
      .setnewCard(newPlaceObject.name, newPlaceObject.link)
      .then((newCardData) => {
        //console.log("newCardData", newCardData);
        renderCard(newCardData);
      });
  }

  // create Add-place popup form
  const addPlacePopupForm = new PopupWithForm(".popup_type_add-place", () => {
    addNewCards();

    addPlacePopupForm.close();
  });

  addPlacePopupForm.setEventListeners();

  //open Add-place modal
  addPlaceButton.addEventListener("click", () => {
    addPlacePopupForm.open();
  });
});

const editPopupForm = new PopupWithForm(".popup_type_edit-profile", () => {
  // update user information
  api.editProfile(nameFormInput.value, jobFormInput.value).then((res) => {
    //console.log("res", res);
    profileData.setUserInfo(res.name, res.about);
  });

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
