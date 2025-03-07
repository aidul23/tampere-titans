import { useState } from "react";
import { useParams } from "react-router-dom";
import MatchCard from "../components/MatchCard"

const tournamentData = {
    "2024": {
        name: "Tampere Football Mania",
        date: "July 15-20, 2024",
        location: "Tampere Stadium",
        description: "A summer football tournament with top teams competing!",
        teams: ["Sylhet Stallions", "Khulna Knights", "Rajshahi Renegades", "Chattogram Cobras", "Barishal Blasters", "Dhaka Dragons"],
        image: "https://static.vecteezy.com/ti/photos-gratuite/p1/29360891-une-petit-vert-lezard-seance-sur-haut-de-une-arbre-bifurquer-generatif-ai-gratuit-photo.jpg",
        pointsTable: [
            { position: 1, team: "Sylhet Stallions", played: 5, won: 4, draw: 1, lost: 0, points: 13 },
            { position: 2, team: "Khulna Knights", played: 5, won: 3, draw: 1, lost: 1, points: 10 },
            { position: 3, team: "Rajshahi Renegades", played: 5, won: 2, draw: 2, lost: 1, points: 8 },
            { position: 4, team: "Chattogram Cobras", played: 5, won: 2, draw: 1, lost: 2, points: 7 },
            { position: 5, team: "Barishal Blasters", played: 5, won: 1, draw: 1, lost: 3, points: 4 },
            { position: 6, team: "Dhaka Dragons", played: 5, won: 0, draw: 2, lost: 3, points: 2 },
        ],
        fixtures: [
            { date: "July 15", time: "16:00", venue: "Tampere Stadium", team1: "Sylhet Stallions", team2: "Khulna Knights" },
            { date: "July 16", time: "18:00", venue: "Tampere Stadium", team1: "Rajshahi Renegades", team2: "Chattogram Cobras" },
            { date: "July 17", time: "20:00", venue: "Tampere Stadium", team1: "Barishal Blasters", team2: "Dhaka Dragons" },
        ],
        playerStats: [
            { name: "John Doe", team: "Sylhet Stallions", goals: 5, assists: 3, matches: 4 },
            { name: "Jane Smith", team: "Khulna Knights", goals: 3, assists: 4, matches: 5 },
            { name: "Ali Khan", team: "Rajshahi Renegades", goals: 4, assists: 2, matches: 3 },
        ],
        matches: [
            {
                date: "August 31, 2024",
                time: "09:30",
                team1: { name: "Sylhet Stallions", flag: "/assets/flags/nepal.png", score: 4, scorer: ["John Doe", "John Doe", "John Doe", "John Doe"] },
                team2: { name: "Khulna Knights", flag: "/assets/flags/india.png", score: 1, scorer: ["John Doe",] },
                status: "Finished",
                venue: "Kaukajärven Kenttä",
                stats: {
                    yellowCards: [1, 1],
                    redCards: [0, 0],
                },
                manOfTheMatch: "John Doe",
            },
        ],
    },
    "2023": {
        name: "Tampere Football Mania",
        date: "July 10-15, 2023",
        location: "Tampere Arena",
        description: "The previous season of the thrilling football tournament.",
        teams: ["Lions FC", "Eagles United", "Thunderbolts", "Warriors", "Titans", "Strikers"],
        image: "https://static.vecteezy.com/ti/photos-gratuite/p1/29360891-une-petit-vert-lezard-seance-sur-haut-de-une-arbre-bifurquer-generatif-ai-gratuit-photo.jpg",
        pointsTable: [
            { position: 1, team: "Lions FC", played: 5, won: 4, draw: 1, lost: 0, points: 13 },
            { position: 2, team: "Eagles United", played: 5, won: 3, draw: 1, lost: 1, points: 10 },
            { position: 3, team: "Thunderbolts", played: 5, won: 2, draw: 2, lost: 1, points: 8 },
            { position: 4, team: "Warriors", played: 5, won: 2, draw: 1, lost: 2, points: 7 },
            { position: 5, team: "Titans", played: 5, won: 1, draw: 1, lost: 3, points: 4 },
            { position: 6, team: "Strikers", played: 5, won: 0, draw: 2, lost: 3, points: 2 },
        ],
        fixtures: [
            { date: "July 10", time: "16:00", venue: "Tampere Arena", team1: "Lions FC", team2: "Eagles United" },
            { date: "July 11", time: "18:00", venue: "Tampere Arena", team1: "Thunderbolts", team2: "Warriors" },
            { date: "July 12", time: "20:00", venue: "Tampere Arena", team1: "Titans", team2: "Strikers" },
        ],
    },
};

