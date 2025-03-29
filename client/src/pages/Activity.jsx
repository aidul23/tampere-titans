import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";


const Activity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/activity/activities");
        const data = await response.json();
        setActivities(data);
        console.log(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="p-6 text-center mt-20">
      <h1 className="text-4xl font-semibold mb-12">Team Activities</h1>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div>
              <div key={activity.id} className="overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                {/* <h3 className="text-lg font-semibold">{activity.title}</h3>
                <p className="text-sm mt-1">{activity.description}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No activities found.</p>
        )}
      </Masonry>
    </div>
  );
};

export default Activity;
