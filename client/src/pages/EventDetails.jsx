import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [event, setEvent] = useState(location.state?.event || null);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Only fetch event if not passed via state
        if (!event) {
            axios.get(`http://localhost:8000/api/v1/event/${id}`)
                .then(res => setEvent(res.data.data))
                .catch(err => console.error("Event fetch error", err));
        }

        // Fetch teams always
        axios.get(`http://localhost:8000/api/v1/event/${id}/teams`)
            .then(res => setTeams(res.data.data))
            .catch(err => console.error("Team fetch error", err));
    }, [id, event]);

    if (!event) return <div>Loading event...</div>;

    return (
        <div className="p-8 mt-16">
            <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
            <img src={event.image} alt={event.title} className="w-full max-w-xl mb-4 rounded-lg shadow" />
            <p className="mb-2">{event.description}</p>
            <p className="text-gray-600">📍 {event.location}</p>
            <p className="text-gray-600">📅 {new Date(event.date).toDateString()}</p>
            <hr className="my-6" />

            <h3 className="text-2xl font-semibold mb-2">Registered Teams ({teams.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {teams.map(team => (
                    <div key={team._id} className="p-4 rounded-xl shadow bg-white border">
                        <img src={team.logo} alt={team.teamName} className="h-24 w-24 object-cover rounded-full mb-2" />
                        <h4 className="text-xl font-semibold">{team.teamName}</h4>
                        <p>City: {team.city}</p>
                        <p>Manager Email: {team.managerEmail}</p>
                        <p>Manager Phone: {team.managerPhone}</p>
                        <p>Payment: {team.hasPaid ? '✅ Done' : '❌ No'}</p>
                        <p>Approved: {team.isApproved ? '✅ Yes' : '❌ No'}</p>
                        <p>Registered At: {new Date(team.registeredAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetails;
