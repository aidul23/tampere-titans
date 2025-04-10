const MatchCard = ({ match }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            {/* Date & Venue */}
            <div className="flex justify-between text-gray-600 text-sm mb-4">
                <span>📅 {match.date}</span>
                <span>📍 {match.venue}</span>
            </div>

            {/* Teams vs Teams */}
            <div className="grid grid-cols-3 items-start gap-4">
    {/* Team 1 */}
    <div className="flex flex-col items-end">
        {/* Team name & flag fixed block */}
        <div className="flex items-center min-h-[40px]">
            <img src={match.team1.flag} alt={match.team1.name} className="w-8 h-8 mr-2 rounded-full" />
            <span className="text-lg font-bold">{match.team1.name}</span>
        </div>
        {/* Scorers */}
        <ul className="text-sm text-gray-600 mt-1 text-right">
            {match.team1.scorer.map((player, index) => (
                <li key={index}>⚽ {player}</li>
            ))}
        </ul>
    </div>

    {/* Score */}
    <div className="text-center flex flex-col justify-center min-h-[40px]">
        <span className="text-2xl font-bold">{match.team1.score} - {match.team2.score}</span>
    </div>

    {/* Team 2 */}
    <div className="flex flex-col items-start">
        {/* Team name & flag fixed block */}
        <div className="flex items-center min-h-[40px]">
            <span className="text-lg font-bold">{match.team2.name}</span>
            <img src={match.team2.flag} alt={match.team2.name} className="w-8 h-8 ml-2 rounded-full" />
        </div>
        {/* Scorers */}
        <ul className="text-sm text-gray-600 mt-1 text-left">
            {match.team2.scorer.map((player, index) => (
                <li key={index}>⚽ {player}</li>
            ))}
        </ul>
    </div>
</div>



            {/* Match Time & Status */}
            <div className="text-center mt-2 text-orange-500 font-bold text-lg">{match.time}</div>
            <div className="text-right mt-2">
                <span className={`px-3 py-1 text-white text-sm font-semibold rounded-lg ${match.status === "Finished" ? "bg-green-500" : "bg-yellow-500"}`}>
                    {match.status.toUpperCase()}
                </span>
            </div>

            {/* Match Stats */}
            <div className="mt-4 border-t pt-4">
                <div className="grid grid-cols gap-4 text-sm text-gray-700 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">{match.stats.yellowCards[0]}</span>
                        <span className="ml-4 mr-4 text-yellow-500">Yellow Cards</span>
                        <span className="text-lg">{match.stats.yellowCards[1]}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">{match.stats.redCards[0]}</span>
                        <span className="ml-4 mr-4 text-red-500">Red Cards</span>
                        <span className="text-lg">{match.stats.redCards[1]}</span>
                    </div>
                </div>
            </div>

            {/* Man of the Match */}
            <div className="mt-4 text-center font-semibold text-secondary">
                🏆 MOTM: <span className="text-gray-700">{match.manOfTheMatch}</span>
            </div>
        </div>
    );
};

export default MatchCard;
