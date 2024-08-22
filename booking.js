const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", 
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", 
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
  "Bosnia and Herzegovina", "Botswana", "Brazil"
];

const dropdown = document.getElementById("country");

countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  dropdown.appendChild(option);
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phoneNumber);
}

function validatePassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}

function validateDateOfBirth(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age >= 18;
}

function showMessage(message, type = 'info') {
  const feedbackElement = document.getElementById('feedback');
  
  // Set the message and type
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback-message ${type}`;
  
  // Display the message
  feedbackElement.style.display = 'block';
  
  // Optionally, hide the message after a few seconds
  setTimeout(() => {
      feedbackElement.style.display = 'none';
  }, 3000); // Hide after 3 seconds
}

document.getElementById("submit-btn").addEventListener("click", function (event) {
  event.preventDefault();

  const form = document.getElementById("form");
  const loadingSpinner = document.getElementById("spinner");
  const overlay = document.getElementById("overlay");

  if (form.checkValidity()) {
      loadingSpinner.style.display = "block";
      overlay.style.display = "block";

      const fullName = document.getElementsByName("Full Name")[0].value;
      const email = document.getElementsByName("Email")[0].value;
      const password = document.getElementsByName("Password")[0].value;
      const confirmPassword = document.getElementsByName("Confirm Password")[0].value;
      const phoneNumber = document.getElementsByName("Phone Number")[0].value;
      const dateOfBirth = document.getElementsByName("Date of Birth")[0].value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const country = document.getElementById("country").value;
      const termsAndConditions = document.getElementById("Terms and Conditions").checked;

      let isValid = true;

      if (!validateEmail(email)) {
          showMessage("Email is not acceptable", 'error');
          isValid = false;
      }

      if (!validatePassword(password)) {
          showMessage("Password is not acceptable", 'error');
          isValid = false;
      }
      if (password !== confirmPassword) {
          showMessage("Passwords do not match", 'error');
          isValid = false;
      }
      if (!validatePhoneNumber(phoneNumber)) {
          showMessage("Phone number is not acceptable", 'error');
          isValid = false;
      }
      if (!validateDateOfBirth(dateOfBirth)) {
          showMessage("Date of Birth is not acceptable", 'error');
          isValid = false;
      }

      if (!isValid) {
          loadingSpinner.style.display = "none";
          overlay.style.display = "none";
          return;
      }

      const data = {
          fullName: fullName,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirth,
          gender: gender,
          country: country
      };

      // Simulate AJAX request to a mock server
      mockServerRequest(data)
          .then(response => {
              loadingSpinner.style.display = "none";
              overlay.style.display = "none";

              if (response.success) {
                  showMessage(response.message, 'success');
              } else {
                  showMessage(response.message, 'error');
              }
          })
          .catch(error => {
              loadingSpinner.style.display = "none";
              overlay.style.display = "none";
              showMessage('An unexpected error occurred. Please try again later.', 'error');
          });

  } else {
      form.reportValidity();
  }
});

function mockServerRequest(data) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // Simulate server-side validation
          if (data.email === "test@example.com") {
              resolve({
                  success: false,
                  message: 'This email is already registered.'
              });
          } else {
              resolve({
                  success: true,
                  message: 'Form submitted successfully!'
              });
          }
      }, 1000); // Simulate network delay
  });
}
