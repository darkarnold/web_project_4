class Card {
  constructor({ name, link, alt }, cardTemplateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }

  createCard() {
    this._cardElement = this._getTemplate();

    const placeImage = this._cardElement.querySelector(".place__image");
    const placeName = this._cardElement.querySelector(".place__name");

    placeImage.src = this._link;
    placeImage.alt = this._alt;
    placeName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _toggleLikeIconState(evt) {
    evt.target.classList.toggle("place__like-icon_active");
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    const placeLikeIcon = this._cardElement.querySelector(".place__like-icon");
    const placeDeleteIcon = this._cardElement.querySelector(
      ".place__delete-icon"
    );
    const placeImage = this._cardElement.querySelector(".place__image");

    // Display popup image by clicking on the image
    placeImage.addEventListener("click", () => this._handleCardClick());

    placeLikeIcon.addEventListener("click", this._toggleLikeIconState);

    // remove card
    placeDeleteIcon.addEventListener("click", () => {
      this._deleteCard();
    });
  }
}

export default Card;