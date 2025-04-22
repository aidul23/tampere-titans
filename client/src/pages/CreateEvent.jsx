import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [registrationDeadline, setRegistrationDeadline] = useState(new Date());
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !location || !date || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("date", date.toISOString());
    if (hasDeadline) {
      formData.append("registrationDeadline", registrationDeadline.toISOString());
    }
    formData.append("image", image);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/api/v1/event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Event created successfully!");
        // Reset fields
        setTitle("");
        setDescription("");
        setLocation("");
        setDate(new Date());
        setImage(null);
        setPreviewUrl("");
      } else {
        toast.error("Failed to create event.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting event.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Date & Time</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>


        {hasDeadline && (
          <div className="mb-4">
            <label className="block mb-1 font-medium">Registration Deadline</label>
            <DatePicker
              selected={registrationDeadline}
              onChange={(registrationDeadline) => setRegistrationDeadline(registrationDeadline)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        )}
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="enableDeadline"
            checked={hasDeadline}
            onChange={(e) => setHasDeadline(e.target.checked)}
          />
          <label htmlFor="enableDeadline" className="font-medium">Enable Registration Deadline</label>
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 w-full" />

        {previewUrl && (
          <div className="mb-4">
            <img src={previewUrl} alt="Preview" className="w-full h-52 object-cover rounded-lg" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
        >
          {uploading ? "Creating..." : "Create Event"}
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
