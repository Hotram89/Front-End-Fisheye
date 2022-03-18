const closeBtn = document.querySelector("#contact_modal header img");
const closeSuccessBtn = document.querySelector(".success-modal img");
const submitBtn = document.getElementById("submit_button");
const contactBtn = document.querySelector(".contact_button");
const modalTemp = document.querySelector(".template-modal");
const successModal = document.querySelector(".success-modal");
const modal = document.getElementById("contact_modal");
contactBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", submitForm);
closeSuccessBtn.addEventListener("click", closeSuceesModal);

function displayModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function submitForm(e) {
  e.preventDefault();
  validateFields();
}
function closeSuceesModal() {
  successModal.style.display = "none";
}
function validateFields() {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let msg = document.getElementById("msg");

  if (
    validateTextField(firstName) &&
    validateTextField(lastName) &&
    validateEmailField(email) &&
    validateTextField(msg) == true
  ) {
    modal.style.display = "none";
    successModal.style.display = "flex";
  }
}

function validateTextField(field) {
  let isValid =
    field.value.trim().length > 1 && /^[a-zéèêë ,.'-']+$/i.test(field.value);
  return isValid;
}
function validateEmailField(field) {
  let email = field.value;
  let isValid = /^[\.\w_-]+@[\w-]+\.[a-z]{2,4}$/i.test(email);

  return isValid;
}

export { submitForm };
