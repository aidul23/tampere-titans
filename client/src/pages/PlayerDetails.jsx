import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { Bar } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import api from "../helpers/api";

// Register the necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale,
  PointElement,
  LineElement,
  Filler,);

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setLoading(true); // Set loading to true when API call starts
        const response = await api.get(`/players/${id}`);
        setPlayer(response.data.player); // Assuming API response contains a "player" object
      } catch (error) {
        console.error("Error fetching player details:", error);
      } finally {
        setLoading(false); // Set loading to false when API call is done (success or failure)
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <ImSpinner2 className="animate-spin text-white text-6xl" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-white text-xl">Player not found</p>
      </div>
    );
  }

  // Player stats (retrieved from the player object)
  const stats = player.stats || { goals: 0, assists: 0, matchesPlayed: 0 };

  // Data for the chart

  const data = {
    labels: ["Goals", "Assists", "Matches Played"],
    datasets: [
      {
        label: player.name,
        data: [stats.goals, stats.assists, stats.matchesPlayed],
        backgroundColor: "rgba(229, 166, 35, 0.2)",  // Light red fill
        borderColor: "rgba(229, 166, 35, 1)",  // Darker red border
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        ticks: {
          stepSize: 5,  // Adjust step size for tick marks
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center p-20">
      <div className="max-w-4xl bg-white text-black p-8 rounded-xl shadow-xl flex flex-col items-center">
        {/* Image & Details Side by Side */}
        <div className="flex items-center gap-x-8 w-full">
          {/* Player Image */}
          <div className="relative">
            <img
              src={player.image}
              alt={player.name}
              className="w-60 h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Player Info */}
          <div className="flex flex-col justify-center">
            {/* Captain Badge (if applicable) */}
            {player.isCaptain && (
              <div className="bg-primary text-white px-3 py-2 rounded-full text-sm font-bold flex items-center space-x-1 self-start">
                <img
                  src="/assets/captain-band.png"
                  alt="Captain Band"
                  className="w-5 h-5 object-cover"
                />
                <span>Captain</span>
              </div>
            )}

            {/* Player Name */}
            <h2 className="text-4xl font-bold mt-2">{player.name}</h2>

            {/* Position & Jersey Number */}
            <div className="flex flex-col mt-2 space-y-2">
              <div className="text-primary flex items-center space-x-2">
                <img
                  src="/assets/football-boots.png"
                  alt="Position"
                  className="w-5 h-5 object-cover"
                />
                <span className="text-lg font-semibold">{player.position}</span>
              </div>
              <div className="text-primary flex items-center space-x-2">
                <img
                  src="/assets/jersey.png"
                  alt="Jersey"
                  className="w-5 h-5 object-cover"
                />
                <span className="text-lg font-semibold">#{player.jerseyNum}</span>
              </div>
            </div>
          </div>

          {/* Player Stats Graph */}
          <div className="w-100 mt-10">
            <Radar data={data} options={options} />
          </div>
        </div>

        {/* Player Stats Section */}
        <div className="w-full grid grid-cols-3 gap-6 mt-8">
          <div className="text-primary p-6 rounded-xl shadow-md flex flex-col items-center relative">
            {/* Background Icon */}
            <div className="absolute left-0 top-10 bottom-0 p-6 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: "url('/assets/goal.png')", backgroundPosition: "left center", backgroundSize: "50px 50px" }}></div>
            {/* Content */}
            <h3 className="text-2xl font-bold mb-2">Goals</h3>
            <p className="text-3xl font-bold text-yellow-500">{player.stats.goals}</p>
          </div>

          <div className="text-primary p-6 rounded-xl shadow-md flex flex-col items-center relative">
            {/* Background Icon */}
            <div className="absolute left-0 top-10 bottom-0 p-6 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: "url('/assets/passing.png')", backgroundPosition: "left center", backgroundSize: "50px 50px" }}></div>
            {/* Content */}
            <h3 className="text-2xl font-bold mb-2">Assists</h3>
            <p className="text-3xl font-bold text-yellow-500">{player.stats.assists}</p>
          </div>

          <div className="text-primary p-6 rounded-xl shadow-md flex flex-col items-center relative">
            {/* Background Icon */}
            <div className="absolute left-0 top-10 m-2 bottom-0 p-8 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: "url('/assets/football-court.png')", backgroundPosition: "left center", backgroundSize: "50px 50px" }}></div>
            {/* Content */}
            <h3 className="text-2xl font-bold mb-2">Matches Played</h3>
            <p className="text-3xl font-bold text-yellow-500">{player.stats.matchesPlayed}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic mt-2 text-center w-full">
          **Stats include performances from both tournament and friendly matches**
        </p>



        {/* Player Achievements */}
        {player.achievements?.length > 0 && (
          <div className="w-full mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">Achievements</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {player.achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black p-4 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <img src="/assets/award-symbol.png" alt="Trophy" className="w-12 h-12 mb-3" />
                  <h4 className="font-bold text-lg text-primary">{achievement.title}</h4>
                  <p className="text-sm mt-1">{achievement.tournament}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;
