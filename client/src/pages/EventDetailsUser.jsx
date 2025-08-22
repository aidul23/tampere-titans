import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import api from "../helpers/api";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import FinbanglaFixtureGallery from "./FinbanglaFixtureGallery";
import LiveScoreEmbed from "./LiveScoreEmbed";


const EventDetailsUser = () => {
    const { id } = useParams();
    const { location } = useLocation();

    const [activeTab, setActiveTab] = useState("details");

    const [event, setEvent] = useState(location?.state?.event || null);
    const [loading, setLoading] = useState(!event);
    const [error, setError] = useState(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        if (!event) {
            axios
            api.get(`/event/events/${id}`)
                .then((res) => {
                    setEvent(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load event data.");
                    setLoading(false);
                });
        }
    }, [id, event]);

    if (loading) return <p className="text-center mt-10">Loading event...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;


    if (!event) {
        return (
            <div className="text-center text-xl text-red-500 mt-10">
                Event not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 mt-12">
            {/* Event Banner */}
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
            />

            {/* Title and Date/Location */}
            <div className="mt-4">
                <h1 className="text-3xl font-bold text-secondary">{event.title}</h1>
                <p className="text-gray-600 text-lg mt-2">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 text-lg">🕒 {new Date(event.date).toLocaleTimeString()}</p>
                <p className="text-gray-600 text-lg">📍 {event.location}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b mt-6">
                {["details", "live", "rules", "fixtures", "point table", "matches"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-2 text-lg font-semibold capitalize ${activeTab === tab
                            ? "text-primary border-b-4 border-primary"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "details" && (
                    <div>
                        <h2 className="text-2xl font-semibold mt-4">Event Description</h2>
                        <p className="text-gray-700 text-lg mt-2">{event.description}</p>
                        <h2 className="text-2xl font-semibold mt-4">Participating Teams</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {event.registeredTeams?.filter(team => team.isApproved).length > 0 ? (
                                event.registeredTeams
                                    .filter(team => team.isApproved)
                                    .map((team, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center bg-white p-4 mt-4 rounded shadow"
                                        >
                                            <img
                                                src={team.logo}
                                                alt={team.teamName}
                                                className="w-16 h-16 object-cover rounded-full border-2"
                                            />
                                            <p className="mt-2 font-semibold">{team.teamName}</p>
                                        </div>
                                    ))
                            ) : (
                                <p>No approved teams listed.</p>
                            )}
                        </div>

                    </div>
                )}

                {activeTab === "live" && (
                    <div className="px-2 sm:px-0">
                        <h2 className="text-2xl font-semibold mb-4">Live Score</h2>
                        <LiveScoreEmbed
                            src="https://www.score7.io/embed/tournaments/finnbangla2025/stages/18846895?showName=true&theme=auto"
                            title="Finn-Bangla Football Tournament 2025"
                        />
                    </div>
                )}

                {activeTab === "fixtures" && (
                    <div className="px-2 sm:px-0">
                        <FinbanglaFixtureGallery />
                    </div>
                )}

                {activeTab === "point table" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Points</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {event.points?.map((point, index) => (
                                <div key={index} className="flex flex-col items-center bg-white p-4 rounded shadow">
                                    <img
                                        src={team.image}
                                        alt={team.name}
                                        className="w-16 h-16 object-cover rounded-full border-2"
                                    />
                                    <p className="mt-2 font-semibold">{team.name}</p>
                                </div>
                            )) || <p>No matches played yet.</p>}
                        </div>
                    </div>
                )}

                {activeTab === "matches" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Match Results</h2>
                        {/* Replace with real match data */}
                        {event.matches?.length > 0 ? (
                            event.matches.map((match, i) => (
                                <div key={i} className="bg-white p-4 rounded shadow mb-4">
                                    <p className="font-bold">{match.team1} vs {match.team2}</p>
                                    <p className="text-sm text-gray-600">{match.date} at {match.time}</p>
                                </div>
                            ))
                        ) : (
                            <p>No matches available yet.</p>
                        )}
                    </div>
                )}

                {activeTab === "rules" && (
                    event.rulesPdf ? (
                        <div className="h-[600px] mb-10">
                            <h2 className="text-2xl font-semibold mb-4">Rule Book</h2>
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                                <Viewer
                                    fileUrl="../../assets/Finn-Bangla Tournament-Rules.pdf"
                                    plugins={[defaultLayoutPluginInstance]}
                                />
                            </Worker>

                        </div>
                    ) : (
                        <p className="text-gray-500">No rules uploaded yet.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default EventDetailsUser;
