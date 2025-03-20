import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editPlayer, setEditPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/players");
      setPlayers(response.data);
    } catch (err) {
      setError("Failed to fetch players");
    }
    setLoading(false);
  };

  const approvePlayer = async (playerId) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/players/${playerId}/approve`);
      fetchPlayers();
    } catch (err) {
      setError("Failed to approve player");
    }
  };

  const deletePlayer = async (playerId) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/players/${playerId}`);
      fetchPlayers();
    } catch (err) {
      setError("Failed to delete player");
    }
  };

  const openEditModal = (player) => {
    setEditPlayer({ ...player });
  };

  const handleEditChange = (e) => {
    setEditPlayer({ ...editPlayer, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/players/${editPlayer._id}`, editPlayer);
      setEditPlayer(null);
      fetchPlayers();
    } catch (err) {
      setError("Failed to update player");
    }
  };

  const filteredPlayers = players.filter((player) => {
    if (activeTab === "requested") return !player.isApproved;
    if (activeTab === "approved") return player.isApproved;
    return true;
  });

  return (
    <div className="p-8 mt-16">
      <h2 className="text-4xl font-bold text-center mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <Link to="/create-tournament" className="bg-green-500 text-white px-4 py-2 rounded">➕ Create Tournament</Link>
        <Link to="/post" className="bg-green-500 text-white px-4 py-2 rounded ml-2">➕ Post Acitivity</Link>
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-6">Player Lists</h2>
      <div className="flex space-x-4 my-4">
        <button className={`p-2 rounded ${activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("all")}>All Players</button>
        <button className={`p-2 rounded ${activeTab === "requested" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("requested")}>Requested</button>
        <button className={`p-2 rounded ${activeTab === "approved" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("approved")}>Approved</button>
      </div>
      {loading ? <p>Loading players...</p> : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Image</th>
              <th>Name</th>
              <th>Number</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player._id} className="border">
                <td className="border p-2 text-center"><img src={player.image} alt={player.name} className="w-12 h-12 rounded-full m-2" /></td>
                <td className="border p-2 text-center">{player.name}</td>
                <td className="border p-2 text-center">{player.jerseyNum}</td>
                <td className="border p-2 text-center">{player.position}</td>
                <td className="border p-2 text-center">{player.phone}</td>
                <td className="border p-2 text-center">{player.isApproved ? <span className="text-green-600">Approved</span> : <span className="text-red-600">Pending</span>}</td>
                <td className="border p-2 text-center">
                  {!player.isApproved && (
                    <button onClick={() => approvePlayer(player._id)} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                  )}
                  <button onClick={() => openEditModal(player)} className="bg-yellow-500 text-white px-2 py-1 rounded mx-2"><FaEdit /></button>
                  <button onClick={() => deletePlayer(player._id)} className="bg-red-500 text-white px-2 py-1 rounded"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editPlayer && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleEditSubmit} className="bg-white p-4 rounded">
            <h3 className="text-lg font-bold">Edit Player</h3>
            <input type="text" name="name" value={editPlayer.name} onChange={handleEditChange} className="border p-2 w-full my-2" />
            <input type="number" name="jerseyNum" value={editPlayer.jerseyNum} onChange={handleEditChange} className="border p-2 w-full my-2" />
            <input type="text" name="position" value={editPlayer.position} onChange={handleEditChange} className="border p-2 w-full my-2" />
            <input type="text" name="email" value={editPlayer.email} onChange={handleEditChange} className="border p-2 w-full my-2" />
            <input type="text" name="phone" value={editPlayer.phone} onChange={handleEditChange} className="border p-2 w-full my-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setEditPlayer(null)} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
