import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit, FaSignOutAlt } from "react-icons/fa";
import api from "../helpers/api";

function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editPlayer, setEditPlayer] = useState(null);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [registeredTrems, setRegisteredTrems] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [editActivity, setEditActivity] = useState(null);
  const [editAchievement, setEditAchievement] = useState(null);
  const [newAchievement, setNewAchievement] = useState({ title: "", tournament: "", date: "" });


  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
    fetchActivities();
    fetchAchievements();
    fetchEvents();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (err) {
      setError("Failed to fetch players");
    }
    setLoading(false);
  };

  const fetchAchievements = async () => {
    try {
      const response = await api.get("/achievement/achievements");
      setAchievements(response.data);
    } catch (err) {
      setError("Failed to fetch achievements");
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await api.get("/activity/activities");
      setActivities(response.data);
    } catch (err) {
      setError("Failed to fetch activities");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get(`/event/events`);
      setEvents(response.data);
    } catch (err) {
      setError("Failed to fetch activities");
    }
  };

  // Delete activity
  const deleteActivity = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await api.delete(`/activity/activities/${activityId}`);
      fetchActivities();
    } catch (err) {
      setError("Failed to delete activity");
    }
  };

  // Delete achievement
  const deleteAchievement = async (achievementId) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await api.delete(`/achievement/achievements/${achievementId}`);
      fetchAchievements();
    } catch (err) {
      setError("Failed to delete achievement");
    }
  };

  const approvePlayer = async (playerId) => {
    try {
      await api.put(`/players/${playerId}/approve`);
      fetchPlayers();
    } catch (err) {
      setError("Failed to approve player");
    }
  };

  const deletePlayer = async (playerId) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await api.delete(`/players/${playerId}`);
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
      await api.put(`/players/${editPlayer._id}`, editPlayer);
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
      await api.put(`/players/${editPlayer._id}`, updatedPlayer);
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
      await api.put(`/activity/activities/${editActivity._id}`, editActivity);
      setEditActivity(null);
      fetchActivities();
    } catch (err) {
      setError("Failed to update activity");
    }
  };

  // Edit achievement
  const openEditAchievementModal = (achievement) => {
    setEditAchievement({ ...achievement });
  };

  const handleAchievementChange = (e) => {
    setEditAchievement({ ...editAchievement, [e.target.name]: e.target.value });
  };

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/achievement/achievements/${editAchievement._id}`, editAchievement);
      setEditAchievement(null);
      fetchAchievements();
    } catch (err) {
      setError("Failed to update achievement");
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
        <Link to="/achievement" className="bg-green-500 text-white px-4 py-2 rounded ml-2">➕ Post Achievement</Link>
        <Link to="/event" className="bg-green-500 text-white px-4 py-2 rounded ml-2">➕ Post Event</Link>
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Player</h3>

            {/* Basic Info */}
            <input type="text" name="name" value={editPlayer.name} onChange={handleEditChange} className="border p-2 w-full mb-3" placeholder="Name" />
            <input type="number" name="jerseyNum" value={editPlayer.jerseyNum} onChange={handleEditChange} className="border p-2 w-full mb-3" placeholder="Jersey Number" />
            <input type="text" name="position" value={editPlayer.position} onChange={handleEditChange} className="border p-2 w-full mb-3" placeholder="Position" />
            <input type="email" name="email" value={editPlayer.email} onChange={handleEditChange} className="border p-2 w-full mb-3" placeholder="Email" />
            <input type="text" name="phone" value={editPlayer.phone} onChange={handleEditChange} className="border p-2 w-full mb-4" placeholder="Phone" />

            {/* Stats Counter Section */}
            <div className="mb-4 space-y-3">
              {["goals", "assists", "matchesPlayed"].map((statKey) => (
                <div key={statKey} className="flex items-center justify-between">
                  <label className="capitalize font-semibold">{statKey.replace(/([A-Z])/g, " $1")}</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditPlayer(prev => ({
                        ...prev,
                        stats: {
                          ...prev.stats,
                          [statKey]: Math.max(0, prev.stats?.[statKey] - 1 || 0)
                        }
                      }))}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >-</button>
                    <span className="min-w-[20px] text-center">{editPlayer.stats?.[statKey] || 0}</span>
                    <button
                      type="button"
                      onClick={() => setEditPlayer(prev => ({
                        ...prev,
                        stats: {
                          ...prev.stats,
                          [statKey]: (prev.stats?.[statKey] || 0) + 1
                        }
                      }))}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements Section */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Achievements</h4>

              {/* Existing Achievements List */}
              {editPlayer.achievements?.length > 0 ? (
                editPlayer.achievements.map((ach, index) => (
                  <div key={index} className="flex items-center justify-between text-sm mb-1">
                    <span>{ach.title} {ach.tournament && ` - ${ach.tournament}`} {ach.date && `(${ach.date})`}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditPlayer(prev => ({
                          ...prev,
                          achievements: prev.achievements.filter((_, i) => i !== index)
                        }))
                      }
                      className="text-red-500 hover:text-red-700 text-xs ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No achievements yet.</p>
              )}

              {/* Input Fields for New Achievement */}
              <div className="grid grid-cols-1 gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="border p-2 text-sm rounded"
                />
                <input
                  type="text"
                  placeholder="Tournament"
                  value={newAchievement.tournament}
                  onChange={(e) => setNewAchievement({ ...newAchievement, tournament: e.target.value })}
                  className="border p-2 text-sm rounded"
                />
                <input
                  type="text"
                  placeholder="Date (optional)"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                  className="border p-2 text-sm rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newAchievement.title) return;
                    setEditPlayer(prev => ({
                      ...prev,
                      achievements: [...(prev.achievements || []), newAchievement]
                    }));
                    setNewAchievement({ title: "", tournament: "", date: "" });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                >
                  + Add Achievement
                </button>
              </div>
            </div>


            {/* Captain Button */}
            <button
              type="button"
              onClick={toggleCaptain}
              className={`px-4 py-2 rounded text-white ${editPlayer.isCaptain ? "bg-red-500" : "bg-blue-500"} mb-3`}
            >
              {editPlayer.isCaptain ? "Remove Captain" : "Make Captain"}
            </button>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              <button type="button" onClick={() => setEditPlayer(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}


      {/* Activity Management */}
      <h2 className="text-2xl font-bold mb-4 mt-6">Activity List</h2>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <div key={activity._id} className="border p-4 rounded-lg shadow bg-white">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg">{activity.title}</h3>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openEditActivityModal(activity)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteActivity(activity._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Achievement Management */}
      <h2 className="text-2xl font-bold mb-4 mt-6">Achievement List</h2>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement._id}
            className="border p-4 rounded-lg shadow bg-white"
          >
            <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-700">{achievement.description}</p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openEditAchievementModal(achievement)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteAchievement(achievement._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-6">Event List</h2>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`, { state: { event } })}
              className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toDateString()}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
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

      {/* Edit Achievement Modal */}
      {editAchievement && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-lg font-bold">Edit Achievement</h3>
            <form onSubmit={handleAchievementSubmit}>
              <input
                type="text"
                name="title"
                value={editAchievement.title}
                onChange={handleAchievementChange}
                className="border p-2 w-full my-2"
                placeholder="Title"
              />
              <textarea
                name="description"
                value={editAchievement.description}
                onChange={handleAchievementChange}
                className="border p-2 w-full my-2"
                placeholder="Description"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditAchievement(null)} className="bg-gray-400 text-white px-4 py-2 rounded ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
