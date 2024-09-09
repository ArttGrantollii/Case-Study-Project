import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutUs from './AboutUs'; 
import BookingDemo from './BookingDemo';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Superchat</div>
    <ul className="nav-links">
      <li>
        <a href="#">Product</a>
        <ul className="dropdown">
          <li><a href="#">Features</a></li>
          <li><a href="#">Integrations</a></li>
          <li><a href="#">API</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Solutions</a>
        <ul className="dropdown">
          <li><a href="#">For Small Business</a></li>
          <li><a href="#">For Enterprise</a></li>
          <li><a href="#">For Startups</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Customers</a>
        <ul className="dropdown">
          <li><a href="#">Case Studies</a></li>
          <li><a href="#">Testimonials</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Prices</a>
        <ul className="dropdown">
          <li><a href="#">Pricing Plans</a></li>
          <li><a href="#">Free Trial</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Resources</a>
        <ul className="dropdown">
          <li><a href="#">Blog</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Webinars</a></li>
        </ul>
      </li>
      <li>
      <Link to="/about">About Us</Link>
        <ul className="dropdown">
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </li>
    </ul>
    <div className="nav-buttons">
      <button className="login">Log in</button>

      <Link className="link-aa"to="/booking">Book a Demo</Link>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>All-in-one messaging software for your business</h1>
      <p>
        Build loyal customer relationships, send & automate newsletters, sell
        products, answer questions – everything is possible with Superchat.
      </p>
      <div className="cta-buttons">
        <button className="try-free">Try Superchat for free</button>
        <a href="booking.html" className="book-demo">Book a Demo</a>
      </div>
      <div className="meta-partners">
        <span>Meta Business Partners</span>
        <span className="rating">⭐ 4.8 Stars &nbsp; 216 Reviews</span>
      </div>
    </div>
    <div className="hero-image">
      <img
        src="https://www.superchat.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmockup-en.36024343.png&w=1080&q=75"
        alt="Superchat Dashboard"
      />
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials">
    <h2>You are in good company</h2>
    <p>Read what our customers say about us and see for yourself!</p>
    <div className="ratings">
      <div className="rating-item">
        <img
          src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/logo_Google_FullColor_3x_830x27.max-600x600.format-webp.webp"
          alt="Google"
        />
        <p>4.8 / 5</p>
      </div>
    </div>
    <div className="testimonial-grid">
      <div className="testimonial">
        <p>
          "Customers will not download an extra app for pharmacies or the
          e-prescription. In my opinion, WhatsApp is the most natural solution
          here."
        </p>
        <span>Adrian Knoch - easyApotheke Duderstadt</span>
      </div>
      <div className="testimonial">
        <p>
          "We can map our entire sales process in Superchat's messaging
          software. We have a separate mailbox for each phase. That makes our
          work clear."
        </p>
        <span>Andreas Niemiec - Niemiec Versicherungsmakler GmbH & Co. KG</span>
      </div>
      {/* Add more testimonials as needed */}
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <p>Superchat - The name says it all</p>
        <div className="footer-social">
          <a href="#">
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png"
              alt="LinkedIn"
            />
          </a>
          <a href="#">
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/instagram_icon-instagram_buttoninstegram-512.png"
              alt="Instagram"
            />
          </a>
          <a href="#">
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png"
              alt="Facebook"
            />
          </a>
          <a href="#">
            <img
              src="https://cdn0.iconfinder.com/data/icons/logos-brands-7/512/TikTok_logo_app0-512.png"
              alt="TikTok"
            />
          </a>
        </div>
        <div className="footer-contact">
          <p><strong>Phone:</strong> +44 1224 051727</p>
          <p><strong>Email:</strong> hello@superchat.com</p>
        </div>
      </div>
      {/* Add more footer sections */}
    </div>
    <div className="footer-bottom">
      <p>
        &copy; 2024 SuperX GmbH &bull; <a href="#">Imprint</a> &bull;{' '}
        <a href="#">Data Privacy</a> &bull; <a href="#">Terms of Use</a> &bull;{' '}
        <a href="#">Cookie Settings</a>
      </p>
    </div>
  </footer>
);

const App = () => {
  return (
    <Router>
      <header>
       
      </header>
      <Routes>
        <Route path="/" element={<div> <Navbar /> <Hero /><Testimonials /> <Footer /></div>} />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/booking"element={<BookingDemo/>} />
      </Routes>
      
    </Router>
  );
};

export default App;

