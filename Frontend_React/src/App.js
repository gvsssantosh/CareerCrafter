import logo from './logo.svg';
import './App.css';

import ScrollImages from './commonComponents/Scrolled';
import TestimonialsCarousel from './commonComponents/testimonialCards';
import Header from './commonComponents/header';
import Footer from './commonComponents/footer';

import ImageGrid from './commonComponents/imageGrid';

function App() {
  return (
    // <div style={{ textAlign: "center" }} >
    //   {/* <img src="/images/Banner.jpg" width="90%" height="250" alt="Alternate text" /> */}
    // </div>
    <>
      {/* <CarouselHome /> */}
      <Header />
      <ScrollImages />
      <TestimonialsCarousel />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <video autoPlay muted loop className="bg-video">
          <source src="./Images/video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      <ImageGrid />

      <Footer />




    </>
  );
}

export default App;



