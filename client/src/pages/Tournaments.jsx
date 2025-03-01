import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported

const tournaments = [
  {
    id: 1,
    name: "Tampere Football Mania",
    date: "July 15-20, 2024",
    location: "Tampere Stadium",
    image: "src/assets/tournament.jpg",
    isLive: true
  },
  {
    id: 2,
    name: "Winter Titans League",
    date: "December 5-10, 2024",
    location: "Tampere Indoor Arena",
    image: "src/assets/tournament.jpg",
    isLive: false
  },
];

const Tournaments = () => {
  return (
    <div className="bg-primary min-h-screen text-white mt-10">

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-white mb-6 p-8">🏆 Our Tournaments</h1>

        <div className="space-y-6">
          {tournaments.map((tournament) => (
            <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
              <div className="flex items-center bg-white text-black shadow-lg rounded-lg overflow-hidden 
                  hover:shadow-xl transition transform hover:scale-105 cursor-pointer m-4">

                {/* ✅ Fix Image Source */}
                <img src={tournament.image} alt={tournament.name} className="w-40 h-40 object-cover" />

                <div className="p-4">
                  <h2 className="text-2xl font-bold text-secondary">{tournament.name}</h2>
                  {tournament.isLive && (
                    <div className="inline-block px-3 py-1 mt-2 text-sm w-20 font-semibold text-white bg-green-500 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></span>
                      Live
                    </div>)}
                  <p className="text-gray-600 m-2">📅 {tournament.date}</p>
                  <p className="text-gray-600 m-2">📍 {tournament.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
