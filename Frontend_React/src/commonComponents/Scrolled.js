import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Scroll.css';
function ScrollImages() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/scroll1-transformed.jpeg"
          alt="First slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/scroll2-transformed.jpeg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/scroll4.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/scroll6.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/scroll7-transformed.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ScrollImages;
