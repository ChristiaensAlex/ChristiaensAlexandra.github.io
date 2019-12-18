let mailErrorMessage, mailField, mailInput, mailLabel;

const isValidEmailAddress = function(emailAddress) {
	// Basis manier om e-mailadres te checken.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};
const addErrors = function() {
	mailField.classList.add('s-has-error');
	mailErrorMessage.classList.remove('u-hide');
};

const removeErrors = function() {
	mailField.classList.remove('s-has-error');
	mailErrorMessage.classList.add('u-hide');
};

/* -------------------------------------------------------------------------- */
const doubleCheckEmailAddress = function() {
	if (isValidEmailAddress(mailInput.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		mailInput.removeEventListener('input', doubleCheckEmailAddress);
		removeErrors();
	} else {
		// Stuk herhalende code.
		if (mailInput.value == '') {
			mailErrorMessage.innerText = 'This field is required.';
		} else {
			mailErrorMessage.innerText = 'Invalid emailaddress.';
		}
	}
};

const ListenToFocus = function() {
	mailInput.addEventListener('focus', function() {
		console.log('we zijn gefocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'This field is required.';
			} else {
				console.log(mailInput.value);
				mailErrorMessage.innerText = 'Invalid emailaddress.';
			}
			addErrors();
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
	mailInput.addEventListener('blur', function() {
		console.log('we zijn ontfocused');
		if (!isValidEmailAddress(mailInput.value)) {
			if (isEmpty(mailInput.value)) {
				mailErrorMessage.innerText = 'This field is required.';
			} else {
				console.log(mailInput.value);
				mailErrorMessage.innerText = 'Invalid emailaddress.';
			}
			addErrors();

			// Gebruik een named function (doubleChecEmailAdress), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
};

const ListenToButton = function(button) {
	button.addEventListener('click', function(event) {
		// We gaan de form zelf versturen wanneer nodig.
		event.preventDefault();

		if (isValidEmailAddress(mailInput.value)) {
			console.log('Form is good to go!');
		} else {
			// Stuk herhalende code...

			addErrors();
			mailInput.addEventListener('input', doubleCheckEmailAddress);
		}
	});
};

const GetDomElements = function() {
	mailField = document.querySelector('.js-email-field');
	mailLabel = document.querySelector('.js-email-label');
	mailInput = document.querySelector('.js-email');
	mailErrorMessage = document.querySelector('.js-mail-errormessage');
	submitButton = document.querySelector('.js-button');
	console.log(mailField, mailLabel, mailInput, mailErrorMessage);

	ListenToFocus();
	ListenToButton(submitButton);
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	GetDomElements();
};
document.addEventListener('DOMContentLoaded', init);
