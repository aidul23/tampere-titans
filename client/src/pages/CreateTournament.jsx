import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/api";

const CreateTournament = () => {
    const [formData, setFormData] = useState({
        year: "",
        name: "",
        date: "",
        location: "",
        description: "",
        numTeams: 0,
        teams: [],
        image: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleNumTeamsChange = (e) => {
        const numTeams = parseInt(e.target.value, 10);
        setFormData({
            ...formData,
            numTeams,
            teams: Array(numTeams).fill({ name: "", banner: "" }),
        });
    };

    const handleTeamChange = (index, field, value) => {
        const updatedTeams = [...formData.teams];
        updatedTeams[index][field] = value;
        setFormData({ ...formData, teams: updatedTeams });
    };

    const handleFileChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedTeams = [...formData.teams];
            updatedTeams[index].banner = file;
            setFormData({ ...formData, teams: updatedTeams });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    };

    return (
        <div className="max-w-lg mx-auto mt-24 mb-24 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center">Create Tournament</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input type="text" name="year" placeholder="Year" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="name" placeholder="Tournament Name" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="date" placeholder="Date (e.g., July 15-20, 2024)" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded"></textarea>

                <input type="number" name="numTeams" placeholder="How many teams?" onChange={handleNumTeamsChange} required className="w-full p-2 border rounded" />

                {formData.teams.map((team, index) => (
                    <div key={index} className="mt-4 p-2 border rounded flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder={`Team ${index + 1} Name`}
                            value={team.name}
                            onChange={(e) => handleTeamChange(index, "name", e.target.value)}
                            required
                            className="w-1/2 p-2 border rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
                            required
                            className="w-1/2 p-2 border rounded"
                        />
                        {team.banner && (
                            <img src={URL.createObjectURL(team.banner)} alt="Preview" className="w-12 h-12 object-cover rounded" />
                        )}
                    </div>
                ))}

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Create Tournament
                </button>
            </form>
        </div>
    );
};

export default CreateTournament;
