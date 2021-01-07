// select page elements
const pageContainer = document.querySelector(".page");

// profile section
const profile = pageContainer.querySelector(".profile");
const profileInfo = profile.querySelector(".profile__info");

// edit buttons
const editButton = profileInfo.querySelector(".button_value_edit");
const addPlaceButton = profile.querySelector(".button_value_add");

//popup section
const editPopupModal = pageContainer.querySelector(".popup_type_edit-profile");
const placeModal = pageContainer.querySelector(".popup_type_add-place");
const displayImageModal = pageContainer.querySelector(".popup_type_display-image");
const popupForm = pageContainer.querySelector(".popup__form");


// close modal buttons
const editCloseButton = editPopupModal.querySelector(".button_value_close");
const closePlaceModal = placeModal.querySelector(".button_value_close");
const closeDisplayImageModal = displayImageModal.querySelector(".button_value_close");

// select the input fields
const nameFormInput = popupForm.querySelector('.popup__input_val_name');
const jobFormInput = popupForm.querySelector('.popup__input_val_job');

// select the profile section fields
const profileName = profileInfo.querySelector(".profile__info-name");
const profileTitle = profileInfo.querySelector(".profile__info-subtitle");

// functions to toggle the opening and closing of the popup modal

function openModal() {
  editPopupModal.classList.add('popup_opened');

  // Read content of the profile section and store it as the value for the form
  nameFormInput.value = profileName.textContent;
  jobFormInput.value =  profileTitle.textContent;

}

function closeModal(modal) {
  modal.classList.remove('popup_opened');
}



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
addPlaceButton.addEventListener("click", ()=>{
  placeModal.classList.add('popup_opened');
});

// Open the edit-profile modal
editButton.addEventListener('click',openModal);

// close the add-place modal
closePlaceModal.addEventListener("click",() => {
  closeModal(placeModal);
});

// Close the popup modal
editCloseButton.addEventListener('click',() =>{
  closeModal(editPopupModal);
});

// close display image modal
closeDisplayImageModal.addEventListener('click', () =>{
  closeModal(displayImageModal);
});

// Saving popup form content 
popupForm.addEventListener('submit',formSubmitHandler);



// Card rendering

const initialCards = [
  {
    name: "Paradise Coast",
    link: "https://images.unsplash.com/photo-1568634761634-15b7f57c4e7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
    alt: "A beautiful sea coast"
  },
  {
    name: "Enchanted Forest",
    link: "https://images.unsplash.com/photo-1502252430442-aac78f397426?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=dan-otis-OYFHT4X5isg-unsplash.jpg&w=1920",
    alt: "Mist over a forest"
  },
  {
    name: "Silver Lake",
    link: "https://images.unsplash.com/photo-1496434059439-62081cbcfea7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=eberhard-grossgasteiger-tGYMSNV-ooc-unsplash.jpg&w=1920",
    alt: "House by the lake"
  },
  {
    name: "Yosemite Valley",
    link: "https://images.unsplash.com/photo-1517578701290-16fa3deb8bd3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q",
    alt: "valley"
  },
  {
    name: "Delos National Park",
    link: "https://images.unsplash.com/photo-1595370773791-ccbbfd695ce5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=nancy-reid-8XMhTBcQYUo-unsplash.jpg&w=1920",
    alt: "canyon"
  },
  {
    name: "Edge Mountains",
    link: "https://images.unsplash.com/photo-1607288610581-5a6334da4cbc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    alt: "snow peaked mountains"
  }
];

const cardTemplate = document.querySelector(".card-template").content.querySelector(".place");

const places = pageContainer.querySelector(".places__grid");

//iterate over array of cards
initialCards.forEach((data) =>{
  const cardElement = cardTemplate.cloneNode(true);

  const placeImage = cardElement.querySelector(".place__image");
  const placeNameContainer = cardElement.querySelector(".place__name-container");
  const placeName = cardElement.querySelector(".place__name");
  const placeLikeIcon = cardElement.querySelector(".place__like-icon");
  const placeDeleteIcon = cardElement.querySelector(".place__delete-icon");

  placeImage.src = data.link;
  placeImage.alt = data.alt;
  placeName.textContent = data.name;

  placeImage.addEventListener("click", () =>{
    const popupImage = displayImageModal.querySelector(".popup__image");
    const popupImageTitle = displayImageModal.querySelector(".popup__image-title");
    
    popupImage.src = data.link;
    popupImageTitle.textContent = data.name;

    displayImageModal.classList.add("popup_opened");
  });

  placeLikeIcon.addEventListener("click", () =>{
    // change state of like button
  });

  placeDeleteIcon.addEventListener("click", () =>{
    // delete place card
  })

  places.append(cardElement);

})