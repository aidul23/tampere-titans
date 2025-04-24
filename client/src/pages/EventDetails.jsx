import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from "../helpers/api";

const EventDetails = () => {
    const { id } = useParams();
    const location = useLocation();

    const [event, setEvent] = useState(location.state?.event || null);
    const [teams, setTeams] = useState([]);

    const [editEventMode, setEditEventMode] = useState(false);
    const [editEventForm, setEditEventForm] = useState({});
    const [newImage, setNewImage] = useState(null);

    const [editingTeamId, setEditingTeamId] = useState(null);
    const [teamEditForm, setTeamEditForm] = useState({});

    useEffect(() => {
        if (!event) {
            api.get(`/event/${id}`)
                .then(res => setEvent(res.data.data))
                .catch(err => console.error("Event fetch error", err));
        }

        fetchTeams();
    }, [id, event]);

    const fetchTeams = async () => {
        try {
            const res = await api.get(`/event/${id}/teams`);
            setTeams(res.data.data);
        } catch (err) {
            console.error("Team fetch error", err);
        }
    };

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEditEventForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEventUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', editEventForm.title);
            formData.append('description', editEventForm.description);
            formData.append('location', editEventForm.location);
            formData.append('date', editEventForm.date);
            if (newImage) formData.append('image', newImage);

            const res = await api.put(`/event/events/${id}`, formData);
            setEvent(res.data.data);
            setEditEventMode(false);
            setNewImage(null);
        } catch (err) {
            console.error("Failed to update event", err);
        }
    };

    const handleTeamInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTeamEditForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTeamUpdate = async (teamId) => {
        try {
            await api.put(`/event/${id}/teams/${teamId}`, teamEditForm);
            setEditingTeamId(null);
            fetchTeams(); // Refresh
        } catch (err) {
            console.error("Failed to update team", err);
        }
    };

    const handleTeamDelete = async (teamId) => {
        if (!window.confirm("Are you sure you want to delete this team?")) return;
        try {
            await api.delete(`/event/${id}/teams/${teamId}`);
            fetchTeams(); // Refresh the list
        } catch (err) {
            console.error("Failed to delete team", err);
        }
    };
    

    if (!event) return <div>Loading event...</div>;

    return (
        <div className="p-8 mt-16 max-w-6xl mx-auto">
            {/* Event Info */}
            {editEventMode ? (
                <div className="bg-white p-6 rounded-xl shadow mb-6 space-y-4">
                    <input type="text" name="title" value={editEventForm.title || ""} onChange={handleEventChange} placeholder="Title" className="w-full border p-2 rounded" />
                    <input type="date" name="date" value={editEventForm.date?.slice(0, 10) || ""} onChange={handleEventChange} className="w-full border p-2 rounded" />
                    <input type="text" name="location" value={editEventForm.location || ""} onChange={handleEventChange} placeholder="Location" className="w-full border p-2 rounded" />
                    <textarea name="description" value={editEventForm.description || ""} onChange={handleEventChange} placeholder="Description" className="w-full border p-2 rounded" />
                    <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files[0])} />
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleEventUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                        <button onClick={() => setEditEventMode(false)} className="text-gray-500">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                    <img src={event.image} alt={event.title} className="w-20 max-w-xl mb-4 rounded-lg shadow" />
                    <p className="mb-2">{event.description}</p>
                    <p className="text-gray-600">📍 {event.location}</p>
                    <p className="text-gray-600">📅 {new Date(event.date).toDateString()}</p>
                    <button
                        onClick={() => {
                            setEditEventMode(true);
                            setEditEventForm({
                                title: event.title,
                                description: event.description,
                                location: event.location,
                                date: event.date,
                            });
                        }}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        ✏️ Edit Event
                    </button>
                </div>
            )}

            {/* Registered Teams */}
            <h3 className="text-2xl font-semibold mb-2">Registered Teams ({teams.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {teams.map(team => (
                    <div key={team._id} className="p-4 rounded-xl shadow bg-white border">
                        <img src={team.logo} alt={team.teamName} className="h-24 w-24 object-cover rounded-full mb-2" />

                        {editingTeamId === team._id ? (
                            <div className="space-y-2 mt-2">
                                <input type="text" name="teamName" value={teamEditForm.teamName || ""} onChange={handleTeamInputChange} placeholder="Team Name" className="w-full border p-1 rounded" />
                                <input type="text" name="city" value={teamEditForm.city || ""} onChange={handleTeamInputChange} placeholder="Team City" className="w-full border p-1 rounded" />
                                <input type="text" name="managerEmail" value={teamEditForm.managerEmail || ""} onChange={handleTeamInputChange} placeholder="Manager Email" className="w-full border p-1 rounded" />
                                <input type="text" name="managerPhone" value={teamEditForm.managerPhone || ""} onChange={handleTeamInputChange} placeholder="Manager Phone" className="w-full border p-1 rounded" />
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="hasPaid" checked={teamEditForm.hasPaid || false} onChange={handleTeamInputChange} />
                                    <label>Has Paid</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="isApproved" checked={teamEditForm.isApproved || false} onChange={handleTeamInputChange} />
                                    <label>Approved</label>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => handleTeamUpdate(team._id)} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                                    <button onClick={() => setEditingTeamId(null)} className="text-gray-500">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h4 className="text-xl font-semibold">{team.teamName}</h4>
                                <p>City: {team.city}</p>
                                <p>Email: {team.managerEmail}</p>
                                <p>Phone: {team.managerPhone}</p>
                                <p>Payment Transaction ID or Code: {team.transactionId}</p>
                                <p>Payment: {team.hasPaid ? '✅ Done' : '❌ No'}</p>
                                <p>Approved: {team.isApproved ? '✅ Done' : '❌ No'}</p>
                                <p className="text-sm text-gray-500">Registered At: {new Date(team.registeredAt).toLocaleString()}</p>
                                <button
                                    onClick={() => {
                                        setEditingTeamId(team._id);
                                        setTeamEditForm({
                                            teamName: team.teamName,
                                            city: team.city,
                                            managerEmail: team.managerEmail,
                                            managerPhone: team.managerPhone,
                                            hasPaid: team.hasPaid,
                                            isApproved: team.isApproved
                                        });
                                    }}
                                    className="text-blue-600 mt-2 hover:underline"
                                >
                                    ✏️ Edit Team
                                </button>
                                <button
                                    onClick={() => handleTeamDelete(team._id)}
                                    className="text-red-600 mt-2 hover:underline ml-3"
                                >
                                    🗑️ Delete
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetails;
