import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editPlayer, setEditPlayer] = useState(null);
  const [activities, setActivities] = useState([]);
  const [editActivity, setEditActivity] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
    fetchActivities();
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

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/activity/activities");
      setActivities(response.data);
    } catch (err) {
      setError("Failed to fetch activities");
    }
  };

  // Delete activity
  const deleteActivity = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/activity/activities/${activityId}`);
      fetchActivities();
    } catch (err) {
      setError("Failed to delete activity");
    }
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

  // Toggle Captain Status
  const toggleCaptain = async () => {
    try {
      const updatedPlayer = { ...editPlayer, isCaptain: !editPlayer.isCaptain };
      await axios.put(`http://localhost:8000/api/v1/players/${editPlayer._id}`, updatedPlayer);
      setEditPlayer(updatedPlayer);
      fetchPlayers();
    } catch (err) {
      setError("Failed to update captain status");
    }
  };

  // Edit activity
  const openEditActivityModal = (activity) => {
    setEditActivity({ ...activity });
  };

  const handleActivityChange = (e) => {
    setEditActivity({ ...editActivity, [e.target.name]: e.target.value });
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/activity/activities/${editActivity._id}`, editActivity);
      setEditActivity(null);
      fetchActivities();
    } catch (err) {
      setError("Failed to update activity");
    }
  };

  const filteredPlayers = players.filter((player) => {
    if (activeTab === "requested") return !player.isApproved;
    if (activeTab === "approved") return player.isApproved;
    return true;
  });

  const handleLogout = () => {
    // Clear authentication from localStorage
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("loginTime");

    // Redirect to login page
    navigate("/admin");
  };

  return (
    <div className="p-8 mt-16">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-center mb-4">Admin Dashboard</h2>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <Link to="/create-tournament" className="bg-green-500 text-white px-4 py-2 rounded">➕ Create Tournament</Link>
        <Link to="/post" className="bg-green-500 text-white px-4 py-2 rounded ml-2">➕ Post Activity</Link>
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

            {/* Make Captain Button */}
            <button
              type="button"
              onClick={toggleCaptain}
              className={`px-4 py-2 rounded text-white ${editPlayer.isCaptain ? "bg-red-500" : "bg-blue-500"}`}
            >
              {editPlayer.isCaptain ? "Remove Captain" : "Make Captain"}
            </button>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save</button>
            <button onClick={() => setEditPlayer(null)} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </form>
        </div>
      )}

      {/* Activity Management */}
      <h2 className="text-2xl font-bold mb-4 mt-6">Activity List</h2>
      <div className="my-4">
        {activities.map((activity) => (
          <div key={activity._id} className="border p-4 mb-4 rounded-lg">
            <img src={activity.image} alt={activity.title} className="w-40 h-40 object-cover mb-2" />
            <h3 className="font-semibold">{activity.title}</h3>
            <p>{activity.description}</p>
            <div className="mt-2">
              <button onClick={() => openEditActivityModal(activity)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                <FaEdit />
              </button>
              <button onClick={() => deleteActivity(activity._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Activity Modal */}
      {editActivity && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-lg font-bold">Edit Activity</h3>
            <form onSubmit={handleActivitySubmit}>
              <input
                type="text"
                name="title"
                value={editActivity.title}
                onChange={handleActivityChange}
                className="border p-2 w-full my-2"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editActivity.description}
                onChange={handleActivityChange}
                className="border p-2 w-full my-2"
                placeholder="Description"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditActivity(null)} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
