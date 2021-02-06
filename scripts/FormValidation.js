class FormValidator {
  constructor(settings,formElement) {
    this._settings = settings;
    this._formElement = formElement;

  }

  _showError(errorMessage, input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
   // display error message
  errorElement.textContent = errorMessage;
  //add error display class
  input.classList.add(this._settings.inputErrorClass);
  }

  _hideError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    // remove error message
    errorElement.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(input) {
    //check if inputs are valid
  if (input.validity.valid) {
    this._hideError(input);
  }
  else {
    this._showError(input.validationMessage, input);
  }

  }

  _toggleButtonState(inputList,buttonElement) {
    //check valid input fields
  const hasValidInput = inputList.every(input => input.validity.valid);

  if (hasValidInput) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));

  const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  // disable submit button on loading
  this._toggleButtonState(inputList,buttonElement);

    //iterate through array of inputs
    inputList.forEach(input => {
      //add eventListener to input
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList,buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", evt => evt.preventDefault());

    // call and event listeners to the form
    this._setEventListeners();
  }
}

export default FormValidator;