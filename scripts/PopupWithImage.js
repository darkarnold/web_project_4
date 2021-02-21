import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const image = this._popup.querySelector(".popup__image");

    const imageCaption = this._popup.querySelector(".popup__image-title");

    image.src = link;

    imageCaption.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
