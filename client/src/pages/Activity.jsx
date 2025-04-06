import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { ImSpinner2 } from "react-icons/im"; // Spinner icon from react-icons

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("http://localhost:8000/api/v1/activity/activities");
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="p-6 text-center mt-20">
      <h1 className="text-4xl font-semibold mb-12">Team Activities</h1>

      {/* Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <ImSpinner2 className="animate-spin text-5xl text-accent" />
        </div>
      ) : (
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="relative overflow-hidden rounded-lg shadow-lg mb-4 cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                {/* Image */}
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
                  <h3 className="text-lg font-semibold">{activity.title}</h3>
                  <p className="text-sm mt-1">{activity.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No activities found.</p>
          )}
        </Masonry>
      )}

      {/* Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto relative">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSelectedActivity(null)}
            >
              ✖
            </button>
            <img src={selectedActivity.image} alt={selectedActivity.title} className="w-full rounded-lg" />
            <h3 className="text-xl font-bold mt-4">{selectedActivity.title}</h3>
            <p className="mt-2">{selectedActivity.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
