import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import Players from "./pages/Players";
import Tournaments from "./pages/Tournaments";
import Footer from "./components/Footer";
import "./index.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import JoinUs from "./pages/JoinUs";
import TournamentDetails from "./pages/TournamentDetails";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/players" element={<Players />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
