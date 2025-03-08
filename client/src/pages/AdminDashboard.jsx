import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [tournaments, setTournaments] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/tournaments").then((response) => {
//       setTournaments(response.data);
//     });
//   }, []);

  return (
    <div className="p-6 m-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <Link to="/create-tournament" className="bg-green-500 text-white px-4 py-2 rounded my-4 inline-block">
        ➕ Create Tournament
      </Link>

      {/* <div className="grid grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="border p-4 rounded-lg shadow">
            <h2 className="font-bold">{tournament.name}</h2>
            <p>{tournament.date} - {tournament.location}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AdminDashboard;
