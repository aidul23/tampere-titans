const MatchCard = ({ match }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            {/* Date & Venue */}
            <div className="flex justify-between text-gray-600 text-sm mb-4">
                <span>📅 {match.date}</span>
                <span>📍 {match.venue}</span>
            </div>

            {/* Teams vs Teams */}
            <div className="flex justify-between">
                {/* Team 1 */}
                <div className="flex flex-col items-end">
                    <div className="flex items-center">
                        <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/475975621_475717385592111_8601467123491728576_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EbDu59wtmikQ7kNvgEaPQS1&_nc_oc=AdnvuGuCUgRjP8QDgFcfDYMa6MwVUuXUd-nmyfcud2CUrnpZQM-UC4kgTH9w18pb8sA&_nc_zt=23&_nc_ht=scontent-hel3-1.xx&_nc_gid=Q5yeMYahOdtdYMhlh088yA&oh=00_AYHM8oYOS67L_a1hYTXaYbGRmqqplpHbYKC-EcyCQp2xPg&oe=67E26DC5" alt={match.team1.name} className="w-8 h-8 mr-2 rounded-full" />
                        <span className="text-lg font-bold">{match.team1.name}</span>
                    </div>
                    {/* Goal Scorers */}
                    <ul className="text-sm text-gray-600 mt-1">
                        {match.team1.scorer.map((player, index) => (
                            <li key={index}>⚽ {player}</li>
                        ))}
                    </ul>
                </div>

                {/* Score */}
                <span className="text-2xl font-bold">{match.team1.score} - {match.team2.score}</span>

                {/* Team 2 */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <span className="text-lg font-bold">{match.team2.name}</span>
                        <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/475843082_475717125592137_4438689105334184381_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=J566UYs7IIAQ7kNvgGwZ8ka&_nc_oc=Adk_-_JvArBT_o5UKZ3rou1MQBhm4OUMhrbIuvuMcanKWDIY1vGzRhoSgN601a6Mh5k&_nc_zt=23&_nc_ht=scontent-hel3-1.xx&_nc_gid=qXm_TJKpZFCTbjS30P7KsQ&oh=00_AYGK0MNAMoIZX5CwZySnqcQGXYEfZxqIPBicY0TsD0QheA&oe=67E291DF" alt={match.team2.name} className="w-8 h-8 ml-2 rounded-full" />
                    </div>
                    {/* Goal Scorers */}
                    <ul className="text-sm text-gray-600 mt-1">
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
                        <span className="ml-4 mr-4 text-yellow-500">🟡 Yellow Cards</span>
                        <span className="text-lg">{match.stats.yellowCards[1]}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">{match.stats.redCards[0]}</span>
                        <span className="ml-4 mr-4 text-red-500">🔴 Red Cards</span>
                        <span className="text-lg">{match.stats.redCards[1]}</span>
                    </div>
                </div>
            </div>

            {/* Man of the Match */}
            <div className="mt-4 text-center font-semibold text-gray-700">
                🏆 Man of the Match: <span className="text-black">{match.manOfTheMatch}</span>
            </div>
        </div>
    );
};

export default MatchCard;
