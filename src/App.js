import React from "react";
import "./App.css";
import "./styles.css";

function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-dark shadow-sm px-3 py-3">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={process.env.PUBLIC_URL + "/images/cpess.png"}
              alt="School Logo"
              style={{ height: 40, width: "auto", marginRight: 10 }}
            />
            School Bill Tracker
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-3">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contacts
                </a>
              </li>
            </ul>

            <a
              href={process.env.PUBLIC_URL + "/pages/login.html"}
              className="btn btn-warning"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h1 className="fw-bold mb-3 display-5">
                Track Your School Bills
                <br />
                Easily
              </h1>

              <p className="mb-4 lead text-secondary">
                Stay on top of your school payments with our simple and efficient billing system.
              </p>

              <a
                href={process.env.PUBLIC_URL + "/pages/login.html"}
                className="btn btn-warning btn-lg"
              >
                Get Started
              </a>
            </div>

            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <div className="logo-flip-container ms-auto">
                <div className="logo-flipper">
                  <div className="logo-front">
                    <img
                      alt="cpess"
                      className="img-fluid rounded hero-img"
                      src={process.env.PUBLIC_URL + "/images/cpess.png"}
                    />
                  </div>

                  <div className="logo-back">
                    <img
                      alt="ub"
                      className="img-fluid rounded hero-img"
                      src={process.env.PUBLIC_URL + "/images/ub.png"}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-5 mt-5">
        <div className="container">
          <div className="footer-stack">

            {/* About */}
            <div className="footer-block mb-4" id="about">
              <h4 className="text-accent-gold mb-3">About Us</h4>
              <p className="text-white-75">
                Our school billing system makes it easy for students to track and manage their educational expenses.
              </p>
            </div>

            {/* Contact */}
            <div className="footer-block mb-4" id="contact">
              <h4 className="text-accent-gold mb-3">Contact us</h4>

              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-map-marker-alt me-2 text-accent-gold"></i>
                  <span className="text-white-75">
                    123 School Street, Education City
                  </span>
                </li>

                <li className="mb-2">
                  <i className="fas fa-phone me-2 text-accent-gold"></i>
                  <span className="text-white-75">
                    +1 (555) 123-4567
                  </span>
                </li>

                <li>
                  <i className="fas fa-envelope me-2 text-accent-gold"></i>
                  <a
                    href="mailto:contact@school.edu"
                    className="text-white-75 text-decoration-none"
                  >
                    contact@school.edu
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="footer-block mb-4" id="follow">
              <div className="social-links mb-4 text-center">
                <h4 className="text-accent-gold mb-3">Follow us</h4>

                <a href="#" className="text-white me-3">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="#" className="text-white me-3">
                  <i className="fab fa-twitter"></i>
                </a>

                <a href="#" className="text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>

              <p className="text-white mb-0 text-center">
                © 2025 School Bill Tracker. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}

export default App;