
 // show input errors
 const showError = (config, errorMessage, input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);

  // display error message
  errorElement.textContent = errorMessage;

  //add error display class
  input.classList.add(config.inputErrorClass);

}

  // hide input errors
 const hideError = (config, input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);

  // remove error message
  errorElement.textContent = "";

  input.classList.remove(config.inputErrorClass);
}
 
 const checkInputValidity = (config, input) => {
  //check if inputs are valid
  if (input.validity.valid) {
    hideError(config, input);
  }
  else {
    showError(config, input.validationMessage, input);
  }

}

  // toggle active and inactive state of button
 const toggleButtonState = (config, inputList,buttonElement) => {

  //check valid input fields
  const hasValidInput = inputList.every(input => input.validity.valid);

  if (hasValidInput) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }

}

// set  eventListeners for all inputs
const setEventListeners = (config,form) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  const buttonElement = form.querySelector(config.submitButtonSelector);
  // disable submit button on loading
  toggleButtonState(config, inputList,buttonElement);

    //iterate through array of inputs
    inputList.forEach(input => {
      //add eventListener to input
      input.addEventListener('input', () => {
        checkInputValidity(config, input);
        toggleButtonState(config, inputList,buttonElement);
      });
    });
}
   
 const enableValidation = (config) => {
  // create an array of forms on the page from a pseudo- array
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  // iterate throught the array of forms 
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

    });

    // call and event listeners to the form
    setEventListeners(config,form);
    
  });
}

// enabling validation by calling enableValidation()
// pass all the settings on call

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_value_save",
  inactiveButtonClass: "button_value_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});