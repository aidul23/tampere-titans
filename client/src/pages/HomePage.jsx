import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "../helpers/api";

const HomePage = () => {
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.get("/achievement/achievements");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await api.get("/event/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAchievements();
    fetchEvents();
  }, []);


  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary via-primary/60 to-primary/30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/team_photo.jpeg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/70 z-10"></div>

        {/* Content */}
        <motion.div
          className="relative text-light text-center p-6 sm:p-8 mt-24 space-y-4 sm:space-y-6 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-light leading-tight">
            Welcome to Tampere Titans
          </h1>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl text-secondary font-medium">
            Power, Passion, Football.
          </p>
          <button
            onClick={() => navigate("/join")}
            className="mt-4 sm:mt-6 px-6 py-3 bg-secondary text-white rounded text-base sm:text-lg font-semibold hover:bg-primary hover:shadow-xl transition transform hover:scale-105"
          >
            Join Us
          </button>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <section className="relative min-h-screen text-black w-full py-16 px-4 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Background Image Container */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 w-[50vw] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/trophy.png')",
            transform: 'translateX(50%)',
            opacity: '0.3',
          }}
        ></div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Content Block Centered */}
        <div className="relative z-10 max-w-4xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">Achievements</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((ach, index) => (
              <div key={index} className="bg-white/80 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-primary">{ach.title}</h3>
                <p className="mt-2 text-gray-700 text-sm sm:text-base">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="relative min-h-screen bg-primary text-black w-full py-16 px-4 sm:px-6 text-center flex flex-col items-center justify-center">
        {/* Background Image Container */}
        <div
          className="hidden md:block absolute top-0 bottom-0 left-0 w-[50vw] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/ball-net.png')",
            transform: 'translateX(-20%)',
            opacity: '0.2',
          }}
        ></div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-accent relative z-10">Events</h2>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded-xl shadow-md relative mt-4 cursor-pointer"
              onClick={() => navigate(`/events/${event._id}`, { state: { event } })}
            >
              {/* Banner image */}
              <div
                className="absolute top-0 left-0 right-0 h-48 sm:h-60 rounded-t-xl"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '0.75rem 0.75rem 0 0',
                }}
              />
              <div className="relative pt-52 sm:pt-56 px-2 sm:px-4">
                <h3 className="text-lg sm:text-xl font-bold">{event.title}</h3>
                <p className="text-sm sm:text-base">{event.description}</p>
                <p className="text-gray-700 text-sm mt-2">📍 {event.location}</p>
                <p className="text-gray-700 text-sm">
                  🗓️ {new Date(event.date).toLocaleDateString()} | 🕒 {new Date(event.date).toLocaleTimeString()}
                </p>
                <Countdown
                  date={new Date(event.date).getTime()}
                  renderer={({ days, hours, minutes, seconds, completed }) => {
                    const eventDate = new Date(event.date);
                    const now = new Date();

                    if (completed) {
                      const isSameDay = eventDate.toDateString() === now.toDateString();
                      if (isSameDay) {
                        return (
                          <div className="absolute top-2 right-2 text-green-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-md z-20">
                            Finished
                          </div>
                        );
                      }
                      return (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-md z-20">
                          Finished
                        </div>
                      );
                    }

                    return (
                      <p className="text-gray-700 m-2 text-sm">
                        <span className="text-xl font-bold">
                          {days} : {hours} : {minutes} : {seconds}
                        </span>
                        <br />
                        <span className="text-xs font-semibold text-accent">
                          Time Left
                        </span>
                      </p>
                    );
                  }}
                />

                {new Date() < new Date(event.registrationDeadline) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 👈 prevents navigating to event details
                      navigate(`/events/${event._id}/register`, { state: { event } });
                    }}
                    className="mt-2 bg-secondary text-white px-4 py-2 rounded shadow hover:bg-primary transition text-sm sm:text-base"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-primary text-white py-8 px-4 sm:px-6 text-center w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-accent">Follow Us</h2>
        <div className="flex justify-center gap-6 text-2xl sm:text-3xl">
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
