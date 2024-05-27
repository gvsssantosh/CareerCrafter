import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageGrid.css'; // Import the custom CSS file

const ImageGrid = () => {
  // Array of image sources
  const images = [
    './images/im.png',
    './images/im1.png',
    './images/im2.png',
    './images/im3.png',
    './images/im4.png',
    './images/im5.png',
    './images/im6.png',
    './images/im7.png',
    './images/im8.png'
  ];

  return (
    <div className="container mt-5">
      <div className="image-box">
        <h2>Featured Companies Actively Hiring</h2>
        <div className="row">
          {images.map((src, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="card">
                <img src={src} className="card-img-top" alt={`Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
