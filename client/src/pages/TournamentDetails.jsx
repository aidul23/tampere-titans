import { useState } from "react";
import { useParams } from "react-router-dom";

const tournamentData = {
    1: {
        name: "Tampere Football Mania",
        date: "July 15-20, 2024",
        location: "Tampere Stadium",
        description: "A summer football tournament with top teams competing!",
        teams: ["Sylhet Stallions", "Khulna Knights", "Rajshahi Renegades", "Chattogram Cobras", "Barishal Blasters", "Dhaka Dragons"],
        image: "https://static.vecteezy.com/ti/photos-gratuite/p1/29360891-une-petit-vert-lezard-seance-sur-haut-de-une-arbre-bifurquer-generatif-ai-gratuit-photo.jpg",
    },
    2: {
        name: "Winter Titans League",
        date: "December 5-10, 2024",
        location: "Tampere Indoor Arena",
        description: "An exciting winter tournament played indoors.",
        teams: ["Team X", "Team Y", "Team Z"],
        image: "https://static.vecteezy.com/ti/photos-gratuite/p1/29360891-une-petit-vert-lezard-seance-sur-haut-de-une-arbre-bifurquer-generatif-ai-gratuit-photo.jpg",
    },
};

const TournamentDetails = () => {
    const { id } = useParams();
    const tournament = tournamentData[id];

    const [activeTab, setActiveTab] = useState("details");

    if (!tournament) {
        return <div className="text-center text-xl text-red-500">Tournament Not Found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-10">
            <img src={tournament.image} alt={tournament.name} className="w-full h-64 object-cover rounded-lg shadow-lg mt-4" />
            <h1 className="text-4xl font-bold text-secondary mt-4">{tournament.name}</h1>
            <div className="mt-4">
                <p className="text-gray-600 text-lg">📅 {tournament.date}</p>
                <p className="text-gray-600 text-lg">📍 {tournament.location}</p>
            </div>

            {/* Tabs Section */}
            <div className="flex border-b mt-6">
                {["details", "fixtures", "matches", "season", "stats"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-2 text-lg font-semibold ${activeTab === tab ? "text-primary border-b-4 border-primary" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "details" ? "Details" : tab === "fixtures" ? "Fixture Tables" : tab === "matches" ? "Matches" : tab === "season" ? "Season" : "Player Stats"}
                    </button>
                ))}
            </div>

            {/* Content Based on Selected Tab */}
            <div className="mt-6">
                {activeTab === "details" && (
                    <p className="text-lg text-gray-800">{tournament.description}</p>
                )}

                {activeTab === "fixtures" && (
                    <p className="text-lg text-gray-800">📅 Fixture tables will be added soon...</p>
                )}

                {activeTab === "matches" && (
                    <p className="text-lg text-gray-800">📅 Matches will be added soon...</p>
                )}

                {activeTab === "season" && (
                    <p className="text-lg text-gray-800">📆 Season details will be available here.</p>
                )}

                {activeTab === "stats" && (
                    <p className="text-lg text-gray-800">📊 Player stats and performance analysis coming soon!</p>
                )}
            </div>

            {/* Teams Section (Always Visible) */}
            <h2 className="text-2xl font-semibold mt-6">Participating Teams</h2>
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
    );
};

export default TournamentDetails;
