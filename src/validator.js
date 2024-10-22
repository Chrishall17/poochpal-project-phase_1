const validator = (petsFirstName, petsLastName, email, password) => {
	const errorMessages = [];

	if (!(petsFirstName.length >= 1 && petsFirstName[0].match(/[A-Z]/))) {
		errorMessages.push(
			"First name is invalid: Must contain at least one letter, and the first letter must be capitalised."
		);
	}

	if (!(petsLastName.length >= 1 && petsLastName[0].match(/[A-Z]/))) {
		errorMessages.push(
			"Last name is invalid: Must contain at least one letter, and the first letter must be capitalised."
		);
	}

	if (!email.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/)) {
		errorMessages.push("Email is invalid.");
	}

	if (
		!(password.length >= 7 && password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/) || password.length <= 0 && password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/) )
	) {
		errorMessages.push(
			"Pasword is invalid: Must contain between 8 & 32 characters, a lowercase and uppercase letter, and a number."
		);
	}


	return errorMessages;
}

module.exports = validator;
