import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white p-6 pt-24">
      <div className="max-w-4xl bg-white text-black p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-primary mb-6">About Tampere Titans</h2>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src="src/assets/tampere-titan-home.jpg" // Replace this with your actual image
            alt="Tampere Titans"
            className="rounded-lg shadow-md w-80"
          />
          <img
            src="src/assets/tampere-titan-away.jpg" // Replace this with your actual image
            alt="Tampere Titans"
            className="rounded-lg shadow-md w-80 ml-4"
          />
        </div>

        {/* Dummy Content */}
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          Welcome to <span className="text-secondary"><strong>Tampere Titans</strong></span>, a passionate football club committed to excellence, teamwork, and sportsmanship by Bangladeshi community in Tampere, Finland.
          Established in 2017, we have been bringing together talented players and dedicated fans to celebrate the beautiful game.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mt-4 text-center">
          Our mission is to foster a strong football community by training, competing, and inspiring athletes of all levels.
          Whether you're a seasoned player or just starting out, Tampere Titans welcomes you to be part of something bigger.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mt-4 text-center">
          Stay connected with us for updates on upcoming matches, training sessions, and community events. 
          Together, let's make history on the field! ⚽🔥
        </p>
      </div>
    </div>
  );
};

export default AboutPage