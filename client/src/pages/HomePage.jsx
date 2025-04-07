import React, {useState, useEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';
import "@fortawesome/fontawesome-free/css/all.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/achievement/achievements");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  const events = [
    {
      id: 1,
      title: "Friendly Football Tournament",
      date: "2025-04-20T17:00:00", // Event date (ISO 8601 format)
      location: "Stadium Arena",
      description: "Titans vs Wolves match",
      image: "https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/476159134_473683085795541_883784141100703877_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KbhVC_dT3t0Q7kNvwEsz7H3&_nc_oc=Adl6HJB0mDHGGuIpk6lpM7eV3FcqiDn-8KKMUnT0CE6EjdYPT8apG6xR6y62PPiiZ2U&_nc_zt=23&_nc_ht=scontent-hel3-1.xx&_nc_gid=tc9XpSU5v6Jebh0vDxk6TA&oh=00_AfFtUPPwyVvjS4xnQzR2foU7q6XVAJKzWvI1_1h4AbKS3A&oe=67F86A21" // Banner image URL
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary via-primary/60 to-primary/30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/team_photo.jpeg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/70 z-10"></div>

        {/* Content */}
        <motion.div
          className="relative text-light text-center p-8 mt-24 space-y-6 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-extrabold text-light">
            Welcome to Tampere Titans
          </h1>
          <p className="mt-4 text-xl text-secondary font-medium">
            Power, Passion, Football.
          </p>
          <button
            onClick={() => navigate("/join")}
            className="mt-6 px-6 py-3 bg-secondary text-black rounded-lg text-lg font-semibold hover:bg-accent hover:shadow-xl transition transform hover:scale-105"
          >
            Join the Team
          </button>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <section className="min-h-screen text-black w-full py-16 px-6 text-center relative flex items-center justify-center flex-col">
        {/* Background Image Container */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[50vw] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/trophy.png')",
            transform: 'translateX(50%)', // Push half out of the screen
            opacity: '0.3',
          }}
        ></div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Content Block Centered */}
        <div className="relative z-10 max-w-4xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-white">Achievements</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((ach, index) => (
              <div key={index} className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-primary">{ach.title}</h3>
                <p className="mt-2 text-gray-700">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Upcoming Events Section */}
      <section className="min-h-screen bg-primary text-black w-full py-16 px-6 text-center relative flex items-center justify-center flex-col">
        {/* Background Image Container */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[50vw] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/ball-net.png')",
            transform: 'translateX(-20%)', // Push half out of the screen to the left
            opacity: '0.2',
          }}
        ></div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>

        <h2 className="text-4xl font-bold mb-8 text-accent relative z-10">Upcoming Events</h2>
        <div className="relative z-10 max-w-2xl w-full">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded-xl shadow-md relative mt-4">
              {/* Banner image */}
              <div
                className="absolute top-0 left-0 right-0 h-60 rounded-t-xl"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '0.75rem 0.75rem 0 0',
                }}
              />
              <div className="relative pt-56 px-4">  {/* Adjust the padding to create space for the image */}
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-700">📍 {event.location}</p>
                <p className="text-gray-700">🗓️ {new Date(event.date).toLocaleDateString()} | 🕒 {new Date(event.date).toLocaleTimeString()}</p>
                <Countdown
                  date={new Date(event.date).getTime()}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    if (completed) {
                      return <p className="text-green-500 font-bold">Event Started!</p>;
                    } else {
                      return (
                        <p className="text-gray-700 m-2">
                          <span className="text-4xl font-bold">{days} : {hours} : {minutes} : {seconds}</span>
                        </p>
                      );
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Social Media Section */}
      <section className="bg-primary text-white py-6 px-6 text-center w-full">
        <h2 className="text-4xl font-bold mb-6 text-accent">Follow Us</h2>
        <div className="flex justify-center gap-6 text-3xl">
          <a
            href="https://www.facebook.com/profile.php?id=100094615600057"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100094615600057"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100094615600057"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
