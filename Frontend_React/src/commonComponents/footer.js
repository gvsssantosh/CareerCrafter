import React from 'react';
import './footer.css'; // Make sure to create a Footer.css file with the provided CSS

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>Career<span>Crafter</span></h3>
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <br />
          <a href="/aboutUs">About</a>
          <br />
          <a href="/contactUs">Contact</a>
        </p>
        <p className="footer-company-name">Career Crafter © 2024</p>
      </div>
      <div className="footer-center">
        <div>
          <i class="bi bi-geo-alt"></i>
          <p><span>Park Avenue</span> Hitec City, Hyderabad, India</p>
        </div>
        <div>
          <i class="bi bi-telephone"></i>
          <p>+91 9848333225</p>
        </div>
        <div>
          <i class="bi bi-envelope"></i>
          <p><a href="mailto:support@careercrafter.com">support@careercrafter.com</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Career Crafter is a leading job portal offering innovative solutions for job seekers and employers in the tech industry.
        </p>
        <div className="footer-icons">
          <a href="#"><i class="bi bi-facebook" ></i></a>
          {/* <i class="bi bi-facebook"></i> */}
          <a href="#"><i class="bi bi-twitter-x"></i></a>
          <a href="#"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
