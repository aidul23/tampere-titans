import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import api from "../helpers/api";

const PostActivity = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle File Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview Image
    }
  };

  // Handle Image Upload (Mock API)
  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    toast.dismiss();

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setUploading(true);
      const response = await api.post("/activity/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This tells the server that we are sending form data with a file
        },
      });

      setUploading(false);

      if (response.status === 201) {
        toast.success("Activity uploaded successfully!"); 
        setSelectedImage(null);
        setPreviewUrl("");
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
        <h1 className="text-2xl font-bold text-center mb-6">Upload Team Activity</h1>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        {/* Description Input */}
        <textarea
          placeholder="Activity Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          rows="4"
        />

        {/* Image Upload Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full mb-4" />

        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4">
            <img src={previewUrl} alt="Preview" className="w-full h-52 object-cover rounded-lg" />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default PostActivity;
