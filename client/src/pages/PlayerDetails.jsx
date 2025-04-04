import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerDetails = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/players/${id}`);
                const data = await response.json();
                setPlayer(data.player); // Assuming API response contains a "player" object
            } catch (error) {
                console.error("Error fetching player details:", error);
            }
        };

        fetchPlayer();
    }, [id]);

    if (!player) return <p className="text-center text-white">Loading...</p>;

    // Static statistics for the player (for now)
    const stats = {
        goals: 12,
        assists: 5,
        matchesPlayed: 22,
        yellowCards: 3,
        redCards: 1,
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
                                    src="/src/assets/captain-band.png"
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
                                    src="/src/assets/football-boots.png"
                                    alt="Position"
                                    className="w-5 h-5 object-cover"
                                />
                                <span className="text-lg font-semibold">{player.position}</span>
                            </div>
                            <div className="text-primary flex items-center space-x-2">
                                <img
                                    src="/src/assets/jersey.png"
                                    alt="Jersey"
                                    className="w-5 h-5 object-cover"
                                />
                                <span className="text-lg font-semibold">#{player.jerseyNum}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Player Stats Section */}
                <div className="w-full grid grid-cols-3 gap-6 mt-8">
                    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-2">Goals</h3>
                        <p className="text-3xl font-bold text-yellow-500">{stats.goals}</p>
                    </div>
                    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-2">Assists</h3>
                        <p className="text-3xl font-bold text-yellow-500">{stats.assists}</p>
                    </div>
                    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-2">Matches Played</h3>
                        <p className="text-3xl font-bold text-yellow-500">{stats.matchesPlayed}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerDetails;
