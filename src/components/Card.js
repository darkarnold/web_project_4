class Card {
  constructor(
    {
      name,
      link,
      likes,
      owner,
      _id,
      handleCardClick,
      handleDeleteCardClick,
      handleLikedCardClick,
    },
    cardTemplateSelector,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikedCardClick = handleLikedCardClick;
    //this.count = 1;
    this._cardElement = this._getTemplate();
    this.placeLikeIcon = this._cardElement.querySelector(".place__like-icon");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }

  createCard() {
    //this._cardElement = this._getTemplate();

    this._placeImage = this._cardElement.querySelector(".place__image");
    this._placeName = this._cardElement.querySelector(".place__name");

    this._placeImage.src = this._link;
    this._placeName.textContent = this._name;

    this._setEventListeners();
    this.isLiked();
    this.showLikes(this._likes.length);
    this._displayDeleteIcon();

    return this._cardElement;
  }

  /*_toggleLikeIconState(evt) {
    evt.target.classList.toggle("place__like-icon_active");
  }*/

  isLiked() {
    if (this._likes.some((like) => like._id === this._userId)) {
      this.placeLikeIcon.classList.add("place__like-icon_active");
      //this.showLikes(this._likes.length);
    }
  }

  showLikes(count) {
    this._cardElement.querySelector(
      ".place__like-icon_count"
    ).textContent = count;

    //this.isLiked();
  }

  _deleteCard() {
    this._cardElement.remove(".place");
    //this._cardElement = null;
  }

  _displayDeleteIcon() {
    if (this._owner._id !== this._userId) {
      this._placeDeleteIcon.style.display = "none";
    }
  }

  _setEventListeners() {
    //this.placeLikeIcon = this._cardElement.querySelector(".place__like-icon");
    this._placeDeleteIcon = this._cardElement.querySelector(
      ".place__delete-icon"
    );

    // Display popup image by clicking on the image
    this._placeImage.addEventListener("click", () => this._handleCardClick());

    this.placeLikeIcon.addEventListener("click", () => {
      this._handleLikedCardClick(this._id);
      //this._toggleLikeIconState;
    });

    // remove card
    this._placeDeleteIcon.addEventListener("click", () => {
      this._handleDeleteCardClick(this._id);
    });
  }
}

export default Card;
