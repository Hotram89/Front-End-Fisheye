const closeBtn = document.querySelector('#contact_modal header img');
const closeSuccessBtn = document.querySelector('.success-modal img');
const submitBtn = document.getElementById('submit_button');
const contactBtn = document.querySelector('.contact_button');
const successModal = document.querySelector('.success-modal');
const modal = document.getElementById('contact_modal');

// afficher la modale de contact
contactBtn.addEventListener('click', displayModal);
// fermer la modale de contact
closeBtn.addEventListener('click', closeModal);
// vérifier les informations saisies avant d'envoyer
submitBtn.addEventListener('click', submitForm);
// fermer la modale de réussite de l'envoi
closeSuccessBtn.addEventListener('click', closeSuceesModal);

// fonction pour afficher la modale de contact
function displayModal() {
    modal.style.display = 'flex';
    let firstName = document.getElementById('firstName');
    firstName.focus()


}

// fonction pour fermer la modale de contact
function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

// fonction pour vérifier les informations saisies avant d'envoyer
function submitForm(e) {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let msg = document.getElementById('msg');

    e.preventDefault();
    validateFields();
    
    console.group("Données du formulaire");
    var data = [['Prénom: ',firstName.value ], ['Nom: ' , lastName.value], ['Email:' , email.value], ['Message: ', msg.value]]
    console.table(data)

    
}
// fonction pour fermer la modale de réussite de l'envoi
function closeSuceesModal() {
    successModal.style.display = 'none';
}

function validateFields() {
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let msg = document.getElementById('msg');
    
    if (
        validateTextField(firstName) &&
    validateTextField(lastName) &&
    validateEmailField(email) &&
    validateTextField(msg) == true
    ) {
        modal.style.display = 'none';
        successModal.style.display = 'flex';
        
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
