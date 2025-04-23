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
  const [loading, setLoading] = useState(false); // Loading state

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

    setLoading(true); // Set loading to true when form submission starts

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
    } finally {
      setLoading(false); // Set loading to false once the submission is complete
    }
  };

  return (

    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-primary text-light p-6 pt-24">
      {/* Left Side: Image and Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center">
        <img
          src="/src/assets/team_logo.png"
          alt="Join the Team"
          className="w-60 max-w-md mb-6"
        />
        <h2 className="text-4xl font-bold text-white mb-4">Be Part of Something Bigger</h2>
        <p className="text-lg text-gray-200">
          Join Tampere Titans and play alongside passionate footballers. We're more than a team —
          we're a family united by ambition and love for the game.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-white text-black p-8 rounded-xl shadow-xl mt-10 md:mt-0">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Join Tampere Titans</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder=" "
            />
            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Full Name
            </label>
          </div>

          {/* Date of Birth */}
          <div className="relative">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder=" "
            />
            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Date of Birth
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder=" "
            />
            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Email Address
            </label>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition"
              placeholder=" "
            />
            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Phone Number
            </label>
          </div>

          {/* Playing Position */}
          <div className="relative">
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition bg-white"
            >
              <option value="" disabled hidden></option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>
            <label className="absolute left-4 top-1.5 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
              Preferred Position
            </label>
          </div>

          {/* Upload Image */}
          <div className="relative">
            <label className="block mb-2 font-medium text-gray-700">Player Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-xl file:text-sm file:font-semibold file:bg-secondary file:text-black hover:file:bg-accent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-secondary text-black font-bold py-3 rounded-xl hover:bg-accent transition text-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default JoinUs;
