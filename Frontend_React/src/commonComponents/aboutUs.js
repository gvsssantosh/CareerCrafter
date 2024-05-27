import React from 'react';
import { Link } from 'react-router-dom';
import './about.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="hero">
      <img src="/images/about.jpg" alt="Career Crafter" className="hero-image" />
        <h1>Welcome to Career Crafter</h1>
        <p>Where we believe in crafting the perfect career path for every individual.</p>
        <Link to="/" className="home-link">Go to Home</Link>
      </section>

      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2019, Career Crafter was born out of a desire to revolutionize the job market. We noticed the challenges that both job seekers and employers face in finding the right fit. Our team of passionate professionals came together to create a platform that simplifies this process through innovative technology, personalized experiences, and a deep understanding of the job market.
        </p>
      </section>

      <section className="what-we-offer">
        <h2>What We Offer</h2>
        <div className="job-seekers">
          <h3>For Job Seekers:</h3>
          <ul>
            <li><strong>Tailored Job Recommendations:</strong> Our advanced algorithm matches your skills, experiences, and preferences with the perfect job opportunities.</li>
            <li><strong>Resume Building Tools:</strong> Create a standout resume with our easy-to-use tools and templates designed to highlight your strengths.</li>
            <li><strong>Career Guidance:</strong> Access expert advice, career tips, and resources to help you navigate your job search and career development.</li>
            <li><strong>Job Alerts:</strong> Stay informed with customized job alerts that notify you of new opportunities in your field.</li>
          </ul>
        </div>
        <div className="employers">
          <h3>For Employers:</h3>
          <ul>
            <li><strong>Efficient Recruitment:</strong> Post job openings and find the right candidates quickly with our intuitive platform and extensive database.</li>
            <li><strong>Candidate Matching:</strong> Utilize our smart matching technology to connect with candidates who best fit your job requirements and company culture.</li>
            <li><strong>Employer Branding:</strong> Enhance your employer brand with customizable company profiles and showcase what makes your organization a great place to work.</li>
            <li><strong>Analytics and Insights:</strong> Gain valuable insights into your recruitment process with our analytics tools, helping you make informed hiring decisions.</li>
          </ul>
        </div>
      </section>

      <section className="our-values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Innovation:</strong> We are committed to continuously improving and evolving our platform to meet the changing needs of the job market.</li>
          <li><strong>Integrity:</strong> We uphold the highest standards of integrity in everything we do, ensuring trust and transparency for our users.</li>
          <li><strong>Inclusivity:</strong> We believe in equal opportunities for all and strive to create an inclusive environment where everyone can thrive.</li>
          <li><strong>Excellence:</strong> We aim for excellence in every aspect of our service, delivering top-notch solutions and support to our users.</li>
        </ul>
      </section>

      <section className="our-team">
        <h2>Our Team</h2>
        <p>
          Our team at Career Crafter is a diverse group of professionals with a shared passion for helping people achieve their career goals. From our tech experts who develop cutting-edge features to our customer support specialists who are always ready to assist, every member of our team is dedicated to providing the best possible experience for our users.
        </p>
      </section>

      <section className="join-us">
        <h2>Join Us</h2>
        <p>
          Whether you’re a job seeker looking for your next opportunity or an employer searching for the perfect candidate, Career Crafter is here to support you every step of the way. Join us today and let us help you craft your career.
        </p>
        <p>Thank you for choosing Career Crafter – Your Path to Success!</p>
      </section>

      
    </div>
  );
};

export default AboutUs;
