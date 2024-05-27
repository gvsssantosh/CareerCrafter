import React from 'react';
import { Link } from 'react-router-dom';
import './contactus.css'; // Import CSS file for styling

const ContactUs = () => {
  return (
    <div className="contact-us">
      <img src="/Images/contact.jpg" alt="Top Banner" className="top-image" />
      
      <section className="contact">
      <div className="home-link">
          <Link to="/" className='contactUs'>Back to Home</Link>
        </div>
        <p>For any inquiries or support, please feel free to contact us at <a href="mailto:careercrafter@gmail.com">careercrafter@gmail.com</a>.</p>
        
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> +123-456-7890</p>
          <p><strong>Email:</strong> careercrafter@gmail.com</p>
          <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>
          <p><strong>Address:</strong> 123 Career Crafter Lane, Jobsville, JS 12345</p>
        </div>

        <div className="social-media">
          <p>Follow us on:</p>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <div className="contact-form">
          
          <span>
          <form>
            
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className='contact-form'>Submit</button>
          </form>
          </span>
          <span><div className="side-by-side-images">
        <img src="/images/contact2.avif" alt="Background Image" className="background-image" />
      </div></span>
        </div>
        
      </section>
      
    </div>
  );
};

export default ContactUs;
