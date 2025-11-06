import React, { useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "The Spice House", location: "Mumbai, Maharashtra" },
    { id: 2, name: "Green Garden Café", location: "Delhi, India" },
    { id: 3, name: "Royal Tandoor", location: "Jaipur, Rajasthan" },
  ]);

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newRestaurant.name || !newRestaurant.location) return;
    setRestaurants([...restaurants, { ...newRestaurant, id: Date.now() }]);
    setNewRestaurant({ name: "", location: "" });
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
    setNewRestaurant({ name: "", location: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center py-8 px-4 md:px-10 font-sans">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-8 text-center">
        🍽️ Restaurant Manager
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">

        <div className="bg-white w-full lg:w-1/2 rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 transition-all">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingId ? "✏️ Edit Restaurant" : "➕ Add Restaurant"}
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={newRestaurant.name}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />
            <input
              type="text"
              name="location"
              value={newRestaurant.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />

            {editingId ? (
              <button
                onClick={handleUpdate}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow transition-all"
              >
                ✅ Update Restaurant
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow transition-all"
              >
                ➕ Add Restaurant
              </button>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🍴 Restaurant List
          </h2>
          <div className="space-y-4">
            {restaurants.length === 0 ? (
              <p className="text-gray-500 text-center italic">
                No restaurants added yet.
              </p>
            ) : (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-xl transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {restaurant.location}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleEdit(restaurant.id)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <p className="mt-12 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Restaurant POS | Powered by{" "}
        <span className="text-orange-500 font-semibold">Cashier app</span>
      </p>
    </div>
  );
};

export default Restaurant;
