// select page elements
let pageContainer = document.querySelector(".page");
let profile = pageContainer.querySelector(".profile");
let profileInfo = profile.querySelector(".profile__info");
let editButton = profileInfo.querySelector(".button_value_edit");
let popupModal = pageContainer.querySelector(".popup");
let closeButton = popupModal.querySelector(".button_value_close");
let popupForm = popupModal.querySelector(".popup__form");

// select the input fields
let nameFormInput = popupForm.querySelector('.popup__input_val_name');
let jobFormInput = popupForm.querySelector('.popup__input_val_job');

// select the profile section fields
let profileName = profileInfo.querySelector(".profile__info-name");
let profileTitle = profileInfo.querySelector(".profile__info-subtitle");

// Editing popup form 
popupForm.addEventListener('submit',function(evt){
  evt.preventDefault();

  // change content of the profile section
  profileName.textContent = nameFormInput.value;
  profileTitle.textContent = jobFormInput.value;

  // call to close or open the modal
  toggleModal()
  
})

// function to toggle the opening and closing of the popup modal

function toggleModal() {
  popupModal.classList.toggle('popup_opened');
}


// Open the popup modal
editButton.addEventListener('click',toggleModal);
 

  // Close the popup modal
closeButton.addEventListener('click',toggleModal);
