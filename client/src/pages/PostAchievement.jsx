import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import api from "../helpers/api";

const PostAchievement = () => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  // Handle Image Upload (Mock API)
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      setUploading(true);
      const response = await api.post("/achievement/",{
        title: title,
        description: description
      });

      setUploading(false);

      if (response.status === 201) {
        toast.success("Achievement uploaded successfully!"); 
        setTitle("");
        setDescription("");
      } else {
        toast.error("An error occurred while submitting the form.");
      }
    } catch (error) {
      setUploading(false);
      toast.error(error.response?.data?.message || "An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Post Team Achievement</h1>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Achievement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Description Input */}
        <textarea
          placeholder="Achievement Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          rows="4"
        />


        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default PostAchievement;
