class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // search for popup
    this._handleEscClose = this._handleEscClose.bind(this);
    // bind the method to the instance of the class
    this._closeButton = this._popup.querySelector(".button_value_close");
  }

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}

export default Popup;
