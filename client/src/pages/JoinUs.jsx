import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    image: null,
    position: "",
  });

  // Error and success state (No longer needed, as we're using toast)
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // Function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = calculateAge(formData.dob);
    if (age < 18) {
      toast.error("You must be at least 18 years old to join the team."); // Show error toast
      return;
    }

    // Clear any previous error
    toast.dismiss();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("dob", formData.dob);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("position", formData.position);
    form.append("image", formData.image);

    try {
      // Send form data to the backend via a POST request
      const response = await axios.post("http://localhost:8000/api/v1/players/register", form, {
        headers: {
          "Content-Type": "multipart/form-data", // This tells the server that we are sending form data with a file
        },
      });

      if (response.status === 201) {
        toast.success("Your application was submitted successfully! Now wait for the approval"); // Show success toast
        setFormData({
          name: "",
          dob: "",
          email: "",
          phone: "",
          image: null,
          position: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while submitting the form."); // Show error toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-light p-6 pt-24">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Join Tampere Titans</h2>

        {/* No longer need to display the error message */}
        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your full name"
            />
          </div>

          {/* Date of Birth (Age Validation) */}
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Playing Position Dropdown */}
          <div>
            <label className="block font-medium">Preferred Playing Position</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Position</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium">Upload Your Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-secondary text-black font-bold py-2 rounded hover:bg-accent transition">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;
