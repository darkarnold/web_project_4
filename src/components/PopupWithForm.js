import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;

    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    // get all input fields of the form
    this._inputValues = {};

    //Add values to empty object
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._formSubmitHandler(this._getInputValues());
    });

    super.setEventListeners();
  }

  handleSubmit(event) {
    this._formSubmitHandler = event;
  }

  close() {
    super.close();

    this._form.reset();
  }
}

export default PopupWithForm;
