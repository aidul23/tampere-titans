import React, { useState } from "react";

const PostActivity = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setUploading(true);
      // Mock API call (Replace with actual API endpoint)
      const response = await fetch("http://localhost:8000/api/v1/activity/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);

      if (response.ok) {
        alert("Image uploaded successfully!");
        setSelectedImage(null);
        setPreviewUrl("");
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setUploading(false);
      alert("Error uploading image!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Team Activity</h1>

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
