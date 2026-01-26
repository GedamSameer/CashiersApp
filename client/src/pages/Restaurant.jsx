import React, { useState, useEffect } from "react";
import useRestaurantStore from "../zustand-stores/restaurantStore";

const Restaurant = () => {
  // Get data from restaurant store
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const loading = useRestaurantStore((state) => state.loading);
  const error = useRestaurantStore((state) => state.error);
  const getAllRestaurants = useRestaurantStore(
    (state) => state.getAllRestaurants
  );
  const createRestaurant = useRestaurantStore(
    (state) => state.createRestaurant
  );
  const updateRestaurantById = useRestaurantStore(
    (state) => state.updateRestaurantById
  );
  const deleteRestaurantById = useRestaurantStore(
    (state) => state.deleteRestaurantById
  );

  const [newRestaurant, setNewRestaurant] = useState({
    restaurantName: "",
    address: "",
    contact: "",
    email: "",
    establishedYear: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch restaurants on component mount
  useEffect(() => {
    getAllRestaurants();
  }, [getAllRestaurants]);

  const handleChange = (e) => {
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!newRestaurant.restaurantName || !newRestaurant.address) return;
    const { error } = await createRestaurant(newRestaurant);
    if (!error) {
      setNewRestaurant({
        restaurantName: "",
        address: "",
        contact: "",
        email: "",
        establishedYear: "",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      await deleteRestaurantById(id);
    }
  };

  const handleEdit = (id) => {
    const editItem = restaurants.find((r) => r._id === id);
    if (editItem) {
      setNewRestaurant({
        restaurantName: editItem.restaurantName,
        address: editItem.address,
        contact: editItem.contact,
        email: editItem.email,
        establishedYear: editItem.establishedYear,
      });
      setEditingId(id);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    const { error } = await updateRestaurantById(editingId, newRestaurant);
    if (!error) {
      setNewRestaurant({
        restaurantName: "",
        address: "",
        contact: "",
        email: "",
        establishedYear: "",
      });
      setEditingId(null);
    }
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
              name="restaurantName"
              value={newRestaurant.restaurantName}
              onChange={handleChange}
              placeholder="Restaurant Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />
            <input
              type="text"
              name="address"
              value={newRestaurant.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />
            <input
              type="tel"
              name="contact"
              value={newRestaurant.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />
            <input
              type="email"
              name="email"
              value={newRestaurant.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-800"
            />
            <input
              type="number"
              name="establishedYear"
              value={newRestaurant.establishedYear}
              onChange={handleChange}
              placeholder="Established Year"
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
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="text-lg font-medium mt-4">
                  Loading restaurants...
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 text-red-400">
                <p className="text-lg font-medium">
                  Error loading restaurants: {error}
                </p>
                <button
                  onClick={getAllRestaurants}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : restaurants.length === 0 ? (
              <p className="text-gray-500 text-center italic">
                No restaurants added yet.
              </p>
            ) : (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-xl transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {restaurant.restaurantName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      📍 {restaurant.address}
                    </p>
                    {restaurant.contact && (
                      <p className="text-sm text-gray-500">
                        📞 {restaurant.contact}
                      </p>
                    )}
                    {restaurant.email && (
                      <p className="text-sm text-gray-500">
                        📧 {restaurant.email}
                      </p>
                    )}
                    {restaurant.establishedYear && (
                      <p className="text-sm text-gray-500">
                        🏛️ Established: {restaurant.establishedYear}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleEdit(restaurant._id)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant._id)}
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
