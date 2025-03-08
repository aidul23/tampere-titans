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
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import CreateTournament from "./pages/CreateTournament"
import Activity from "./pages/Activity";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/players" element={<Players />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route
          path="/activities"
          element={
            <ErrorBoundary fallback={<div>Something went wrong with loading activities.</div>}>
              <Activity />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
