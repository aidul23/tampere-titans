import React from "react";
import Masonry from "react-masonry-css";

const activities = [
  { id: 1, imageUrl: 'src/assets/tampere-titan-home.jpg'},
  { id: 2, imageUrl: 'src/assets/team_photo.jpeg'},
  { id: 3, imageUrl: 'src/assets/player.png'},
  { id: 4, imageUrl: 'src/assets/tampere-titan-home.jpg'},
  { id: 5, imageUrl: 'src/assets/tampere-titan-home.jpg'},
  { id: 6, imageUrl: 'src/assets/team_photo.jpeg'},
  { id: 7, imageUrl: 'src/assets/player.png'},
  { id: 8, imageUrl: 'src/assets/tampere-titan-home.jpg'},
];

const Activity = () => {
  return (
    <div className="p-6 text-center mt-20">
      <h1 className="text-4xl font-semibold mb-12">Team Activities</h1>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {activities.map((activity) => (
          <div key={activity.id} className="overflow-hidden rounded-lg shadow-lg mb-4">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Activity;