const TournamentDetails = () => {
    const { id } = useParams();
    const [selectedSeason, setSelectedSeason] = useState("2024");
    const [activeTab, setActiveTab] = useState("details");

    const tournament = tournamentData[selectedSeason];

    if (!tournament) {
        return <div className="text-center text-xl text-red-500">Tournament Not Found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-10">
            {/* Tournament Image */}
            <img src={tournament.image} alt={tournament.name} className="w-full h-64 object-cover rounded-lg shadow-lg mt-4" />
            {/* Tournament Name & Season Dropdown */}
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-4xl font-bold text-secondary">{tournament.name}</h1>
                {/* Season Dropdown */}
                <select
                    className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 cursor-pointer"
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                >
                    {Object.keys(tournamentData).map((season) => (
                        <option key={season} value={season}>
                            {season}
                        </option>
                    ))}
                </select>
            </div>
            {/* Tournament Details */}
            <div className="mt-4">
                <p className="text-gray-600 text-lg">📅 {tournament.date}</p>
                <p className="text-gray-600 text-lg">📍 {tournament.location}</p>
            </div>

            {/* Tabs Section */}
            <div className="flex border-b mt-6">
                {["details", "fixtures", "table", "matches", "stats"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-2 text-lg font-semibold ${activeTab === tab ? "text-primary border-b-4 border-primary" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "details" ? "Details" : tab === "fixtures" ? "Fixture" : tab === "table" ? "Point Tables" : tab === "matches" ? "Matches" : "Player Stats"}
                    </button>
                ))}
            </div>

            {/* Content Based on Selected Tab */}
            <div className="mt-6">
                {activeTab === "details" && (
                    <div>
                        {/* Teams Section (Always Visible) */}
                        < h2 className="text-2xl font-semibold mt-6">Details</h2>
                        <div className="flex flex-wrap gap-6 justify-center mt-6 shadow-lg rounded-lg hover:shadow-xl">

                        </div>
                        < h2 className="text-2xl font-semibold mt-6">Rules Book</h2>
                        <div className="flex flex-wrap gap-6 justify-center mt-6 shadow-lg rounded-lg hover:shadow-xl">

                        </div>
                        < h2 className="text-2xl font-semibold mt-6">Participating Teams</h2>
                        <div className="flex flex-wrap gap-6 justify-center mt-6 shadow-lg rounded-lg hover:shadow-xl">
                            {tournament.teams.map((team, index) => (
                                <div key={index} className="flex flex-col items-center bg-white p-4 cursor-pointer">
                                    <img
                                        src={`/assets/teams/${team.toLowerCase().replace(/\s+/g, "-")}.png`}
                                        alt={team}
                                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                                    />
                                    <p className="mt-2 text-lg font-semibold text-black">{team}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === "fixtures" && (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-4">
                        <table className="min-w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Time</th>
                                    <th className="px-4 py-2">Venue</th>
                                    <th className="px-4 py-2">Match</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournament.fixtures.map((match, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2 font-semibold">{match.date}</td>
                                        <td className="px-4 py-2">{match.time}</td>
                                        <td className="px-4 py-2">{match.venue}</td>
                                        <td className="px-4 py-2 font-bold">
                                            {match.team1} <span className="text-red-600">vs</span> {match.team2}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "table" && (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-4">
                        <table className="min-w-full text-center border-collapse">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Team</th>
                                    <th className="px-4 py-2">P</th>
                                    <th className="px-4 py-2">W</th>
                                    <th className="px-4 py-2">D</th>
                                    <th className="px-4 py-2">L</th>
                                    <th className="px-4 py-2">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournament.pointsTable.map((team, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2 font-semibold">{team.position}</td>
                                        <td className="px-4 py-2">{team.team}</td>
                                        <td className="px-4 py-2">{team.played}</td>
                                        <td className="px-4 py-2">{team.won}</td>
                                        <td className="px-4 py-2">{team.draw}</td>
                                        <td className="px-4 py-2">{team.lost}</td>
                                        <td className="px-4 py-2 font-bold">{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "matches" && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Match Results</h2>
                        {tournament.matches.map((match, index) => (
                            <MatchCard key={index} match={match} />
                        ))}
                    </div>
                )}
                {activeTab === "stats" && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Player Statistics</h2>
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="py-2 px-4">Player</th>
                                    <th className="py-2 px-4">Team</th>
                                    <th className="py-2 px-4">Goals</th>
                                    <th className="py-2 px-4">Assists</th>
                                    <th className="py-2 px-4">Matches</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournament.playerStats.map((player, index) => (
                                    <tr key={index} className="text-center border-b">
                                        <td className="py-2 px-4">{player.name}</td>
                                        <td className="py-2 px-4">{player.team}</td>
                                        <td className="py-2 px-4">{player.goals}</td>
                                        <td className="py-2 px-4">{player.assists}</td>
                                        <td className="py-2 px-4">{player.matches}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div >
    );
};

export default TournamentDetails;
