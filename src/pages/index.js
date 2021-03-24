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
  places,
  editProfilePopupForm,
  addPlacePopupFormSelector,
  settings,
  changeProfileAvatarForm,
  updateAvatarButton,
} from "../utils/utils.js";

// Display image popup
const imagePopup = new PopupWithImage(".popup_type_display-image");
imagePopup.setEventListeners();

// Improve UX by showing textInput on loading

function onLoading(isLoading, form) {
  const submitButton = form.querySelector(".button_value_save");
  if (isLoading) {
    submitButton.textContent = "Saving...";
  } else {
    submitButton.textContent = "Save";
  }
}

/* create the cards and iterate over array of cards 
and render the cards on the page */

// create and render new card and prepend to initial cards

// Edit profile section
const profileData = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-subtitle",
  avatarSelector: ".profile__avatar",
});

//render user data and user cards after their requests are resolved
api
  .getAppInfo()
  .then(([userData, cardData]) => {
    const cards = new Section(
      {
        items: cardData,
        renderer: (item) => {
          renderCard(item);
        },
      },
      places
    );

    // Delete confirmation popup
    const confirmDeletePopup = new PopupWithForm(".popup_type_confirm-popup");
    confirmDeletePopup.setEventListeners();

    function renderCard(data) {
      // create and render new card

      const card = new Card(
        {
          name: data.name,
          link: data.link,
          owner: { _id: data.owner._id },
          _id: data._id,
          likes: data.likes,
          handleCardClick: () => {
            imagePopup.open(data.name, data.link);
          },
          handleDeleteCardClick: (_id) => {
            confirmDeletePopup.open();

            confirmDeletePopup.setNewSubmitHandler(() => {
              api
                .deleteCard(_id)
                .then(() => {
                  console.log(_id);
                  card.deleteCard();
                  confirmDeletePopup.close();
                })
                .catch((err) => {
                  console.log(`${err}`);
                });
            });
          },
          handleLikedCardClick: (_id) => {
            if (
              card.placeLikeIcon.classList.contains("place__like-icon_active")
            ) {
              //console.log(card._likes);
              api
                .deleteLikes(_id)
                .then((res) => {
                  card.updateLikes();
                  card.showLikes(res.likes.length);
                })
                .catch((err) => {
                  console.log(`${err}`);
                });
            } else {
              api
                .addLikes(_id)
                .then((res) => {
                  card.likedCard();
                  card.showLikes(res.likes.length);
                })
                .catch((err) => {
                  console.log(`${err}`);
                });
            }
          },
        },
        ".card-template",
        userData._id
      );

      const cardElement = card.createCard();

      cards.addItem(cardElement);
    }

    // render cards on the page
    cards.renderElements();

    function addNewCards(inputValues) {
      const newPlaceTitle = inputValues["image-text"];
      const newPlaceURL = inputValues["image-link"];

      // New place card object
      const newPlaceObject = {
        name: newPlaceTitle,
        link: newPlaceURL,
      };

      // Add new card to the server
      api
        .setnewCard(newPlaceObject.name, newPlaceObject.link)
        .then((newCardData) => {
          renderCard(newCardData);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }

    // create Add-place popup form
    const addPlacePopupForm = new PopupWithForm(
      ".popup_type_add-place",
      (inputValues) => {
        addNewCards(inputValues);

        addPlacePopupForm.close();
      }
    );

    addPlacePopupForm.setEventListeners();

    //open Add-place modal
    addPlaceButton.addEventListener("click", () => {
      addPlacePopupForm.open();
    });

    // retrieve user data
    profileData.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
  })
  .catch((err) => {
    console.log(`${err}`);
  });
const editPopupForm = new PopupWithForm(
  ".popup_type_edit-profile",
  (inputValues) => {
    // update user information

    api
      .editProfile(inputValues.name, inputValues.description)
      .then((res) => {
        profileData.setUserInfo(res.name, res.about, res.avatar);

        editPopupForm.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    onLoading(false, editProfilePopupForm);
  }
);

editPopupForm.setEventListeners();

editButton.addEventListener("click", () => {
  editPopupForm.open();
  onLoading(true, editProfilePopupForm);
  const { name, job } = profileData.getUserInfo();
  nameFormInput.value = name;
  jobFormInput.value = job;
});

// change profile picture popup
const changeProfileAvatar = new PopupWithForm(
  ".popup_type_change-profile-picture",
  (inputValues) => {
    api
      .updateAvatar(inputValues["image-link"])
      .then((res) => {
        profileData.setAvatar(res.avatar);
        changeProfileAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      });

    onLoading(false, changeProfileAvatarForm);
  }
);

updateAvatarButton.addEventListener("click", () => {
  changeProfileAvatar.open();
  onLoading(true, changeProfileAvatarForm);
});

changeProfileAvatar.setEventListeners();

// form Validation
const editProfileValidator = new FormValidator(settings, editProfilePopupForm);
const addPlaceValidator = new FormValidator(
  settings,
  addPlacePopupFormSelector
);
const changeProfileAvatarValidator = new FormValidator(
  settings,
  changeProfileAvatarForm
);

editProfileValidator.enableValidation();
addPlaceValidator.enableValidation();
changeProfileAvatarValidator.enableValidation();
