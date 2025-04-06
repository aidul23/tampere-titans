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
import { ToastContainer } from "react-toastify";
import PostActivity from "./pages/PostActivity";
import PlayerDetails from "./pages//PlayerDetails";
import PrivateRoute from "./routes/PrivateRoute"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* Protected Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/post" element={<PostActivity />} />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Router>
  );
}

export default App;
