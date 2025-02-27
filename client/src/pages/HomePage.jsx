import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
      <h1 className="text-6xl font-extrabold text-light shadow-lg">
        Welcome to Tampere Titans
      </h1>
      <p className="mt-4 text-xl text-secondary font-medium shadow-md">
        Power, Passion, Football.
      </p>
      <button onClick={() => navigate("/join")} className="mt-6 px-6 py-3 bg-secondary text-black rounded-lg text-lg font-semibold hover:bg-accent hover:shadow-xl transition transform hover:scale-105">
        Join the Team
      </button>
    </motion.div>
  </div>
  ) 
};

export default HomePage;
