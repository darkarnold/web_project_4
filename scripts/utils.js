// select page elements
const pageContainer = document.querySelector(".page");

const displayImageModal = pageContainer.querySelector(
  ".popup_type_display-image"
);

//popup image section
const popupImage = displayImageModal.querySelector(".popup__image");
const popupImageTitle = displayImageModal.querySelector(".popup__image-title");

function openModal(modal) {
  modal.classList.add("popup_opened");

  document.addEventListener("keydown", handleEscPress);
}

// close modals using esc key

function handleEscPress(evt) {
  const modals = document.querySelector(".popup_opened");
  if (evt.key === "Escape" && modals) {
    closeModal(modals);
  }
}

function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscPress);
}

export {
  pageContainer,
  popupImage,
  popupImageTitle,
  displayImageModal,
  openModal,
  handleEscPress,
  closeModal,
};
