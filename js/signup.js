"use strict";

function onReady() {
	var jobForm = document.getElementById("signup");
	jobForm.addEventListener("submit", onSubmit);
}

document.addEventListener('DOMContentLoaded', onReady);

function onSubmit(eventObject) {
	//Gets all the required elements. If any of them are blank, make the field
	//red and don't allow the webpage to submit.
	var isValid
	isValid = true;
	var n = document.getElementById("firstName");
	var l = document.getElementsByName("lastName")[0];
	var a = document.getElementById("address1");
	var c = document.getElementById("city");
	var s = document.getElementsByName("state")[0];
	var z = document.getElementsByName("zip")[0];
	var b = document.getElementById("birthdate");
	var selection = document.getElementById("occupation").value;

	var tempValue;
	var i;

	var validArray = [n, l, a, c, s, z, b];

	if (selection == "other") {
		var o = document.getElementsByName('occupationOther')[0];
		validArray.push(o);
	}

	for (i = 0; i < validArray.length; i++) {
		tempValue = validArray[i].value;
		tempValue = tempValue.trim();
		if (tempValue == "") {
			isValid = false;
			validArray[i].style.borderColor = "#FF0000";
			 if (eventObject.preventDefault) {
       	 		eventObject.preventDefault();
    	 	 }
    	 	 eventObject.returnValue = false;
		} else {
			validArray[i].style.borderColor = "#FFFFFF";
		}
	}

	//Ensure that the zip code is in the correct format.
	var zipRegExp = new RegExp('^\\d{5}$');
	var zipCheck = zipRegExp.test(z.value);
	console.log(zipCheck);

	if (!zipCheck) {
		if (eventObject.preventDefault) {
       	 	eventObject.preventDefault();
    	 }
    	 eventObject.returnValue = false;
    	 isValid = false;
    	 z.style.borderColor = "#FF0000";
	} else {
		 z.style.borderColor = "#FFFFFF";
	}
	
	//Calculate the age of the person. All ages below 13 are invalid. 
	var age;
	var dob = new Date(b.value);
	var currDate = new Date();
	console.log(dob);
	console.log(currDate);
	age = currDate.getUTCFullYear() - dob.getUTCFullYear();

	if (dob.getUTCMonth() > currDate.getUTCMonth()) {
		age--;
		console.log("earlier month");
	}
	else if (dob.getUTCMonth() == currDate.getUTCMonth() && dob.getUTCDate() < currDate.getUTCDate()) {
		age--;
	}

	if (age < 13) {
		document.getElementById("birthdateMessage").innerHTML = "You can't sign up if you're under 13";
		if (eventObject.preventDefault) {
       	 		eventObject.preventDefault();
    	 	 }
    	 	 eventObject.returnValue = false;
    	 	 isValid = false;
	}
    
    // Don't let the form submit if any of the validation tests did not succeed. 
    if (!isValid) {
    	return isValid;
    }
	
	var signupForm = document.getElementById('signup');
	signupForm.addEventListener('submit', onSubmit);
}

document.addEventListener("DOMContentLoaded", function() {
	//Display the 'specify other' field when 'other' is selected
	document.addEventListener("change", function() {
		var selection = document.getElementById("occupation");
		var hiddenOther = document.getElementsByName('occupationOther')[0];
		if (selection.value == "other") {
			hiddenOther.style.display = "block";
		} else {
			hiddenOther.style.display = "none";
		}
	});

	//Navigate the users to google.com
	var cancelButton = document.getElementById("cancelButton");
	cancelButton.addEventListener('click', function () {
		if (window.confirm("No wait don't stop come back.")) {
			window.location = 'http://www.google.com';
		}
	});
	
	//Get the US states from an array and append them to the selection list
	var signForm = document.getElementById('signup');
	var stateSelect = signForm.elements['state']
	var i;
	var currState;
	var option;

	for (i = 0; i < usStates.length; i++) {
		currState = usStates[i];
		option = document.createElement('option');
		option.value = currState.name;
		option.innerHTML = currState.code;
		stateSelect.appendChild(option);
	}

});