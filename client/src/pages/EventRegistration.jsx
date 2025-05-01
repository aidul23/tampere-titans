import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cities from "../../fi.json"
import { useLocation, useParams } from "react-router-dom";
import Countdown from 'react-countdown';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { VscCopy } from "react-icons/vsc";
import api from "../helpers/api";

const EventRegistration = () => {
    const { id } = useParams();
    const location = useLocation();
    const [event, setEvent] = useState();

    const [copiedField, setCopiedField] = useState(null);

    useEffect(() => {
        if (!event) {
            // Fetch the event from the backend if not passed in state
            const fetchEvent = async () => {
                try {
                    const response = await api.get(`/event/events/${id}`);
                    setEvent(response.data.data); // assuming response.data is the event object
                    console.log(response.data);

                } catch (error) {
                    console.error("Failed to fetch event:", error);
                }
            };
            fetchEvent();
        }
    }, [id]);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(''), 2000); // Reset after 2 seconds
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    const [formData, setFormData] = useState({
        teamName: "",
        logo: null,
        city: "",
        managerEmail: "",
        managerPhone: "",
        hasPaid: false,
        transactionId: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, logo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.hasPaid || !formData.transactionId.trim()) {
            toast.warning("Please enter your payment Transaction ID and confirm the payment.");
            return;
        }

        const form = new FormData();
        form.append("teamName", formData.teamName);
        form.append("logo", formData.logo);
        form.append("city", formData.city);
        form.append("managerEmail", formData.managerEmail);
        form.append("managerPhone", formData.managerPhone);
        form.append("hasPaid", formData.hasPaid);


        try {
            setLoading(true);
            const response = await api.post(`/event/${event._id}/register-team`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success("Team registration successful! Now wait for organizer approval");
                setFormData({
                    teamName: "",
                    logo: null,
                    city: "",
                    managerEmail: "",
                    managerPhone: "",
                    hasPaid: false,
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to register team.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-primary text-light p-6 pt-24">
            {/* Left Side */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center">
                {event ? (
                    <>
                        <img src="/assets/team_logo.png" alt="Event Registration" className="w-60 max-w-md mb-6" />
                        <div className="flex justify-center mb-4">
                            <div className="bg-secondary px-6 py-4 rounded-xl text-center shadow-lg w-full">
                                <Countdown
                                    date={new Date(event.registrationDeadline).getTime()}
                                    renderer={({ days, hours, minutes, seconds, completed }) => {
                                        const eventDate = new Date(event.date);
                                        const now = new Date();
                                        if (completed) {
                                            const isSameDay = eventDate.toDateString() === now.toDateString();
                                            return (
                                                <div className="bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-md inline-block">
                                                    {isSameDay ? "Event is Happening Today!" : "Registration Closed"}
                                                </div>
                                            );
                                        }
                                        return (
                                            <div>
                                                <p className="text-gray-800 text-sm mb-1 font-semibold uppercase tracking-wide">Registration Ends In</p>
                                                <div className="text-2xl font-bold text-primary">
                                                    {days}d : {hours}h : {minutes}m : {seconds}s
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">{event.title}</h2>
                        <p className="text-lg text-gray-200">
                            Register your team! Submit your team details and secure your spot in the tournament.
                        </p>
                        {/* Contact section... */}
                        <div className="mt-10 text-center text-sm text-gray-200">
                            <p className="mb-4 italic text-gray-500">*If you face any issue during & after registration, feel free to contact*</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Aqib Card */}
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-md text-white flex flex-col items-center">
                                    <img
                                        src="/assets/sium.jpg"
                                        alt="Hasan Aqib"
                                        className="w-20 h-20 object-cover rounded-full border-2 border-white mb-3"
                                    />
                                    <p className="text-lg font-semibold">Hassan Aqib</p>
                                    <p className="text-sm">General Secretary – Tampere Titans</p>
                                    <a
                                        href="tel:+358468492300"
                                        className="text-blue-400 underline mt-2"
                                    >
                                        +358 46 849 2300
                                    </a>
                                </div>

                                {/* Asif Card */}
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-md text-white flex flex-col items-center">
                                    <img
                                        src="/assets/asif.jpg"
                                        alt="Asif Ahmed"
                                        className="w-20 h-20 object-cover rounded-full border-2 border-white mb-3"
                                    />
                                    <p className="text-lg font-semibold">Asif Ahmed</p>
                                    <p className="text-sm">Financial Director – Tampere Titans</p>
                                    <a
                                        href="tel:+358417234131"
                                        className="text-blue-400 underline mt-2"
                                    >
                                        +358 41 723 4131
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-white text-xl">
                        Loading event details...
                    </div>
                )}
            </div>



            {/* Right Side: Form */}
            <div className="w-full md:w-1/3 bg-white text-black p-8 rounded-xl shadow-xl mt-10 md:mt-0">

                <h2 className="text-3xl font-bold text-center text-primary mb-6">Team Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Team Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            required
                            className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                            Name of the Team
                        </label>
                    </div>

                    {/* City */}
                    <div className="relative">
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition bg-white"
                        >
                            <option value="" disabled hidden>Select a City</option>
                            {cities.map((cityObj) => (
                                <option key={cityObj.city} value={cityObj.city}>
                                    {cityObj.city}
                                </option>
                            ))}
                        </select>
                        <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                            Team City
                        </label>
                    </div>


                    {/* Manager Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="managerEmail"
                            value={formData.managerEmail}
                            onChange={handleChange}
                            required
                            className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                            Manager Email
                        </label>
                        <p className="text-xs text-gray-500 mt-1 italic">
                            *Please enter a valid email — we’ll send important updates here.
                        </p>
                    </div>

                    {/* Manager Phone */}
                    <div className="relative">
                        <input
                            type="tel"
                            name="managerPhone"
                            value={formData.managerPhone}
                            onChange={handleChange}
                            required
                            className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                            Manager Phone Number
                        </label>
                        <p className="text-xs text-gray-500 mt-1 italic">
                            *Please enter a valid phone number — we’ll send important updates here.
                        </p>
                    </div>

                    {/* Logo Upload */}
                    <div className="relative">
                        <label className="block mb-2 font-medium text-gray-700">Team Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-xl file:text-sm file:font-semibold file:bg-secondary file:text-black hover:file:bg-accent"
                        />
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-6">
                        {/* Payment Info Block */}
                        <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 space-y-4">
                            {/* MobilePay */}
                            <div
                                className="text-sm text-gray-700 cursor-pointer flex justify-between items-start"
                                onClick={() => handleCopy("+358 41 723 4131", "mobile")}
                            >
                                <div>
                                    <div>
                                        <span className="font-semibold">📱 MobilePay:</span> +358 41 723 4131
                                    </div>
                                </div>
                                <div className="text-gray-500 mt-0.5">
                                    {copiedField === "mobile" ? (
                                        <FaClipboardCheck size={16} />
                                    ) : (
                                        <VscCopy size={16} />
                                    )}
                                </div>
                            </div>

                            {/* IBAN and Account Name */}
                            <div
                                className="text-sm text-gray-700 cursor-pointer flex justify-between items-start"
                                onClick={() => handleCopy("FI20 3939 0067 7378 74", "iban")}
                            >
                                <div className="space-y-1">
                                    <div>
                                        <span className="font-semibold">🏦 Bank IBAN:</span> FI20 3939 0067 7378 74
                                    </div>
                                    <div>
                                        <span className="font-semibold">👤 Payment Receiver:</span> Asif Ahmed Howlader
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mt-2 italic">
                                            *Please mention <span className="text-black">Finn Bangla Football Registration</span> and <span className="text-black">Team Name</span> in payment message*
                                        </p>
                                    </div>
                                </div>

                                <div className="text-gray-500 mt-0.5">
                                    {copiedField === "iban" ? (
                                        <FaClipboardCheck size={16} />
                                    ) : (
                                        <VscCopy size={16} />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Transaction ID Input */}
                        <div className="relative">
                            <input
                                type="text"
                                name="transactionId"
                                value={formData.transactionId || ""}
                                onChange={handleChange}
                                required
                                className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
                                placeholder=" "
                            />
                            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                                Transaction ID
                            </label>
                            <p className="text-xs text-gray-500 mt-1 italic">
                                *Give payment transaction ID or code.
                            </p>
                        </div>
                    </div>


                    {/* Paid Checkbox */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name="hasPaid"
                            checked={formData.hasPaid}
                            onChange={handleChange}
                            className="h-5 w-5 text-secondary border-gray-300 rounded focus:ring-secondary"
                        />
                        <label className="text-gray-700 text-sm">
                            Have you paid the registration fee?
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-secondary text-black font-bold py-3 rounded-xl hover:bg-accent transition text-lg"
                    >
                        {loading ? "Submitting..." : "Register Team"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventRegistration;