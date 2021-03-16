class Card {
  constructor(
    { name, link, likes, owner, handleCardClick, handleDeleteCardClick },
    cardTemplateSelector
  ) {
    this._name = name;
    this._link = link;
    //this._alt = alt;
    this._likes = likes;
    this._owner = owner;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this.count = 1;
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

    this._placeImage = this._cardElement.querySelector(".place__image");
    this._placeName = this._cardElement.querySelector(".place__name");

    this._placeImage.src = this._link;
    this._placeImage.alt = this._alt;
    this._placeName.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _toggleLikeIconState(evt) {
    evt.target.classList.toggle("place__like-icon_active");
  }

  showLikes(count) {
    this.count += 1;
    this._cardElement.querySelector(
      ".place__like-icon_count"
    ).textContent = count;
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._placeLikeIcon = this._cardElement.querySelector(".place__like-icon");
    this._placeDeleteIcon = this._cardElement.querySelector(
      ".place__delete-icon"
    );

    // Display popup image by clicking on the image
    this._placeImage.addEventListener("click", () => this._handleCardClick());

    this._placeLikeIcon.addEventListener("click", () => {
      this._toggleLikeIconState;
      this.showLikes(this.count);
    });

    // remove card
    this._placeDeleteIcon.addEventListener("click", () =>
      this._handleDeleteCardClick()
    );
  }
}

export default Card;
