import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./testimonialCards.css";

const testimonials = [
    { title: "Dream Job in Tech", review: "Thanks to Career Crafter, I found my dream job in tech! The streamlined application process made it a breeze.", user: "Alexandra, Software Engineer" },
    { title: "New Graduate Success", review: "As a recent graduate, I was overwhelmed by job hunting. Career Crafter connected me with opportunities I didn’t even know existed!", user: "Rahul, Marketing Specialist" },
    { title: "Smooth Career Transition", review: "The personalized job recommendations on Career Crafter helped me transition smoothly from finance to healthcare.", user: "Priya, Healthcare Consultant" },
    { title: "Effortless IT Job Search", review: "Career Crafter made my job search in the IT sector effortless. Their intuitive platform matched me with a top role in cybersecurity!", user: "Jake, Cybersecurity Analyst" },
    { title: "Secured a Tech Position", review: "Thanks to Career Crafter, I secured a position at a leading tech firm. The personalized guidance was invaluable.", user: "Emily, Data Scientist" },
    { title: "First Job Success", review: "As a recent IT graduate, I found Career Crafter’s resources incredibly helpful in landing my first job as a software developer.", user: "Michael, Junior Developer" },
    { title: "Perfect Job Alerts", review: "The job alerts on Career Crafter were spot on! I found a fantastic opportunity as a network engineer with their help.", user: "Laura, Network Engineer" },
    { title: "Ideal Company Fit", review: "Career Crafter's detailed company profiles helped me find a great fit in the IT sector. I’m now thriving as a systems administrator.", user: "Kevin, Systems Administrator" },
    { title: "Easy Career Switch", review: "Switching careers felt daunting until I used Career Crafter. Their platform made it easy to transition from law to corporate compliance.", user: "Sarah, Compliance Officer" },
    { title: "Educational Opportunities", review: "Career Crafter’s comprehensive database connected me with numerous opportunities in the education sector. I love my new role as an instructional designer!", user: "Megan, Instructional Designer" },
    { title: "Renewable Energy Job", review: "I never imagined finding a job in the renewable energy sector could be so straightforward. Career Crafter’s platform was a game-changer for me.", user: "Daniel, Environmental Engineer" },
    { title: "Fashion Industry Role", review: "With Career Crafter, I landed a fantastic role in the fashion industry. Their job matching algorithm is incredibly accurate!", user: "Chloe, Fashion Buyer" },
    { title: "Dream Job in Hospitality", review: "Career Crafter provided me with excellent resources to find my dream job in the hospitality industry. I’m now a successful event planner.", user: "Lucas, Event Planner" }
];


  
const TestimonialsCarousel = () => {
    return (
      <div className="testimonials-carousel-container">
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <Carousel.Item key={index} className="testimonials-carousel-item">
              <Card className="testimonial-card">
                <Card.Header className="testimonial-card-header">{testimonial.title}</Card.Header>
                <Card.Body className="testimonial-card-body">
                  <blockquote className="blockquote mb-0">
                    <p> {testimonial.review} </p>
                    <footer className="blockquote-footer">
                      {testimonial.user}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };
export default TestimonialsCarousel;


  

  
  // Add this CSS in your stylesheet or <style> tag
  