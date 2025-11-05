import React, { useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "The Spice House",
      location: "Mumbai, Maharashtra",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Green Garden Café",
      location: "Delhi, India",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Royal Tandoor",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
    },
  ]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    rating: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newRestaurant.name || !newRestaurant.location || !newRestaurant.rating) return;
    setRestaurants([
      ...restaurants,
      { ...newRestaurant, id: Date.now(), rating: parseFloat(newRestaurant.rating) },
    ]);
    setNewRestaurant({ name: "", location: "", rating: "" });
  };

  const handleDelete = (id) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  const handleEdit = (id) => {
    const editItem = restaurants.find((r) => r.id === id);
    setNewRestaurant(editItem);
    setEditingId(id);
  };

  const handleUpdate = () => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === editingId ? { ...newRestaurant, id: editingId } : r
      )
    );
    setNewRestaurant({ name: "", location: "", rating: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900  flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">🍽️ Restaurant Manager</h1>

      {/* Input Form */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-6 mb-6 w-full max-w-md">
        <input
          type="text"
          name="name"
          value={newRestaurant.name}
          onChange={handleChange}
          placeholder="Restaurant Name"
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          name="location"
          value={newRestaurant.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="number"
          name="rating"
          value={newRestaurant.rating}
          onChange={handleChange}
          placeholder="Rating (0–5)"
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />

        {editingId ? (
          <button
            onClick={handleUpdate}
            className="w-full bg-green-500 text-black py-2 rounded-md hover:bg-green-600 transition"
          >
            Update Restaurant
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-black transition"
          >
            Add Restaurant
          </button>
        )}
      </div>

      {/* Restaurant List */}
      <div className="w-full max-w-2xl space-y-4 text-white">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md p-5 flex justify-between items-center hover:shadow-xl transition"
          >
            <div>
              <h2 className="text-xl font-semibold ">{restaurant.name}</h2>
              <p>{restaurant.location}</p>
              <p className="text-yellow-300 font-medium">⭐ {restaurant.rating}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(restaurant.id)}
                className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(restaurant.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;