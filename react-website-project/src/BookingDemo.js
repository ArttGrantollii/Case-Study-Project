import React, { useState, useEffect } from 'react';
import './App.css';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil"
];


const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
const validateDateOfBirth = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
};

const BookingDemo = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    terms: false,
  });

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const countrySelect = document.getElementById("country");
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      country: '',
      terms: false,
    });
    setFeedback('');
  };

  const showMessage = (message, type = 'info') => {
    setFeedback(message);
    setTimeout(() => setFeedback(''), 3000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      country,
      terms,
    } = formData;

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
      setLoading(false);
      return;
    }

    // Mock server request
    const response = await mockServerRequest({
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      country,
    });

    setLoading(false);
    if (response.success) {
      showMessage(response.message, 'success');
    } else {
      showMessage(response.message, 'error');
    }
  };

  const mockServerRequest = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.email === "test@example.com") {
          resolve({ success: false, message: 'This email is already registered.' });
        } else {
          resolve({ success: true, message: 'Form submitted successfully!' });
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <section id="booking" className="booking-section">
      <div className="container">
        <div className="booking-content">
          <h1>Book a Free Demo Now</h1>
          <p>
            Tell us a little about yourself, and we'll connect you with a Superchat expert who can tell you more about the product and answer your questions.
          </p>
        </div>

        <div className="booking-form">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <br /><br />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <br /><br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <br /><br />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <br /><br />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <br /><br />

            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <br /><br />

            <label>Gender</label>
            <br />
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            <label htmlFor="male">Male</label>
            <br />
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            <label htmlFor="female">Female</label>
            <br />
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              onChange={handleChange}
              required
            />
            <label htmlFor="other">Other</label>
            <br /><br />

            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a country</option>
              {/* Country options will be populated dynamically */}
            </select>
            <br /><br />

            <label htmlFor="terms">Terms and Conditions</label>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <br /><br />

            <button type="reset" id="reset-btn">Reset</button>
            <input type="submit" value="Submit" id="submit-btn" />

            {loading && (
              <div id="spinner">Submitting...</div>
            )}
            <div id="overlay" style={{ display: loading ? 'block' : 'none' }}></div>
          </form>
          <br /><br />
          {feedback && (
            <div id="feedback" className="feedback-message">
              {feedback}
            </div>
          )}

          <p className="privacy-policy">
            For more information about how Superchat handles your personal information, please visit our{' '}
            <a href="#">privacy policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookingDemo;
