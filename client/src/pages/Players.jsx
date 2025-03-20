import React, { useState, useEffect } from "react";

// Dummy Player Data (Replace with actual players)
// const players = [
//   { name: "John Doe", position: "Goalkeeper", joiningDate: "2018", number: "1", image: "src/assets/player.png" },
//   { name: "John Doe", position: "Goalkeeper", joiningDate: "2018", number: "2", image: "src/assets/player.png" },
//   { name: "Alex Smith", position: "Defender", joiningDate: "2018", number: "5", image: "src/assets/player.png" },
//   { name: "Alex Smith", position: "Defender", joiningDate: "2018", number: "3", image: "src/assets/player.png" },
//   { name: "Alex Smith", position: "Defender", joiningDate: "2018", number: "4", image: "src/assets/player.png" },
//   { name: "Ryan Wilson", position: "Defender", joiningDate: "2018", number: "10", image: "src/assets/player.png" },
//   { name: "David Brown", position: "Midfielder", joiningDate: "2018", number: "10", image: "src/assets/player.png" },
//   { name: "Chris Johnson", position: "Midfielder", joiningDate: "2018", number: "11", image: "src/assets/player.png" },
//   { name: "Michael Lee", position: "Forward", joiningDate: "2018", number: "9", image: "src/assets/player.png" },
//   { name: "James Anderson", position: "Forward", joiningDate: "2018", number: "7", image: "src/assets/player.png" },
// ];

// Function to filter players by position


const Players = () => {
  const [players, setPlayers] = useState([]);

  // Fetch approved players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/players/approved");
        const data = await response.json();
        setPlayers(data.players); // Assuming API response contains a "players" array
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const filterPlayersByPosition = (position) => {
    return (players || []).filter((player) => player.position === position);
  };

  return (
    <div className="min-h-screen bg-primary text-white pt-24 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-secondary">Our Titans Squad</h1>

      <div className="container mx-auto grid gap-12">
        {/* Goalkeepers Section */}
        <div>
          <h2 className="text-3xl text-accent mb-6 text-center">Goalkeepers</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {filterPlayersByPosition("Goalkeeper").map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        </div>

        {/* Defenders Section */}
        <div>
          <h2 className="text-3xl text-accent mb-6 text-center">Defenders</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {filterPlayersByPosition("Defender").map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        </div>

        {/* Midfielders Section */}
        <div>
          <h2 className="text-3xl text-accent mb-6 text-center">Midfielders</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {filterPlayersByPosition("Midfielder").map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        </div>

        {/* Forwards Section */}
        <div>
          <h2 className="text-3xl text-accent mb-6 text-center">Forwards</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {filterPlayersByPosition("Forward").map((player, index) => (
              <PlayerCard key={index} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ player }) => {
  const joiningYear = player.createdAt ? new Date(player.createdAt).getFullYear() : "Unknown";
  return (
    <div className="relative w-56 h-72 bg-white text-black rounded-xl shadow-lg overflow-hidden 
      transform hover:scale-105 transition duration-300 group">

      {/* Player Image */}
      <img src={player.image} alt={player.name} className="w-full h-full object-cover" />

      {/* Overlay for Hover Effect */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 
        bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 group-hover:pb-8">

        {/* Player Info (Name & Jersey Number Always Visible) */}
        <div className="space-y-1 relative top-4 transition-all duration-300 transform group-hover:-translate-y-2">
          <h2 className="text-5xl font-bold text-white">{player.jerseyNum}</h2>
          <h3 className="text-lg font-bold text-white">{player.name}</h3>
        </div>

        <div className="group-hover:block hidden mt-2 border-t border-gray-500"></div>

        {/* Extra Info - Appears When Hovering Over the Entire Card */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 pt-2 text-right">
          <p className="text-base text-gray-300">Joined {joiningYear}</p>
          <p className="text-base text-accent font-semibold">{player.position}</p>
        </div>
      </div>
    </div>
  );
};


export default Players;
