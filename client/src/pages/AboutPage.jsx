import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 text-center mt-20">

      <div className="flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-x-8 lg:space-y-0">
        {/* Left Section: Text */}
        <div className="w-full lg:w-1/2 text-left">
          <h2 className="text-3xl font-semibold text-primary mb-4">Who We Are?</h2>
          <p className="text-lg text-gray-700 mb-4">
          Welcome to <span className="text-secondary"><strong>Tampere Titans</strong></span>, a passionate football club committed to excellence, teamwork, and sportsmanship by Bangladeshi community in Tampere, Finland.
          Established in 2017, we have been bringing together talented players and dedicated fans to celebrate the beautiful game.
          </p>
          <p className="text-lg text-gray-700 mb-4">
          Our mission is to foster a strong football community by training, competing, and inspiring athletes of all levels.
          Whether you're a seasoned player or just starting out, Tampere Titans welcomes you to be part of something bigger.
          </p>
          <button
            onClick={() => navigate("/join")}
            className="mt-4 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-primary transition">
            Join Us
          </button>
        </div>

        {/* Right Section: Carousel */}
        <div className="w-full lg:w-1/2">
          <Swiper
            spaceBetween={50}  // Space between slides
            slidesPerView={1}  // Number of slides to show at once
            loop={true}         // Enable infinite loop
            autoplay={{
              delay: 3000,      // 3 seconds between slides
              disableOnInteraction: false, // Allow autoplay to continue after interaction
            }}
            className="rounded-lg shadow-lg"
          >
            <SwiperSlide>
              <img
                src="/src/assets/team_photo.jpeg"
                alt="Team"
                className="w-full object-cover rounded-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Team's Values Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-primary mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-primary/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-secondary">🏆 Excellence</h3>
            <p className="mt-2 text-gray-700">
              We are committed to constantly improving ourselves and our game.
            </p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-secondary">🤝 Teamwork</h3>
            <p className="mt-2 text-gray-700">
              Collaboration is the key to success. We work together both on and off the field.
            </p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-secondary">💪 Determination</h3>
            <p className="mt-2 text-gray-700">
              We never back down from a challenge, and we fight until the final whistle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
